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

let walking = false

if (facingDirectionRouteID !== undefined) {
 // The player is trying to walk.

 const futurePosition = {
  triangleIndex: world.triangleIndex,
  x: world.x + forceVector.x,
  y: world.y + forceVector.y
 }

 // Check current triangle
 const currentTriangle = world.triangles[world.triangleIndex]
 if (world.isPointInTriangle(futurePosition, currentTriangle)) {
  walking = true
 } else handleEdge: {
  // Check neighbors
  for (let triangleIndex = 0; triangleIndex < world.triangles.length; triangleIndex++) {
   // TODO: Memoize neighbors instead of iterating over every single one. This will enable creating incredible dynamic levels using 3D collision meshes.
   if (triangleIndex === world.triangleIndex)
    continue

   if (world.isPointInTriangle(futurePosition, world.triangles[triangleIndex])) {
    futurePosition.triangleIndex = triangleIndex
    walking = true
    break handleEdge
   }
  }

  // TODO: Implement collision sliding.
  // When sliding, we should call `facingDirectionRouteID = user.vectorToRouteID(moveVector)` with the adjusted move vector.
  // We should be walking unless the move vector is moving exactly perpendicular to the wall (the "true" angled wall not the pixelated wall which is always composed of 90 angles) OR the move vector is pushing into a corner with no triangle to transfer to.
  // It should not create jagged speed along the edge just because the triangle edge is jagged due to aliasing; if the move vector is constant every frame and the angle of the triangle is constant, I shouldn't speed up and slow down while sliding along that edge.
  // Everything else in this loop works perfectly except for edge sliding.
 }

 if (walking) {
  world.triangleIndex = futurePosition.triangleIndex
  world.x = futurePosition.x
  world.y = futurePosition.y
  const newRouteID = world.modelToRouteID(futurePosition)
  if (newRouteID !== world.routeID) {
   // Prevent route ID updates from propagating to the view because view updates will be more precise than route ID updates.
   world.skipWorldMove = true
   world.setRouteID(newRouteID)
   world.skipWorldMove = false
  }
  world.moveView()
 } else {
  // This lets the player turn to face the wall or corner even if they are already up against it and not walking.
  facingDirectionRouteID = user.vectorToRouteID(moveVector)
 }
}

// Conditionally update the player character's facing direction.
if (facingDirectionRouteID !== undefined && facingDirectionRouteID !== user.routeID)
 user.setRouteID(facingDirectionRouteID)

if (walking)
 user.element.classList.add("walking")
else
 user.element.classList.remove("walking")