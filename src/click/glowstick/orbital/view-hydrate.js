base()

const onscreenCanvas = Q("#onscreen-canvas")
const offscreenCanvas = new OffscreenCanvas(64, 64)

orbitalGame.onscreenContext = onscreenCanvas.getContext("2d", { willReadFrequently: true })
orbitalGame.offscreenContext = offscreenCanvas.getContext('webgpu')

orbitalGame.offscreenContext.configure({
 device: gpu.device,
 format: 'bgra8unorm',
 usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
 alphaMode: 'premultiplied'
})

orbitalGame.uniformBuffer = gpu.createBuffer(orbitalCamera.buffer, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST)

addEventListener("resize", () => orbitalGame.reactToCanvasChange())
// _.parts.desktop.era.attach("update", orbitalGame, "reactToCanvasChange")

orbitalGame.container.addEventListener('mousemove', mouseEvent => {
 if (document.pointerLockElement === orbitalGame.container)
  orbitalGame.reactToMouseMovement(mouseEvent.movementX, mouseEvent.movementY)
})

orbitalGame.container.addEventListener('pointerdown', pointerEvent => {
 if (document.pointerLockElement === orbitalGame.container)
  orbitalGame.actionPoint(pointerEvent, orbitalGame.container)
})

// TODO: Handle systems without fullscreen support (i.e. mobile).
function reactivePause() {
 if (document.body.classList.contains("paused"))
  return

 if (!document.pointerLockElement)
  orbitalGame.pauseAsync()
}

/* 
 addEventListener("fullscreenchange", () => {
  if (document.body.classList.contains("paused"))
   return

  if (!document.fullscreenElement)
   orbitalGame.pauseAsync()
 })

 document.addEventListener("fullscreenerror", reactivePause)
*/

document.addEventListener('pointerlockchange', reactivePause)
document.addEventListener('pointerlockerror', reactivePause)
document.addEventListener('visibilitychange', reactivePause)
window.addEventListener('blur', reactivePause)
window.addEventListener('focus', reactivePause)