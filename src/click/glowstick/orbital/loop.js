if (orbitalGame.loading) {
 debug('loading for 1 frame')
 return
}

if (orbitalGame.loadedLevel !== orbitalLevel) {
 orbitalGame.loadedLevel = orbitalLevel
 orbitalGame.loadLevelAsync()
 return
}

if (orbitalGame.canvasSizeChanged) {
 orbitalGame.updateCanvasSize()
 orbitalGame.canvasSizeChanged = false
}

orbitalGame.reactToUserInput()
orbitalGame.updateUniformBuffer()
orbitalGame.render()
orbitalGame.updateDebugView()