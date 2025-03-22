if (!navigator.serviceWorker)
 throw 'unhandled: no service worker'

const reg = await navigator.serviceWorker.getRegistration() ?? await navigator.serviceWorker.register(Framework.version + Framework.clientScriptURL)
reg.active ?? await new Promise(r => ((reg.waiting ?? reg.installing).onstatechange = ({ target: t }) => t.state == "activated" && r(t)))
const worker = navigator.serviceWorker.controller || (await new Promise(r => ((navigator.serviceWorker.oncontrollerchange = r), reg.active.postMessage({ code: "claim" }))))
const channel = new BroadcastChannel("debug-reload")
channel.onmessage = navigator.serviceWorker.oncontrollerchange = () => location.reload()

document.querySelector('[rel="manifest"]').href = Framework.version + "manifest.json"

if (Framework.isDebug)
 addEventListener("focus", () => reg.update().catch(navigator.serviceWorker.onmessage))

Object.assign(globalThis, {
 worker,
 desktop: Object.assign(part, {
  pathEncoder: new (Framework.createType("path.core.parts"))(null),
  gpu: navigator.gpu && await(await navigator.gpu.requestAdapter()).requestDevice(),
  fps: 1,
  time: performance.now(),
  isMac: navigator.userAgent.indexOf("Mac") > -1,
  windows: {},
  meanFrameTime: 1000,
  shiftKeysDown: 0,
  addressBarState: undefined,
  contextKeysDown: 0,
  animationFrameID: undefined,
  throttleDuration: /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? 350 : 75,
  throttleStartTime: undefined,
  /*
   async requestFrame(now) {
    desktop.fps = Math.round(1000 / (desktop.meanFrameTime += (now - desktop.time - desktop.meanFrameTime) / 20))
    desktop.time = now
    if (desktop.time - desktop.throttleStartTime >= desktop.throttleDuration && desktop.addressBarState !== desktop.state[root.primaryLayer]) {
     const hash = "#" + desktop.encodeState(desktop.state[root.primaryLayer])
     history.pushState({}, null, hash)
     desktop.addressBarState = desktop.state[root.primaryLayer]
     desktop.throttleStartTime = desktop.time
    }
    desktop.animationFrameID = requestAnimationFrame(now => desktop.requestFrame(now))
   },
  */
  async parseStateFromAddressBar() {
   desktop.throttleStartTime = desktop.time

   const { pathname, search, hash, host, href } = new URL(location)
   const isLocal = host.startsWith("localhost:")
   const typeName = isLocal ? Framework.debugHost : host
   if (pathname?.length < Framework.version.length) throw 'malformed url'
   const segments = pathname.slice(1).split(/\/+/).filter(segment => segment)
   const versionSegment = segments.shift()
   const version = "/" + versionSegment + "/"

   if (!versionSegment.startsWith("v") || isNaN(parseInt(versionSegment.slice(1))) || version !== Framework.version)
    throw 'malformed version ' + version

   if (!segments.length)
    segments.push(...`default/path/for/${typeName}/goes/here`.split("/"))

   // Temp for example purposes.
   const desktopCode = segments[0]
   const desktopState = desktop.decodeState(desktopCode) % desktop.size

   await desktop.setLayer(root.stagingLayer, desktopState)
   desktop.pathEncoder.parse(root.primaryLayer, segments.join("/"))
   const results = [...desktop.pathEncoder].map(segment => segment.state[root.primaryLayer])
   const settingsState = results.shift()
   if (settingsState >= desktop.settings.size) {
    console.warn("ignoring settings - out of range")
    await desktop.settings.setLayer(root.stagingLayer, 0n)
   } else await desktop.settings.setLayer(root.stagingLayer, settingsState)
   await desktop.setLayer(root.primaryLayer, desktop.state[root.stagingLayer])
   for (let i = 0; i < results.length; i++) {
    const result = results[i]
    console.log('set task' + i + ' to state ' + result)
   }
  },
  decodeState(code) {
   let binaryValue = "0b0"
   let binaryOffset = "0b0"

   for (const char of code) {
    const index = Framework.segmentRadix.indexOf(char)
    if (index === -1) {
     console.warn("ignoring invalid path (paths cannot include '" + char + "').")
     binaryValue = "0b0"
     binaryOffset = "0b0"
     break;
    }
    binaryValue += index.toString(2).padStart(6, 0)
    binaryOffset += "000001"
   }

   return BigInt(binaryValue) + BigInt(binaryOffset) - 1n
  },
  encodeState(state) {
   state++
   let binaryValue = ""
   let code = ""

   let tempState = state
   let chunkCount = 0n

   while (tempState > 0n) {
    const chunkAddend = 2n ** (chunkCount * 6n)
    if (tempState >= chunkAddend) {
     tempState -= chunkAddend
     chunkCount++
    } else {
     break;
    }
   }

   let offset = 0n
   for (let i = 0n; i < chunkCount; i++)
    offset += 2n ** (i * 6n)

   binaryValue = (state - offset).toString(2)

   const finalLength = Number(chunkCount) * 6
   const paddedBinaryString = binaryValue.padStart(finalLength, '0')

   for (let i = 0; i < finalLength; i += 6) {
    const hexad = paddedBinaryString.slice(i, i + 6)
    code += Framework.segmentRadix[parseInt(hexad, 2)]
   }

   return code
  },
  async stageState(target, state, resetStagingLayer = false) {
   if (resetStagingLayer) await root.resetStagingLayer()
   await target.setLayer(root.stagingLayer, state)
   return desktop.state[root.stagingLayer]
  },
  async publishStagingLayer() {
   await desktop.setLayer(root.primaryLayer, desktop.state[root.stagingLayer])
  }
 }),
 element: (parentElement, tagname) => parentElement.appendChild(document.createElement(tagname)),
 svg: (parentElement, ...paths) => {
  const result = parentElement.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
  result.setAttribute("viewBox", "-1 -1 2 2")
  result.setAttribute("class", "nav-button")
  result.innerHTML = paths.map(path => `<path d="${path}" stroke-width="0.2" stroke-linecap="round" />`).join("\n")
  return result
 },
 spacer: parentElement => {
  const spacer = element(parentElement, "")
  spacer.setAttribute("class", "spacer")
  return spacer
 },
 onhashchange: async () => await desktop.parseStateFromAddressBar(),
 onblur: e => desktop.contextKeysDown = desktop.shiftKeysDown = 0,
 onkeyup: e => {
  if (desktop.isMac) {
   if (e.key === "Meta") desktop.contextKeysDown = Math.max(0, desktop.contextKeysDown - 1)
  } else if (e.key === "Control") desktop.contextKeysDown = Math.max(0, desktop.contextKeysDown - 1)
  if (e.key === "Shift") desktop.shiftKeysDown = Math.max(0, desktop.shiftKeysDown - 1)
  e.preventDefault()
 },
 onkeydown: e => {
  if (desktop.isMac) {
   if (e.key === "Meta") desktop.contextKeysDown++
  } else if (e.key === "Control") desktop.contextKeysDown++
  if (e.key === "Shift") desktop.shiftKeysDown++
  if (desktop.contextKeysDown === 1 && !desktop.shiftKeysDown && e.key === "z") history.back()
  if (desktop.contextKeysDown === 1 && !desktop.shiftKeysDown && e.key === "y") history.forward()
  if (desktop.contextKeysDown === 1 && desktop.shiftKeysDown && e.key === "z") history.forward()
  e.preventDefault()
 }
})

desktop.adoptedStyleSheets = document.adoptedStyleSheets

if (Framework.isDebug)
 Framework.debugHost = await(await fetch(Framework.version + "debug.host")).text()

await desktop.parseStateFromAddressBar()

console.log('initialized desktop')