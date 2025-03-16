Object.assign(globalThis, {
 app: Object.assign(part, {
  fps: 1,
  time: performance.now(),
  isMac: navigator.userAgent.indexOf("Mac") > -1,
  radix: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_.~?#&/=!$*".slice(0, 64),
  meanFrameTime: 1000,
  shiftKeysDown: 0,
  addressBarState: undefined,
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
  }, /*
  async requestFrame(now) {
   app.fps = Math.round(1000 / (app.meanFrameTime += (now - app.time - app.meanFrameTime) / 20))
   app.time = now
   if (app.time - app.throttleStartTime >= app.throttleDuration && app.addressBarState !== app.state[root.primaryLayer]) {
    const hash = "#" + app.encodeState(app.state[root.primaryLayer])
    history.pushState({}, null, hash)
    app.addressBarState = app.state[root.primaryLayer]
    app.throttleStartTime = app.time
   }

   // if (app.state[root.primaryLayer] !== app.documentState) {
   //  await app.setLayer(root.primaryLayer, app.documentState)
   //  for (const id in app.callbacks) await app.callbacks[id]()
   // }

   app.animationFrameID = requestAnimationFrame(now => app.requestFrame(now))
  },*/
  async parseStateFromAddressBar() {
   const { pathname, search, hash, host, href } = location
   const isLocal = host.startsWith("localhost:")
   const typeName = isLocal ? Framework.debugHost : host
   const myVersion = Framework.version
   const [version = myVersion, code = ""] = pathname.length > 1 ? pathname.slice(1).split('/') : []

   if (version !== myVersion)
    throw "unexpected request for another app version"

   let state = this.decodeState(code)

   if (state >= app.size) {
    console.warn("404 - ignoring out-of-range state " + state + "/" + app.size)
    state = 0n
   }

   const path = "/" + version + "/" + (state === 0n ? "" : code)

   if (hash || search || pathname !== path)
    history.replaceState({}, null, path)

   app.addressBarState = state
   app.throttleStartTime = app.time

   if (app.addressBarState !== app.state[root.primaryLayer])
    await app.setLayer(root.primaryLayer, app.addressBarState)
  },
  decodeState(code) {
   let binaryValue = "0b0"
   let binaryOffset = "0b0"

   for (const char of code) {
    const index = app.radix.indexOf(char)
    if (index === -1) {
     console.warn("ignoring invalid path (paths cannot include '" + char + "').")
     binaryValue = "0b0"
     binaryOffset = "0b0"
     break;
    }
    binaryValue += index.toString(2).padStart(6, 0)
    binaryOffset += "000001"
   }

   return BigInt(binaryValue) + BigInt(binaryOffset)
  },
  encodeState(state) {
   let binaryValue = ""
   let code = ""

   let tempState = state
   let chunkCount = 0

   while (tempState > 0n) {
    if (tempState >= BigInt(Math.pow(2, chunkCount * 6))) {
     tempState -= BigInt(Math.pow(2, chunkCount * 6))
     chunkCount++
    } else {
     break;
    }
   }

   let offset = 0n
   for (let i = 0; i < chunkCount; i++)
    offset += BigInt(Math.pow(2, i * 6))

   binaryValue = (state - offset).toString(2)

   const finalLength = chunkCount * 6
   const paddedBinaryString = binaryValue.padStart(finalLength, '0')

   for (let i = 0; i < finalLength; i += 6) {
    const hexad = paddedBinaryString.slice(i, i + 6)
    code += app.radix[parseInt(hexad, 2)]
   }

   return code
  },
  async stageState(target, state, resetStagingLayer = false) {
   if (resetStagingLayer) await root.resetStagingLayer()
   await target.setLayer(root.stagingLayer, state)
   return "/" + Framework.version + "/" + app.encodeState(app.state[root.stagingLayer])
  }
 }),
 onhashchange: async () => await app.parseStateFromAddressBar(),
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

await app.parseStateFromAddressBar()