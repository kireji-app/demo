let facingDirectionRouteID

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
  facingDirectionRouteID = user.vectorToRouteID(normalized)
  return clamped2
 }

 // The keyboard might be controlling the player character.
 const keyboardVector = { x: 0, y: 0 }
 if (hotKeys.pressed.has("KeyA")) keyboardVector.x -= 1
 if (hotKeys.pressed.has("KeyD")) keyboardVector.x += 1
 if (hotKeys.pressed.has("KeyW")) keyboardVector.y -= 1
 if (hotKeys.pressed.has("KeyS")) keyboardVector.y += 1
 const normalized = Vector.normalize(keyboardVector)
 facingDirectionRouteID = user.vectorToRouteID(normalized)
 return normalized
})()

if (facingDirectionRouteID === undefined) {

 // Nothing is happening.
 user.element.classList.remove("walking")

 return
}

/** The forceVector vector, scaled by character speed per second and a vertical factor that accounts for the camera angle. */
const forceVector = Vector.multiply(
 Vector.multiply(controlVector, user.pixelsPerSecond),
 { x: 1, y: 0.75 }
)

// Cast a ray to determine how this force vector will reposition the player.
const { hit, triIndex, point } = world.castRay(forceVector, client.deltaTime / 1000)

if (!hit) {

 // Use the walking animations.
 user.element.classList.add("walking")
}

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

// Let the player aim the character even if he can't move in the given direction.
if (facingDirectionRouteID !== undefined && facingDirectionRouteID !== user.routeID)
 user.setRouteID(facingDirectionRouteID)