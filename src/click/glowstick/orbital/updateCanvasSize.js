const canvasRect = orbitalGame.onscreenContext.canvas.getBoundingClientRect()
orbitalGame.onscreenContext.canvas.width = orbitalGame.offscreenContext.canvas.width = Math.round(canvasRect.width / orbitalCamera.pixelRatio)
orbitalGame.onscreenContext.canvas.height = orbitalGame.offscreenContext.canvas.height = Math.round(canvasRect.height / orbitalCamera.pixelRatio)