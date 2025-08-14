const keys = hotKeys.pressed

const moveVector = { x: 0, y: 0, speed: 1 }

if (glowstick.thumbstickStart) {
 const maxRadius = Math.max(Math.min(Math.min(globalThis.innerWidth, globalThis.innerHeight) * 0.10, 128), 48)
 const magnitude = Math.hypot(glowstick.thumbstickVector.x, glowstick.thumbstickVector.y)
 if (magnitude > 6) {
  moveVector.x = glowstick.thumbstickVector.x / magnitude
  moveVector.y = glowstick.thumbstickVector.y / magnitude
  if (magnitude > maxRadius) {
   glowstick.thumbstickStart.x = glowstick.thumbstickStart.x + (glowstick.thumbstickVector.x - moveVector.x * maxRadius)
   glowstick.thumbstickStart.y = glowstick.thumbstickStart.y + (glowstick.thumbstickVector.y - moveVector.y * maxRadius)
   glowstick.thumbstickVector.x = moveVector.x * maxRadius
   glowstick.thumbstickVector.y = moveVector.y * maxRadius
   glowstick.thumbstickElement.style.setProperty("--x", glowstick.thumbstickStart.x + "px")
   glowstick.thumbstickElement.style.setProperty("--y", glowstick.thumbstickStart.y + "px")
  } else {
   moveVector.speed = magnitude / maxRadius
  }
 }
 glowstick.handleElement.style.setProperty("--x", moveVector.x * Math.min(magnitude, maxRadius) + "px")
 glowstick.handleElement.style.setProperty("--y", moveVector.y * Math.min(magnitude, maxRadius) + "px")
} else {
 if (keys.has("KeyA")) moveVector.x -= 1
 if (keys.has("KeyD")) moveVector.x += 1
 if (keys.has("KeyW")) moveVector.y -= 1
 if (keys.has("KeyS")) moveVector.y += 1
 if (moveVector.x && moveVector.y) {
  moveVector.x /= Math.SQRT2
  moveVector.y /= Math.SQRT2
 }
}

const newUserRouteID = user.vectorToRouteID(moveVector)

if (newUserRouteID !== undefined) {

 if (newUserRouteID !== user.routeID) {
  glowstick.walkMark = TIME
  glowstick.tilesCount = -1
  user.setRouteID(newUserRouteID)
 }

 const elapsed = (TIME - (glowstick.walkMark ??= TIME)) / 1000
 const diagonal = (moveVector.x !== 0 && moveVector.y !== 0)
 const speed = glowstick.tilesPerSecond * moveVector.speed
 const expectedTiles = elapsed * speed
 const difference = expectedTiles - (glowstick.tilesCount ??= -1)

 if (Math.trunc(difference) > 0) {

  let xCollide = 0n, yCollide = 0n

  if (moveVector.x) {
   const xAxis = region.xAxis
   const xPotential = BigInt(Math.sign(moveVector.x))
   const xRouteID = xAxis.routeID + xPotential
   if (xRouteID >= 0n && xRouteID < xAxis.cardinality)
    xAxis.setRouteID(xRouteID)
   else xCollide = xPotential
  }

  if (moveVector.y) {
   const yAxis = region.yAxis
   const yPotential = BigInt(Math.sign(moveVector.y))
   const yRouteID = yAxis.routeID + yPotential
   if (yRouteID >= 0n && yRouteID < yAxis.cardinality)
    yAxis.setRouteID(yRouteID)
   else yCollide = yPotential
  }

  if (xCollide || yCollide) {
   for (const neighbor of region.neighbors) {
    const x = user.x + xCollide
    const y = user.y + yCollide
    if (neighbor.overlaps({ x, y, w: 0n, h: 0n }))
     world.setRouteID(world.modelToRouteID({
      [neighbor.key]: {
       "x-axis": encodeSegment(x - neighbor.x - user.w),
       "y-axis": encodeSegment(y - neighbor.y - user.h)
      }
     }))
   }
  }

  glowstick.tilesCount = expectedTiles
 } else {
  // reflect partial progress?
 }

} else {
 glowstick.walkMark = null
 glowstick.tilesCount = null
}

glowstick.fps = Math.round(1000 / (glowstick.meanFrameTime += (TIME - (glowstick.time ?? TIME) - glowstick.meanFrameTime) / 20))
glowstick.time = TIME
glowstick.frameRequest = requestAnimationFrame(() => glowstick.loop(performance.now()))