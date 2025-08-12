const keys = hotKeys.pressed
const moveVector = { x: 0, y: 0 }

if (keys.has("KeyA")) moveVector.x -= 1
if (keys.has("KeyD")) moveVector.x += 1
if (keys.has("KeyW")) moveVector.y -= 1
if (keys.has("KeyS")) moveVector.y += 1

const newUserRouteID = user.vectorToRouteID(moveVector)

if (newUserRouteID !== undefined) {

 if (newUserRouteID !== user.routeID) {
  glowstick.walkMark = TIME
  glowstick.tilesCount = -1
  user.setRouteID(newUserRouteID)
 }

 const elapsed = (TIME - (glowstick.walkMark ??= TIME)) / 1000
 const diagonal = (moveVector.x !== 0 && moveVector.y !== 0)
 const speed = glowstick.tilesPerSecond / (diagonal ? Math.SQRT2 : 1)
 const expectedTiles = elapsed * speed
 const difference = expectedTiles - (glowstick.tilesCount ??= -1)

 if (Math.trunc(difference) > 0) {

  let xCollide = 0n, yCollide = 0n
  if (moveVector.x) {
   const xAxis = region.xAxis
   const xPotential = BigInt(moveVector.x)
   const xRouteID = xAxis.routeID + xPotential
   if (xRouteID >= 0n && xRouteID < xAxis.cardinality)
    xAxis.setRouteID(xRouteID)
   else xCollide = xPotential
  }

  if (moveVector.y) {
   const yAxis = region.yAxis
   const yPotential = BigInt(moveVector.y)
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
       "x-axis": encodeSegment(x - neighbor.x - 1n),
       "y-axis": encodeSegment(y - neighbor.y - 1n)
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