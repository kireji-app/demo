Pointer.handle({
 down() {
  // Down.
  GlowstickGame.thumbstickStart = Vector.xyz(POINTER_EVENT.clientX, 0, POINTER_EVENT.clientY)
  GlowstickGame.thumbstickElement = GlowstickGame.container.appendChild(document.createElement("thumbstick-"))
  GlowstickGame.thumbstickElement.style.setProperty("--x", GlowstickGame.thumbstickStart.x + "px")
  GlowstickGame.thumbstickElement.style.setProperty("--z", GlowstickGame.thumbstickStart.z + "px")
  GlowstickGame.handleElement = GlowstickGame.thumbstickElement.appendChild(document.createElement("handle-"))
  GlowstickGame.handleElement.style.setProperty("--x", "0px")
  GlowstickGame.handleElement.style.setProperty("--z", "0px")
 },
 drag(pointerEvent) {
  // Drag.
  GlowstickGame.thumbstickVector.x = pointerEvent.clientX - GlowstickGame.thumbstickStart.x
  GlowstickGame.thumbstickVector.z = pointerEvent.clientY - GlowstickGame.thumbstickStart.z
 },
 reset() {
  // Reset.
  GlowstickGame.thumbstickStart = null
  GlowstickGame.thumbstickElement.remove()
  GlowstickGame.thumbstickElement = null
  GlowstickGame.handleElement = null
  GlowstickGame.thumbstickVector.x = 0
  GlowstickGame.thumbstickVector.z = 0
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})