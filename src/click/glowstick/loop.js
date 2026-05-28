/** A normalized vector representing the player's movement direction. */
const { controlVector, isSprinting } = (() => {

 if (glowstick.thumbstickStart) {

  // The pointer is controlling the player character.
  const normalized = Vector.normalize(glowstick.thumbstickVector)
  const magnitude = Vector.magnitude(glowstick.thumbstickVector)
  const maxRadius = Math.max(Math.min(Math.min(globalThis.innerWidth, globalThis.innerHeight) * 0.10, 128), 48)
  const clamped = Vector[3](normalized.x * Math.min(magnitude, maxRadius), 0, normalized.z * Math.min(magnitude, maxRadius))

  // Position the visual thumbstick.
  glowstick.handleElement.style.setProperty("--x", clamped.x + "px")
  glowstick.handleElement.style.setProperty("--z", clamped.z + "px")

  return {
   controlVector: Vector[3](
    normalized.x * Math.min(magnitude / maxRadius, 1),
    0,
    normalized.z * Math.min(magnitude / maxRadius, 1)
   ),
   isSprinting: (maxRadius * 1.5) < magnitude
  }
 }

 // The keyboard might be controlling the player character.
 const WASDVector = Vector[3]()
 if (hotKeys.pressed.has("KeyA")) WASDVector.x -= 1
 if (hotKeys.pressed.has("KeyD")) WASDVector.x += 1
 if (hotKeys.pressed.has("KeyW")) WASDVector.z -= 1
 if (hotKeys.pressed.has("KeyS")) WASDVector.z += 1

 return {
  controlVector: Vector.normalize(WASDVector),
  isSprinting: hotKeys.pressed.has("ShiftLeft") || hotKeys.pressed.has("ShiftRight")
 }
})()

// Speed going up and down should be slower than speed going left and right to account for camera angle.
const adjustedSpeed = Vector.magnitude(Vector.multiply(
 Vector.multiply(controlVector, user.pixelsPerSecond),
 Vector[3](1, 1, 1 / 2)
))

if (adjustedSpeed === 0) {

 user.walkPhase = user.walkStartFrame / user.walkFrames
 // Nothing is happening.
 user.element.classList.remove("walking")

 return
}

// The force vector should still have the same screen-space angle as the player's thumbstick.
const forceVector = Vector.multiply(Vector.normalize(controlVector), adjustedSpeed * (isSprinting ? 2.5 : 1))

// Cast a ray to determine how this force vector will reposition the player.
const { hit, triIndex, point, forceVector: outputForceVector } = world.castRay(forceVector, client.deltaTime / 1000, true)

if (hit) {
 user.walkPhase = user.walkStartFrame / user.walkFrames
 user.element.classList.remove("walking")
} else {

 // Counter-act screen-space vertical scale.
 const distance = Vector.magnitude(Vector.multiply(Vector.subtract(world.position, point), Vector[3](1, 1, 2)))

 // Use the walking animations.
 user.element.classList.add("walking")

 // Iterate walk cycle phase based on speed.
 user.walkPhase = (user.walkPhase + distance * user.strideFactor) % 1
}

// const speed = Vector.magnitude(Vector.subtract(point, world.position)) / (client.deltaTime / 1000)
// if (Math.floor(speed * 100) > Math.floor(adjustedSpeed * 100)) {
//  warn('speed violation from cast', { speed, adjustedSpeed })
// }

// Distribute the runtime state.
world.position.x = point.x
world.position.y = point.y
world.position.z = point.z
world.triIndex = triIndex

// Move the world to the tri and point provided by the ray cast results.
const triData = world.triTable[triIndex]
const row = triData.rows[Math.floor(point.z) - triData.zRange.min]
const newRouteID = triData.offset + row.offset + BigInt(Math.floor(point.x) - row.xyRange.min.x)
if (newRouteID !== world.routeID) {

 world.setRouteID(newRouteID, false, true)
} else {
 world.updateView()
}

// When edge sliding, turn the user toward the direction of travel instead of the direction of force.
// TODO: if the output vector is not the input vector, smooth it over several frames just like the camera.
// const facingDirectionRouteID = user.vectorToRouteID(outputForceVector)

const facingDirectionRouteID = user.vectorToRouteID(forceVector)

if (facingDirectionRouteID !== null && facingDirectionRouteID !== user.routeID)
 user.setRouteID(facingDirectionRouteID)