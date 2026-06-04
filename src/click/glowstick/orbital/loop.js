if (OrbitalGame.loading) {
 OrbitalGame.onscreenContext.canvas.classList.add("loading")
 debug('loading for 1 frame')
 return
} else {
 OrbitalGame.onscreenContext.canvas.classList.remove("loading")
}

let skipFrame = true

if (OrbitalGame.loadedLevel !== OrbitalLevels.arm) {
 skipFrame = false
 OrbitalGame.loadedLevel = OrbitalLevels.arm
 OrbitalGame.loadLevelAsync()
 return
}

if (OrbitalGame.canvasSizeChanged) {
 skipFrame = false
 OrbitalGame.updateCanvasSize()
 OrbitalGame.canvasSizeChanged = false
}

if (document.body.classList.contains("paused") && skipFrame)
 return

OrbitalGame.reactToKeyboardInput()
OrbitalGame.updateUniformBuffer()
OrbitalGame.render()

if (OrbitalGame.manifest.debug)
 OrbitalGame.updateDebugView()