/** A normalized vector representing the player's movement direction. */
const forceVector = (() => {

 const facingVector = orbitalCamera.model
 const sensitivity = 1.2
 const acceleration = 850
 const maxTurnSpeed = 250

 // if (hotKeys.pressed.has("ArrowRight")) facingVector.y += sensitivity
 // if (hotKeys.pressed.has("ArrowLeft")) facingVector.y -= sensitivity

 const horizontalInput = hotKeys.pressed.has("ArrowRight") ? 1 : (hotKeys.pressed.has("ArrowLeft") ? -1 : 0)

 // 2. Accelerate or Decelerate
 if (horizontalInput != 0) {

  if (Math.sign(horizontalInput) !== Math.sign(orbitalGame.currentTurnSpeed))
   orbitalGame.currentTurnSpeed = 0

  orbitalGame.currentTurnSpeed += horizontalInput * acceleration * client.deltaTime / 1000
  orbitalGame.currentTurnSpeed = Math.max(Math.min(orbitalGame.currentTurnSpeed, maxTurnSpeed), -maxTurnSpeed)
 } else {
  orbitalGame.currentTurnSpeed = 0
 }

 if (hotKeys.pressed.has("ArrowUp")) facingVector.x -= sensitivity
 if (hotKeys.pressed.has("ArrowDown")) facingVector.x += sensitivity

 facingVector.y += orbitalGame.currentTurnSpeed * client.deltaTime / 1000

 orbitalCamera.setModel(facingVector)

 const yaw = -facingVector.y * Math.PI / 180

 // The keyboard might be controlling the player character.
 const keyboardVector = { x: 0, y: 0 }
 if (hotKeys.pressed.has("KeyA")) keyboardVector.x -= 1
 if (hotKeys.pressed.has("KeyD")) keyboardVector.x += 1
 if (hotKeys.pressed.has("KeyW")) keyboardVector.y -= 1
 if (hotKeys.pressed.has("KeyS")) keyboardVector.y += 1

 const movementVector = {
  x: keyboardVector.x * Math.cos(yaw) + keyboardVector.y * Math.sin(yaw),
  y: -keyboardVector.x * Math.sin(yaw) + keyboardVector.y * Math.cos(yaw)
 }

 const controlVector = Vector.normalize(movementVector)
 const isSprinting = hotKeys.pressed.has("ShiftLeft") || hotKeys.pressed.has("ShiftRight")

 return Vector.multiply(controlVector, isSprinting ? orbitalGame.sprintingSpeed : orbitalGame.walkingSpeed)
})()

const adjustedSpeed = Vector.magnitude(forceVector)

if (adjustedSpeed === 0) {
 // Nothing is happening.
 return
}


// Cast a ray to determine how this force vector will reposition the player.
const { hit, triIndex, point, forceVector: outputForceVector } = orbitalLevel.castRay(forceVector, client.deltaTime / 1000, true)

// if (!hit) {
//  const distance = Vector.magnitude(Vector.subtract(orbitalLevel.position, point))
// }

// Distribute the runtime state.
orbitalLevel.position.x = point.x
orbitalLevel.position.y = point.y
orbitalLevel.triIndex = triIndex

// Move the world to the tri and point provided by the ray cast results.
const triData = orbitalLevel.triTable[triIndex]
const row = triData.rows[Math.floor(point.y) - triData.range.min]
const newRouteID = triData.offset + row.offset + BigInt(Math.floor(point.x) - row.range.min)
if (newRouteID !== orbitalLevel.routeID)
 orbitalLevel.setRouteID(newRouteID, false, true)
/* else
 orbitalLevel.updateView() */