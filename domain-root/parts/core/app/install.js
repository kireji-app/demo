const
 n = navigator,
 a = n.userAgent,
 c = n.serviceWorker,
 g = n.gpu,
 isMac = a.indexOf("Mac") > -1,
 throttleDuration = /^((?!chrome|android).)*safari/i.test(a) ? 350 : 75

if (c) {
 const reg = await c.getRegistration() ?? await c.register(scriptSource),
  sw = reg.active ?? (await new Promise(r => ((reg.waiting ?? reg.installing).onstatechange = ({ target: t }) => t.state == "activated" && r(t))))
 c.controller || (await new Promise(r => ((c.oncontrollerchange = r), sw.postMessage({ code: 0 }))))
 c.oncontrollerchange = c.onmessage = () => location.reload()
 document.querySelector('[rel="manifest"]').href = "manifest.json"
 // DEBUG REFRESH
 // addEventListener("focus", () => reg.update().catch(c.onmessage))
}

if (g) {
 globalThis.GPU = await(await g.requestAdapter()).requestDevice()
}

this.globalStyleSheet = new CSSStyleSheet()
document.adoptedStyleSheets.push(this.globalStyleSheet)

let
 contextKeysDown = 0,
 shiftKeysDown = 0

onblur = e => {
 contextKeysDown = shiftKeysDown = 0
}

onkeyup = e => {
 if (isMac) {
  if (e.key === "Meta") contextKeysDown = Math.max(0, contextKeysDown - 1)
 } else if (e.key === "Control") contextKeysDown = Math.max(0, contextKeysDown - 1)
 if (e.key === "Shift") shiftKeysDown = Math.max(0, shiftKeysDown - 1)
 e.preventDefault()
}

onkeydown = e => {
 if (isMac) {
  if (e.key === "Meta") contextKeysDown++
 } else if (e.key === "Control") contextKeysDown++
 if (e.key === "Shift") shiftKeysDown++
 if (contextKeysDown === 1 && !shiftKeysDown && e.key === "z") history.back()
 if (contextKeysDown === 1 && !shiftKeysDown && e.key === "y") history.forward()
 if (contextKeysDown === 1 && shiftKeysDown && e.key === "z") history.forward()
 e.preventDefault()
}

let
 addressbarState,
 throttleStartTime,
 time = performance.now()

globalThis.onhashchange = () => {
 let { pathname, search, hash, host: uid } = location
 if (pathname !== "/" || search || !hash || hash.length <= 1) history.replaceState({}, null, `//${uid}/${hash ||= "#0"}`)

 let binaryString = "0b"
 for (let i = 1; i < hash.length; i++) binaryString += RADIX.indexOf(hash[i]).toString(2).padStart(6, 0)
 this.documentState = BigInt(binaryString)

 addressbarState = this.documentState
 throttleStartTime = time
}

let
 animationFrameID,
 meanFrameTime = 1000,
 fps = 1

globalThis.loop = now => {
 fps = Math.round(1000 / (meanFrameTime += (now - time - meanFrameTime) / 20))
 time = now
 if (time - throttleStartTime >= throttleDuration && addressbarState !== this.documentState) {
  const hash = "#" + encode(this.documentState)
  history.pushState({}, null, hash)
  addressbarState = this.documentState
  throttleStartTime = time
 }
 if (this.state !== this.documentState) this.setState(this.documentState)
 animationFrameID = requestAnimationFrame(loop)
}

onhashchange()

this.state = Infinity