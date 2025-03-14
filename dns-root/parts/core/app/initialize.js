Object.assign(globalThis, {
 app: Object.assign(part, {
  fps: 1,
  time: performance.now(),
  isMac: navigator.userAgent.indexOf("Mac") > -1,
  radix: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_.~?#&/=!$*".slice(0, 64),
  meanFrameTime: 1000,
  shiftKeysDown: 0,
  addressbarState: undefined,
  contextKeysDown: 0,
  animationFrameID: undefined,
  throttleDuration: /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? 350 : 75,
  throttleStartTime: undefined,
  callbacks: {},
  listen(id, callback) {
   this.callbacks[id] = callback
  },
  unlisten(id) {
   delete this.callbacks[id]
  },
  async requestFrame(now) {
   app.fps = Math.round(1000 / (app.meanFrameTime += (now - app.time - app.meanFrameTime) / 20))
   app.time = now
   if (app.time - app.throttleStartTime >= app.throttleDuration && app.addressbarState !== app.documentState) {
    const hash = "#" + app.encodeState(app.documentState)
    history.pushState({}, null, hash)
    app.addressbarState = app.documentState
    app.throttleStartTime = app.time
   }
   if (app.state[root.primaryLayer] !== app.documentState) {
    await app.setLayer(root.primaryLayer, app.documentState)
    for (const id in app.callbacks) await app.callbacks[id]()
   }

   app.animationFrameID = requestAnimationFrame(now => app.requestFrame(now))
  },
  parseStateFromAddressbar() {
   let { pathname, search, hash, host } = location
   if (pathname !== "/" || search || !hash || hash.length <= 1) {
    console.warn('lost context', location.href)
    history.replaceState({}, null, `//${host}/${hash ||= "#0"}`)
   }
   let binaryString = "0b"
   for (let i = 1; i < hash.length; i++) binaryString += app.radix.indexOf(hash[i]).toString(2).padStart(6, 0)
   app.addressbarState = app.documentState = BigInt(binaryString)
   app.throttleStartTime = app.time
  },
  encodeState(state) {
   const
    hexads = [],
    binaryString = state.toString(2),
    newLength = Math.ceil(binaryString.length / 6),
    fullbin = binaryString.padStart(newLength * 6, 0)
   for (let i = 0; i < newLength; i++) hexads.push(fullbin.slice(i * 6, (i + 1) * 6))
   return hexads.reduce((hash, hexad) => hash + app.radix[parseInt(hexad, 2)], "")
  },
  async stageState(target, state, resetStagingLayer = false) {
   if (resetStagingLayer) await root.resetStagingLayer()
   await target.setLayer(root.stagingLayer, state)
   return "#" + app.encodeState(app.state[root.stagingLayer])
  }
 }),
 onhashchange: () => app.parseStateFromAddressbar(),
 onblur: e => app.contextKeysDown = app.shiftKeysDown = 0,
 onkeyup: e => {
  if (app.isMac) {
   if (e.key === "Meta") app.contextKeysDown = Math.max(0, app.contextKeysDown - 1)
  } else if (e.key === "Control") app.contextKeysDown = Math.max(0, app.contextKeysDown - 1)
  if (e.key === "Shift") app.shiftKeysDown = Math.max(0, app.shiftKeysDown - 1)
  e.preventDefault()
 },
 onkeydown: e => {
  if (app.isMac) {
   if (e.key === "Meta") app.contextKeysDown++
  } else if (e.key === "Control") app.contextKeysDown++
  if (e.key === "Shift") app.shiftKeysDown++
  if (app.contextKeysDown === 1 && !app.shiftKeysDown && e.key === "z") history.back()
  if (app.contextKeysDown === 1 && !app.shiftKeysDown && e.key === "y") history.forward()
  if (app.contextKeysDown === 1 && app.shiftKeysDown && e.key === "z") history.forward()
  e.preventDefault()
 }
})

app.adoptedStyleSheets = document.adoptedStyleSheets

app.parseStateFromAddressbar()
await app.requestFrame(app.now)