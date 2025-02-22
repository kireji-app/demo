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
  requestFrame(now) {
   app.fps = Math.round(1000 / (app.meanFrameTime += (now - app.time - app.meanFrameTime) / 20))
   app.time = now
   if (app.time - app.throttleStartTime >= app.throttleDuration && app.addressbarState !== app.documentState) {
    const hash = "#" + app.encodeState(app.documentState)
    history.pushState({}, null, hash)
    app.addressbarState = app.documentState
    app.throttleStartTime = app.time
   }
   if (app.state[root.primaryLayer] !== app.documentState) app.setLayer(root.primaryLayer, app.documentState)
   app.animationFrameID = requestAnimationFrame(now => app.requestFrame(now))
  },
  parseStateFromAddressbar() {
   let { pathname, search, hash, host } = location
   if (pathname !== "/" || search || !hash || hash.length <= 1) history.replaceState({}, null, `//${host}/${hash ||= "#0"}`)
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
   /*
    // if the staged state is in a different app...
    e.preventDefault()
    let thatState = 0n
    for (const host of read("preferences.host").split(/\s+/g)) {
     if (host in app && host in that) thatState += app[host].state[layer] * that[host].conjunctionDivisor
    }
    location = "https://" + appHost + "#" + app.encodeState(thatState)
   */
   // TODO: a preferences event space. For any staged state user, we are attaching to preferences. There should be a callback list ...
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

app.gpu = navigator.gpu && await(await navigator.gpu.requestAdapter()).requestDevice()

if (navigator.serviceWorker) {
 const $ = navigator.serviceWorker, reg = await $.getRegistration() ?? await $.register(Core.clientBuildURL)
 reg.active ?? await new Promise(r => ((reg.waiting ?? reg.installing).onstatechange = ({ target: t }) => t.state == "activated" && r(t)))
 app.worker = $.controller || (await new Promise(r => (($.oncontrollerchange = r), $.postMessage({ code: 0 }))))
 $.oncontrollerchange = $.onmessage = () => location.reload()
 document.querySelector('[rel="manifest"]').href = "manifest.json"
 if (Core.tags.includes("dev")) addEventListener("focus", () => reg.update().catch($.onmessage))
}

app.adoptedStyleSheets = document.adoptedStyleSheets

app.parseStateFromAddressbar()
app.requestFrame(app.now)