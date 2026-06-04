base()

const onscreenCanvas = Q("#onscreen-canvas")
const offscreenCanvas = new OffscreenCanvas(64, 64)

OrbitalGame.onscreenContext = onscreenCanvas.getContext("2d", { willReadFrequently: true })
OrbitalGame.offscreenContext = offscreenCanvas.getContext('webgpu')

OrbitalGame.offscreenContext.configure({
 device: Graphics.device,
 format: 'bgra8unorm',
 usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
 alphaMode: 'premultiplied'
})

OrbitalGame.uniformBuffer = Graphics.createBuffer(OrbitalCamera.buffer, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST)

addEventListener("resize", () => OrbitalGame.reactToCanvasChange())

OrbitalGame.container.addEventListener('mousemove', mouseEvent => {
 if (document.pointerLockElement === OrbitalGame.container)
  OrbitalGame.reactToMouseMovement(mouseEvent.movementX, mouseEvent.movementY)
})

OrbitalGame.container.addEventListener('pointerdown', pointerEvent => {
 if (document.pointerLockElement === OrbitalGame.container)
  OrbitalGame.actionPoint(pointerEvent, OrbitalGame.container)
})

function reactivePause() {
 if (document.body.classList.contains("paused"))
  return

 if (!document.pointerLockElement)
  OrbitalGame.pauseAsync()
}

document.addEventListener('pointerlockchange', reactivePause)
document.addEventListener('pointerlockerror', reactivePause)
document.addEventListener('visibilitychange', reactivePause)
window.addEventListener('blur', reactivePause)
window.addEventListener('focus', reactivePause)