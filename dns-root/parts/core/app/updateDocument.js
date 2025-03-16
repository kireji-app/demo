// const now = performance.now()
// app.fps = Math.round(1000 / (app.meanFrameTime += (now - app.time - app.meanFrameTime) / 20))
// app.time = now
// if (now - app.throttleStartTime >= app.throttleDuration && app.addressBarState !== app.state[root.primaryLayer]) {
history.replaceState({}, null, '/' + Framework.version + "/" + app.encodeState(app.state[root.primaryLayer]))
app.addressBarState = app.state[root.primaryLayer]
//  app.throttleStartTime = now
// }