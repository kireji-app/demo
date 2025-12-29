const keys = hotKeys.pressed

const moveVector = { x: 0, y: 0, speed: 1 }

if (glowstick.thumbstickStart) {
 const maxRadius = Math.max(Math.min(Math.min(globalThis.innerWidth, globalThis.innerHeight) * 0.10, 128), 48)
 const magnitude = Math.hypot(glowstick.thumbstickVector.x, glowstick.thumbstickVector.y)
 if (magnitude) {
  moveVector.x = glowstick.thumbstickVector.x / magnitude
  moveVector.y = glowstick.thumbstickVector.y / magnitude
  if (magnitude > maxRadius) {
   glowstick.thumbstickVector.x = moveVector.x * maxRadius
   glowstick.thumbstickVector.y = moveVector.y * maxRadius
  } else {
   moveVector.speed = (magnitude / maxRadius) ** 1.5
  }
 }
 glowstick.handleElement.style.setProperty("--x", moveVector.x * Math.min(magnitude, maxRadius) + "px")
 glowstick.handleElement.style.setProperty("--y", moveVector.y * Math.min(magnitude, maxRadius) + "px")
 moveVector.x = Math.abs(moveVector.x) >= Math.sin((Math.PI / 8)) ? Math.sign(moveVector.x) : 0
 moveVector.y = Math.abs(moveVector.y) >= Math.sin((Math.PI / 8)) ? Math.sign(moveVector.y) : 0
} else {
 if (keys.has("KeyA")) moveVector.x -= 1
 if (keys.has("KeyD")) moveVector.x += 1
 if (keys.has("KeyW")) moveVector.y -= 1
 if (keys.has("KeyS")) moveVector.y += 1
}

const newUserRouteID = user.vectorToRouteID(moveVector)

if (newUserRouteID !== undefined) {

 if (newUserRouteID !== user.routeID)
  user.setRouteID(newUserRouteID)

 user.element.classList.add("walking")

 let takeStep = true

 if (glowstick.walkMark) {
  const diagonal = (moveVector.x !== 0 && moveVector.y !== 0)
  const tilesPerSecond = user.tilesPerSecond * moveVector.speed / (diagonal ? Math.SQRT2 : 1)
  const secondsSinceLastMovement = (TIME - glowstick.walkMark) / 1000
  takeStep = (secondsSinceLastMovement * tilesPerSecond) > 1
 }

 if (takeStep) {
  glowstick.walkMark = TIME

  let
   xCollide = 0n,
   yCollide = 0n,
   moved = false,
   movedToNeighbor = false

  if (moveVector.x) {
   const xPotential = BigInt(moveVector.x)
   const xRouteID = region.placeStates[0] + xPotential
   if (xRouteID >= 0n && xRouteID < region.placeLimits[0]) {
    region.placeStates[0] = xRouteID
    moved = true
   } else xCollide = xPotential
  }

  if (moveVector.y) {
   const yPotential = BigInt(moveVector.y)
   const yRouteID = region.placeStates[1] + yPotential
   if (yRouteID >= 0n && yRouteID < region.placeLimits[1]) {
    region.placeStates[1] = yRouteID
    moved = true
   } else yCollide = yPotential
  }

  if (xCollide || yCollide) {
   for (const neighbor of region.neighbors) {
    const x = user.x + xCollide
    const y = user.y + yCollide
    if (neighbor.overlaps({ x, y, w: 0n, h: 0n })) {
     world.setRouteID(world.modelToRouteID({
      [neighbor.key]: [x - neighbor.x - user.w, y - neighbor.y - user.h]
     }))
     movedToNeighbor = true
     break
    }
   }
  }

  if (!movedToNeighbor && moved)
   region.setRouteID(region.modelToRouteID(region.placeStates))

 }
} else {
 glowstick.walkMark = null
 user.element.classList.remove("walking")
}