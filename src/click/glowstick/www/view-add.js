glowstick.frameRequest = requestAnimationFrame(() => glowstick.loop(performance.now()))

const
 element = desktop.wallpaper,
 start = e => {
  debug('start')
  if (e.pointerType === 'touch') {
   e.preventDefault()
   if (pointerID !== null) return
   thumbstickStart = { x: e.clientX, y: e.clientY }
   element.setPointerCapture(pointerID = e.pointerId)
   document.addEventListener("pointermove", drag)
   document.addEventListener("pointerup", end)
   document.addEventListener("pointercancel", end)
  }
 },
 drag = e => {
  debug('drag')
  if (e.pointerType === 'touch') {
   if (e.pointerId !== pointerID) return
   e.preventDefault()
   glowstick.thumbstickVector.x = e.clientX - thumbstickStart.x
   glowstick.thumbstickVector.y = e.clientY - thumbstickStart.y
   debug(glowstick.thumbstickVector)
  }
 },
 end = e => {
  debug('end')
  if (e.pointerType === 'touch') {
   if (e.pointerId !== pointerID) return
   glowstick.thumbstickVector.x = 0
   glowstick.thumbstickVector.y = 0
   document.removeEventListener("pointermove", drag)
   document.removeEventListener("pointerup", end)
   document.removeEventListener("pointercancel", end)
   element.releasePointerCapture(pointerID)
   pointerID = null
   thumbstickStart = null
  }
 }

let pointerID = null
let thumbstickStart = null

element.onpointerdown = start