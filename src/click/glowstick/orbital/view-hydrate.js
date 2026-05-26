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

new ResizeObserver(() => setTimeout(() => orbitalGame.canvasSizeChanged = true, 0)).observe(onscreenCanvas)

addEventListener('mousemove', (mouseEvent) => {
 if (document.pointerLockElement === onscreenCanvas)
  orbitalGame.reactToMouseMovement(mouseEvent.movementX, mouseEvent.movementY)
})

addEventListener("fullscreenchange", () => {
 if (!document.fullscreenElement)
  orbitalGame.pauseGame()
})