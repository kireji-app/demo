pointer.handle({
 down() {
  // Down.
  glowstick.thumbstickStart = Vector[3](POINTER_EVENT.clientX, 0, POINTER_EVENT.clientY)
  glowstick.thumbstickElement = glowstick.container.appendChild(document.createElement("thumbstick-"))
  glowstick.thumbstickElement.style.setProperty("--x", glowstick.thumbstickStart.x + "px")
  glowstick.thumbstickElement.style.setProperty("--z", glowstick.thumbstickStart.z + "px")
  glowstick.handleElement = glowstick.thumbstickElement.appendChild(document.createElement("handle-"))
  glowstick.handleElement.style.setProperty("--x", "0px")
  glowstick.handleElement.style.setProperty("--z", "0px")
 },
 drag(pointerEvent) {
  // Drag.
  glowstick.thumbstickVector.x = pointerEvent.clientX - glowstick.thumbstickStart.x
  glowstick.thumbstickVector.z = pointerEvent.clientY - glowstick.thumbstickStart.z
 },
 reset() {
  // Reset.
  glowstick.thumbstickStart = null
  glowstick.thumbstickElement.remove()
  glowstick.thumbstickElement = null
  glowstick.handleElement = null
  glowstick.thumbstickVector.x = 0
  glowstick.thumbstickVector.z = 0
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})