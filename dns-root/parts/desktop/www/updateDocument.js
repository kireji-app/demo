// const now = performance.now()
// desktop.fps = Math.round(1000 / (desktop.meanFrameTime += (now - desktop.time - desktop.meanFrameTime) / 20))
// desktop.time = now
// if (now - desktop.throttleStartTime >= desktop.throttleDuration && desktop.addressBarState !== desktop.state[root.primaryLayer]) {
//  desktop.throttleStartTime = now

console.log("ready to save file " + desktop.state[LAYER])
// await desktop.pathEncoder.setLayer(LAYER, desktop.state[LAYER])
// history.replaceState({}, null, desktop.pathEncoder.toString())
desktop.addressBarState = desktop.state[LAYER]
// }