const canvasRect = OrbitalGame.onscreenContext.canvas.getBoundingClientRect()

const newCanvasWidth = Math.ceil(canvasRect.width / OrbitalCamera.pixelRatio)
const newCanvasHeight = Math.ceil(canvasRect.height / OrbitalCamera.pixelRatio)

OrbitalGame.onscreenContext.canvas.width = OrbitalGame.offscreenContext.canvas.width = newCanvasWidth
OrbitalGame.onscreenContext.canvas.height = OrbitalGame.offscreenContext.canvas.height = newCanvasHeight