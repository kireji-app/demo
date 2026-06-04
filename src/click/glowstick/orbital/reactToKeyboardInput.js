if (HotKeys.pressed.has("Escape")) {

 OrbitalGame.pauseAsync()
 return
}

/** A normalized vector representing the player's movement direction. */
const forceVector = (() => {
 const sensitivity = OrbitalGame.manifest.keyboardSensitivity
 const facingVector = OrbitalCamera.model
 const acceleration = 850
 const maxTurnSpeed = 250

 // For non-accellerating arrow key turning.
 // if (HotKeys.pressed.has("ArrowRight")) facingVector.y += sensitivity
 // if (HotKeys.pressed.has("ArrowLeft")) facingVector.y -= sensitivity

 const horizontalInput = HotKeys.pressed.has("ArrowRight") ? 1 : (HotKeys.pressed.has("ArrowLeft") ? -1 : 0)

 // 2. Accelerate or Decelerate
 if (horizontalInput != 0) {

  if (Math.sign(horizontalInput) !== Math.sign(OrbitalGame.currentTurnSpeed))
   OrbitalGame.currentTurnSpeed = 0

  OrbitalGame.currentTurnSpeed += horizontalInput * acceleration * Client.deltaTime / 1000
  OrbitalGame.currentTurnSpeed = Math.max(Math.min(OrbitalGame.currentTurnSpeed, maxTurnSpeed), -maxTurnSpeed)
 } else {
  OrbitalGame.currentTurnSpeed = 0
 }

 if (HotKeys.pressed.has("ArrowUp")) facingVector.x -= sensitivity
 if (HotKeys.pressed.has("ArrowDown")) facingVector.x += sensitivity

 facingVector.y += OrbitalGame.currentTurnSpeed * Client.deltaTime / 1000

 OrbitalCamera.setModel(facingVector)

 const yaw = -facingVector.y * Math.PI / 180

 // The keyboard might be controlling the player character.
 const WASDVector = Vector[3]()
 if (HotKeys.pressed.has("KeyA")) WASDVector.x -= 1
 if (HotKeys.pressed.has("KeyD")) WASDVector.x += 1
 if (HotKeys.pressed.has("KeyW")) WASDVector.z -= 1
 if (HotKeys.pressed.has("KeyS")) WASDVector.z += 1

 const controlVector = Vector.normalize(Vector[3](
  WASDVector.x * Math.cos(yaw) + WASDVector.z * Math.sin(yaw),
  0,
  -WASDVector.x * Math.sin(yaw) + WASDVector.z * Math.cos(yaw)
 ))

 const isSprinting = HotKeys.pressed.has("ShiftLeft") || HotKeys.pressed.has("ShiftRight")

 return Vector.multiply(controlVector, isSprinting ? OrbitalGame.manifest.sprintingSpeed : OrbitalGame.manifest.walkingSpeed)
})()

const adjustedSpeed = Vector.magnitude(forceVector)

if (adjustedSpeed === 0) {
 // Nothing is happening.
 return
}


// Cast a ray to determine how this force vector will reposition the player.
const { hit, triIndex, point, forceVector: outputForceVector } = OrbitalLevels.arm.castRay(forceVector, Client.deltaTime / 1000, true)

// if (!hit) {
//  const distance = Vector.magnitude(Vector.subtract(OrbitalLevels.arm.position, point))
// }

// Distribute the runtime state.
OrbitalLevels.arm.position.x = point.x
OrbitalLevels.arm.position.y = point.y
OrbitalLevels.arm.position.z = point.z
OrbitalLevels.arm.triIndex = triIndex

// Move the world to the tri and point provided by the ray cast results.
const triData = OrbitalLevels.arm.triTable[triIndex]
const row = triData.rows[Math.floor(point.z) - triData.zRange.min]
const newRID = triData.offset + row.offset + BigInt(Math.floor(point.x) - row.xyRange.min.x)
if (newRID !== OrbitalLevels.arm.rid)
 OrbitalLevels.arm.setRID(newRID, false, true)
/* else
 OrbitalLevels.arm.updateView() */