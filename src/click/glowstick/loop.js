/** A normalized vector representing the player's movement direction. */
const { controlVector, isSprinting } = (() => {

 if (GlowstickGame.thumbstickStart) {

  // The pointer is controlling the player character.
  const normalized = Vector.normalize(GlowstickGame.thumbstickVector)
  const magnitude = Vector.magnitude(GlowstickGame.thumbstickVector)
  const maxRadius = Math.max(Math.min(Math.min(globalThis.innerWidth, globalThis.innerHeight) * 0.10, 128), 48)
  const clamped = Vector.multiply(normalized, Math.min(magnitude, maxRadius))

  // Position the visual thumbstick.
  GlowstickGame.handleElement.style.setProperty("--x", clamped.x + "px")
  GlowstickGame.handleElement.style.setProperty("--z", clamped.z + "px")

  return {
   controlVector: Vector.xyz(
    normalized.x * Math.min(magnitude / maxRadius, 1),
    0,
    normalized.z * Math.min(magnitude / maxRadius, 1)
   ),
   isSprinting: (maxRadius * 1.5) < magnitude
  }
 }

 // The keyboard might be controlling the player character.
 const WASDVector = Vector.xyz()
 if (HotKeys.pressed.has("KeyA")) WASDVector.x -= 1
 if (HotKeys.pressed.has("KeyD")) WASDVector.x += 1
 if (HotKeys.pressed.has("KeyW")) WASDVector.z -= 1
 if (HotKeys.pressed.has("KeyS")) WASDVector.z += 1

 return {
  controlVector: Vector.normalize(WASDVector),
  isSprinting: HotKeys.pressed.has("ShiftLeft") || HotKeys.pressed.has("ShiftRight")
 }
})()

// Speed going up and down should be slower than speed going left and right to account for camera angle.
const adjustedSpeed = Vector.magnitude(Vector.multiply(
 Vector.multiply(controlVector, GlowstickUser.pixelsPerSecond),
 Vector.xyz(1, 1, 1 / 2)
))

if (adjustedSpeed === 0) {

 GlowstickUser.walkPhase = GlowstickUser.walkStartFrame / GlowstickUser.walkFrames
 // Nothing is happening.
 GlowstickUser.element.classList.remove("walking")

 return
}

// The force vector should still have the same screen-space angle as the player's thumbstick.
const forceVector = Vector.multiply(Vector.normalize(controlVector), adjustedSpeed * (isSprinting ? 2.5 : 1))

// Cast a ray to determine how this force vector will reposition the player.
const { hit, triIndex, point, forceVector: outputForceVector } = GlowstickWorld.castRay(forceVector, Client.deltaTime / 1000, true)

if (hit) {
 GlowstickUser.walkPhase = GlowstickUser.walkStartFrame / GlowstickUser.walkFrames
 GlowstickUser.element.classList.remove("walking")
} else {

 // Counter-act screen-space vertical scale.
 const distance = Vector.magnitude(Vector.multiply(Vector.subtract(GlowstickWorld.position, point), Vector.xyz(1, 1, 2)))

 // Use the walking animations.
 GlowstickUser.element.classList.add("walking")

 // Iterate walk cycle phase based on speed.
 GlowstickUser.walkPhase = (GlowstickUser.walkPhase + distance * GlowstickUser.strideFactor) % 1
}

// const speed = Vector.magnitude(Vector.subtract(point, GlowstickWorld.position)) / (Client.deltaTime / 1000)
// if (Math.floor(speed * 100) > Math.floor(adjustedSpeed * 100)) {
//  warn('speed violation from cast', { speed, adjustedSpeed })
// }

// Distribute the runtime state.
GlowstickWorld.position.x = point.x
GlowstickWorld.position.y = point.y
GlowstickWorld.position.z = point.z
GlowstickWorld.triIndex = triIndex

// Move the world to the tri and point provided by the ray cast results.
const triData = GlowstickWorld.triTable[triIndex]
const row = triData.rows[Math.floor(point.z) - triData.zRange.min]
const newRID = triData.offset + row.offset + BigInt(Math.floor(point.x) - row.xyRange.min.x)
if (newRID !== GlowstickWorld.rid) {

 GlowstickWorld.setRID(newRID, false, true)
} else {
 GlowstickWorld.updateView()
}

// When edge sliding, turn the GlowstickUser toward the direction of travel instead of the direction of force.
// TODO: if the output vector is not the input vector, smooth it over several frames just like the camera.
// const facingDirectionRID = GlowstickUser.vectorToRID(outputForceVector)

const facingDirectionRID = GlowstickUser.vectorToRID(forceVector)

if (facingDirectionRID !== null && facingDirectionRID !== GlowstickUser.rid)
 GlowstickUser.setRID(facingDirectionRID)