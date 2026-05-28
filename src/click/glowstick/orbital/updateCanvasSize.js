const canvasRect = orbitalGame.onscreenContext.canvas.getBoundingClientRect()

const newCanvasWidth = Math.ceil(canvasRect.width / orbitalCamera.pixelRatio)
const newCanvasHeight = Math.ceil(canvasRect.height / orbitalCamera.pixelRatio)

orbitalGame.onscreenContext.canvas.width = orbitalGame.offscreenContext.canvas.width = newCanvasWidth
orbitalGame.onscreenContext.canvas.height = orbitalGame.offscreenContext.canvas.height = newCanvasHeight