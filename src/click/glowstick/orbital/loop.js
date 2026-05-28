if (orbitalGame.loading) {
 orbitalGame.onscreenContext.canvas.classList.add("loading")
 debug('loading for 1 frame')
 return
} else {
 orbitalGame.onscreenContext.canvas.classList.remove("loading")
}

let skipFrame = true

if (orbitalGame.loadedLevel !== orbitalLevel) {
 skipFrame = false
 orbitalGame.loadedLevel = orbitalLevel
 orbitalGame.loadLevelAsync()
 return
}

if (orbitalGame.canvasSizeChanged) {
 skipFrame = false
 orbitalGame.updateCanvasSize()
 orbitalGame.canvasSizeChanged = false
}

if (document.body.classList.contains("paused") && skipFrame)
 return

orbitalGame.reactToKeyboardInput()
orbitalGame.updateUniformBuffer()
orbitalGame.render()

if (orbitalGame.manifest.debug)
 orbitalGame.updateDebugView()