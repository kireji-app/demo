/** A normalized vector representing the player's movement direction. */
const moveVector = (() => {

 if (glowstick.thumbstickStart) {
  // The pointer is controlling the player character.
  const result = Vector.normalize(glowstick.thumbstickVector)
  const magnitude = Vector.magnitude(glowstick.thumbstickVector)

  // Position the visual thumbstick.
  const maxRadius = Math.max(Math.min(Math.min(globalThis.innerWidth, globalThis.innerHeight) * 0.10, 128), 48)
  glowstick.handleElement.style.setProperty("--x", result.x * Math.min(magnitude, maxRadius) + "px")
  glowstick.handleElement.style.setProperty("--y", result.y * Math.min(magnitude, maxRadius) + "px")
  return result
 }

 // The keyboard might be controlling the player character.
 const keyboardVector = { x: 0, y: 0 }
 if (hotKeys.pressed.has("KeyA")) keyboardVector.x -= 1
 if (hotKeys.pressed.has("KeyD")) keyboardVector.x += 1
 if (hotKeys.pressed.has("KeyW")) keyboardVector.y -= 1
 if (hotKeys.pressed.has("KeyS")) keyboardVector.y += 1
 return Vector.normalize(keyboardVector)
})()

/** The player character's facing direction (undefined if the vector has no magnitude). */
let facingDirectionRouteID = user.vectorToRouteID(moveVector)

/** The move vector, scaled by character speed, framerate and a vertical factor that accounts for the camera angle. */
const forceVector = {
 x: moveVector.x * user.pixelsPerSecond * client.deltaTime * .001,
 y: moveVector.y * user.pixelsPerSecond * client.deltaTime * 0.00075
}

if (facingDirectionRouteID !== undefined) {
 // The player is moving.

 // Prevent route ID updates from propagating to the view because view updates will be more precise than route ID updates.
 glowstick.skipMoveWorld = true

 region.placeStates[0] += forceVector.x
 region.placeStates[1] += forceVector.y

 const collision = { x: null, y: null }

 if (region.placeStates[0] < 0) {
  region.placeStates[0] = 0
  collision.x = forceVector.x
 } else if (region.placeStates[0] > region.placeLimits[0] - 1) {
  region.placeStates[0] = region.placeLimits[0] - 1
  collision.x = forceVector.x
 }

 if (region.placeStates[1] < 0) {
  region.placeStates[1] = 0
  collision.y = forceVector.y
 } else if (region.placeStates[1] > region.placeLimits[1] - 1) {
  region.placeStates[1] = region.placeLimits[1] - 1
  collision.y = forceVector.y
 }

 let movedToNeighbor = false

 if (collision.x || collision.y) {
  for (const neighbor of region.neighbors) {
   const x = user.x + collision.x
   const y = user.y + collision.y
   if (neighbor.overlaps({ x, y, w: 0, h: 0 })) {
    // Set the place states of the neighbor manually because it will be more precise than what the route distribution method can provide.
    neighbor.placeStates[0] = x - neighbor.x
    neighbor.placeStates[1] = y - neighbor.y
    world.setModel({ [neighbor.key]: neighbor.placeStates })
    movedToNeighbor = true
    break
   }
  }
  if (!movedToNeighbor) {
   facingDirectionRouteID = user.vectorToRouteID({
    x: collision.x ? 0 : Math.sign(moveVector.x),
    y: collision.y ? 0 : Math.sign(moveVector.y)
   })
  }
 }

 // Conditionally enable a walking animation.
 if (movedToNeighbor || (collision.x === null && (Math.abs(forceVector.x) > 0.01)) || (collision.y === null && (Math.abs(forceVector.y) > 0.01)))
  user.element.classList.add("walking")
 else {
  user.element.classList.remove("walking")

  // This lets the player turn to face the wall or corner even if they are already up against it and not walking.
  facingDirectionRouteID = user.vectorToRouteID(moveVector)
 }

 // Conditionally update the player character's facing direction.
 // TODO: Try modifying the user's facing vector based on collision.
 if (facingDirectionRouteID !== undefined && facingDirectionRouteID !== user.routeID)
  user.setRouteID(facingDirectionRouteID)

 if (!movedToNeighbor) {
  // This will round the place states to integer values, giving the stored position less precision than the one used during gameplay.
  const newRouteID = region.modelToRouteID(region.placeStates)
  if (region.routeID !== newRouteID)
   region.setRouteID(newRouteID)
 }

 world.moveView()

 glowstick.skipMoveWorld = false

} else {
 glowstick.walkMark = null
 user.element.classList.remove("walking")
}