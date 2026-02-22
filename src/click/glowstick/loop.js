/** A normalized vector representing the player's movement direction. */
const controlVector = (() => {

 if (glowstick.thumbstickStart) {

  // The pointer is controlling the player character.
  const normalized = Vector.normalize(glowstick.thumbstickVector)
  const magnitude = Vector.magnitude(glowstick.thumbstickVector)
  const maxRadius = Math.max(Math.min(Math.min(globalThis.innerWidth, globalThis.innerHeight) * 0.10, 128), 48)
  const clamped = { x: normalized.x * Math.min(magnitude, maxRadius), y: normalized.y * Math.min(magnitude, maxRadius) }
  const clamped2 = { x: normalized.x * Math.min(magnitude / maxRadius, 1), y: normalized.y * Math.min(magnitude / maxRadius, 1) }

  // Position the visual thumbstick.
  glowstick.handleElement.style.setProperty("--x", clamped.x + "px")
  glowstick.handleElement.style.setProperty("--y", clamped.y + "px")
  return clamped2
 }

 // The keyboard might be controlling the player character.
 const keyboardVector = { x: 0, y: 0 }
 if (hotKeys.pressed.has("KeyA")) keyboardVector.x -= 1
 if (hotKeys.pressed.has("KeyD")) keyboardVector.x += 1
 if (hotKeys.pressed.has("KeyW")) keyboardVector.y -= 1
 if (hotKeys.pressed.has("KeyS")) keyboardVector.y += 1
 const normalized = Vector.normalize(keyboardVector)
 return normalized
})()

// Speed going up and down should be slower than speed going left and right to account for camera angle.
const adjustedSpeed = Vector.magnitude(Vector.multiply(
 Vector.multiply(controlVector, user.pixelsPerSecond),
 { x: 1, y: 3 / 4 }
))

if (adjustedSpeed === 0) {

 user.walkPhase = user.walkStartFrame / user.walkFrames
 // Nothing is happening.
 user.element.classList.remove("walking")

 return
}

// The force vector should still have the same screen-space angle as the player's thumbstick.
const forceVector = Vector.multiply(Vector.normalize(controlVector), adjustedSpeed)

// Cast a ray to determine how this force vector will reposition the player.
const { hit, triIndex, point, forceVector: outputForceVector } = world.castRay(forceVector, client.deltaTime / 1000, true)

if (hit) {
 user.walkPhase = user.walkStartFrame / user.walkFrames
 user.element.classList.remove("walking")
} else {

 // Counter-act screen-space vertical scale.
 const distance = Vector.magnitude(Vector.multiply(Vector.subtract(world.position, point), { x: 1, y: 4 / 3 }))

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
world.triIndex = triIndex

// Move the world to the tri and point provided by the ray cast results.
const triData = world.triTable[triIndex]
const row = triData.rows[Math.floor(point.y) - triData.range.min]
const newRouteID = triData.offset + row.offset + BigInt(Math.floor(point.x) - row.range.min)
if (newRouteID !== world.routeID) {

 // Skip redundant runtime state distribution.
 world.skipRuntimeStateDistribution = true
 world.setRouteID(newRouteID)
 world.skipRuntimeStateDistribution = false
} else {
 world.updateView()
}

// TODO: if the output vector is not the input vector, smooth it over several frames just like the camera.
// const facingDirectionRouteID = user.vectorToRouteID(outputForceVector)
const facingDirectionRouteID = user.vectorToRouteID(forceVector)

if (facingDirectionRouteID !== null && facingDirectionRouteID !== user.routeID)
 user.setRouteID(facingDirectionRouteID)