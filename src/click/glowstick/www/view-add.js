const
 element = desktop.wallpaper,
 start = e => {
  if (e.pointerType === 'touch') {
   e.preventDefault()
   element.addEventListener('contextmenu', nolongtap)
   if (glowstick.pointerID !== null) return
   glowstick.thumbstickStart = { x: e.clientX, y: e.clientY }
   glowstick.thumbstickElement = desktop.wallpaper.appendChild(document.createElement("thumbstick-"))
   glowstick.thumbstickElement.style.setProperty("--x", glowstick.thumbstickStart.x + "px")
   glowstick.thumbstickElement.style.setProperty("--y", glowstick.thumbstickStart.y + "px")
   // if (production) glowstick.thumbstickElement.style.display = "none"
   glowstick.handleElement = glowstick.thumbstickElement.appendChild(document.createElement("handle-"))
   glowstick.handleElement.style.setProperty("--x", "0px")
   glowstick.handleElement.style.setProperty("--y", "0px")
   element.setPointerCapture(glowstick.pointerID = e.pointerId)
   document.addEventListener("pointermove", drag)
   document.addEventListener("pointerup", end)
   document.addEventListener("pointercancel", end)
  }
 },
 drag = e => {
  if (e.pointerType === 'touch') {
   if (e.pointerId !== glowstick.pointerID) return
   e.preventDefault()
   glowstick.thumbstickVector.x = e.clientX - glowstick.thumbstickStart.x
   glowstick.thumbstickVector.y = e.clientY - glowstick.thumbstickStart.y
  }
 },
 end = e => {
  if (e.pointerType === 'touch') {
   if (e.pointerId !== glowstick.pointerID) return
   glowstick.thumbstickVector.x = 0
   glowstick.thumbstickVector.y = 0
   glowstick.thumbstickStart = null
   element.removeEventListener('contextmenu', nolongtap)
   document.removeEventListener("pointermove", drag)
   document.removeEventListener("pointerup", end)
   document.removeEventListener("pointercancel", end)
   element.releasePointerCapture(glowstick.pointerID)
   glowstick.pointerID = null
   glowstick.handleElement = null
   glowstick.thumbstickElement.remove()
   glowstick.thumbstickElement = null
  }
 },
 nolongtap = e => e.preventDefault()

element.onpointerdown = start