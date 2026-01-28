pointer.handle({
 down() {
  // Down.
  glowstick.thumbstickStart = { x: POINTER_EVENT.clientX, y: POINTER_EVENT.clientY }
  glowstick.thumbstickElement = glowstick.container.appendChild(document.createElement("thumbstick-"))
  glowstick.thumbstickElement.style.setProperty("--x", glowstick.thumbstickStart.x + "px")
  glowstick.thumbstickElement.style.setProperty("--y", glowstick.thumbstickStart.y + "px")
  glowstick.handleElement = glowstick.thumbstickElement.appendChild(document.createElement("handle-"))
  glowstick.handleElement.style.setProperty("--x", "0px")
  glowstick.handleElement.style.setProperty("--y", "0px")
 },
 drag(pointerEvent) {
  // Drag.
  glowstick.thumbstickVector.x = pointerEvent.clientX - glowstick.thumbstickStart.x
  glowstick.thumbstickVector.y = pointerEvent.clientY - glowstick.thumbstickStart.y
 },
 reset() {
  // Reset.
  glowstick.thumbstickStart = null
  glowstick.thumbstickElement.remove()
  glowstick.thumbstickElement = null
  glowstick.handleElement = null
  glowstick.thumbstickVector.x = 0
  glowstick.thumbstickVector.y = 0
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})