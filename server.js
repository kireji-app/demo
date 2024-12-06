// © 2013 - 2024 Eric Augustinowicz and Kristina Soriano. All Rights Reserved.
function boot() {
 const VERSION = `0.87.6`,
  VERBOSE = true,
  DEV_PREFIX = "dev.",
  IS_DEV_HOST = location.host.startsWith(DEV_PREFIX),
  APP_HOST = location.host.slice(DEV_PREFIX.length * IS_DEV_HOST),
  HOST_PREFIX = IS_DEV_HOST ? DEV_PREFIX : "",
  APP_SHORT_NAME = APP_HOST.slice(0, -1 - APP_HOST.split(".").at(-1).length),
  EN = this.constructor === this.Window ? "client" : "server"

 class core_parts {
  get host() {
   return this.constructor.name.replaceAll("_", ".")
  }
  constructor() {
   this.index = 0n
   this.size = 1n
  }
  async populate(index) {
   if (this.index !== index) {
    if (index < 0n || index >= this.size) throw new RangeError(`index ${index} out of range (size ${this.size}): ${this.host}`)
    this.index = index
   }
  }
  async enter() {}
  async leave() {
   this.index = 0n
  }
  notify(from) {
   this.controller?.notify(this.host)
  }
 }
 class composite_core_parts extends core_parts {
  constructor(parts) {
   super()
   const units = (this.units = [1n])
   this.factors = {}
   this.parts = parts.reduceRight((parts, part, i) => {
    if (typeof part === "string") part = new core_parts(part)
    if (!(part instanceof core_parts)) throw new TypeError(`unexpected ${typeof part} encountered as factor of composite ${this.host}`)
    if (part.host in this.factors) throw new RangeError(`duplicate part name ${part.host} in composite ${this.host}`)
    this.factors[part.host] = {
     part,
     i,
     indexCache: part.index,
     get unit() {
      return units[i]
     },
    }
    parts.unshift(part)
    units.unshift(units[0] * part.size)
    part.controller = this
    return parts
   }, [])
   this.size = this.units.shift()
  }
  async enter() {
   await super.enter()
   for (const part of this.parts) await part.enter()
  }

  async populate(index) {
   await super.populate(index)
   for (let x = 0; x < this.units.length; x++) {
    const part = this.parts[x],
     factor = this.factors[part.host],
     unit = factor.unit,
     subindex = index / unit
    await part.populate(subindex)
    factor.indexCache = subindex
    index %= unit
   }
  }
  async leave() {
   await super.leave()
   for (const part of this.parts) await part.leave()
  }
  notify(from) {
   const factor = this.factors[from],
    { part, indexCache } = factor,
    { index: subindex } = part,
    unit = factor.unit
   const difference = subindex - indexCache,
    deltaIndex = difference * unit,
    newIndex = this.index + deltaIndex
   this.index = newIndex
   factor.indexCache = subindex
   super.notify(from)
  }
 }
 class bitmask_core_parts extends core_parts {
  constructor(length) {
   super()
   this.size = 2n ** BigInt(length)
  }
 }
 class decision_core_parts extends core_parts {
  size = 0n
  constructor(parts) {
   super()
   let offset = 0n
   this.options = {}
   this.parts = parts.map((part, i) => {
    if (typeof part === "string") part = new core_parts(part)
    if (!(part instanceof core_parts)) throw new TypeError(`unexpected ${typeof e} encountered at part = ${i} of decision ${this.host}`)
    this.options[part.host] = { part, i, offset }
    offset += part.size
    this.size += part.size
    part.controller = this
    return part
   })
  }
  async enter() {
   await super.enter()
   this.option = this.options[this.parts[0].host]
   await this.option.part.enter()
  }
  async populate(index) {
   if (this.index !== index || this.repopulate) {
    await super.populate(index)
    for (const part of this.parts) {
     if (index < part.size) {
      if (this.option.part !== part) {
       await this.option.part?.leave()
       this.option = this.options[part.host]
       await part.enter()
       if (index !== 0n) await part.populate(index)
      } else await part.populate(index)
      break
     }
     index -= part.size
    }
   }
  }
  async leave() {
   await super.leave()
   await this.option.part.leave()
   delete this.option
  }
  notify(from) {
   this.index = this.option.offset + this.option.part.index
   super.notify(from)
  }
 }
 class boot_core_parts extends decision_core_parts {
  constructor() {
   super(["boot", new server_core_parts(), new client_core_parts()])
  }
  async enter() {
   await super.enter()
   console.log(this.options, EN + ".core.parts")
   await this.populate(this.options[EN + ".core.parts"].offset)
   this.controller?.notify(this.host)
  }
 }
 class server_core_parts extends core_parts {
  async enter() {
   const cache = {},
    boilerplate = "© 2013 - 2024 Eric Augustinowicz and Kristina Soriano. All Rights Reserved."
   globalThis.onfetch = e => {
    // TODO: detect and throw error on any cross-deployment-stage resource fetches.
    const { pathname, host, origin } = new URL(e.request.url),
     isDevHost = host.startsWith(DEV_PREFIX),
     shortname = host
      .split(".")
      .slice(isDevHost ? 1 : 0, -1)
      .join("."),
     cacheKey = host + pathname
    if (isDevHost !== IS_DEV_HOST) throw new ReferenceError(`cannot request assets across deployment stages (${e.request.url})`)
    if (!(cacheKey in cache)) {
     let body, type
     switch (pathname) {
      case "/.gitignore":
       type = "text/plain"
       body = `# © 2013 - 2024 Eric Augustinowicz and Kristina Soriano. All Rights Reserved.
**/.DS_Store
**/Icon
**/.well-known
**/.tmp.driveupload
**/.tmp.drivedownload
**/*.gdoc
.vscode/scratch/*
favicon.gif
favicon.ico`
       break
      case "/.htaccess":
       type = "text/plain"
       body = `# ${boilerplate}
AddCharset utf-8 .js
ErrorDocument 404 /index.php
ErrorDocument 403 /index.php
Options -Indexes`
       break
      case "/index.php":
       body = `<!DOCTYPE html>
<html lang=en>
 <head>
  <!-- ${boilerplate} -->
  <link rel=manifest>
  <meta name=robots content=noindex>
  <meta name=viewport content="width=device-width,initial-scale=1">
  <script defer src="https://<?=$_SERVER["HTTP_HOST"]?>/server.js"></script>
  <title>Loading ...</title>
 </head>
</html>`
       type = "application/x-httpd-php; charset=UTF-8"
       break
      case "/README.md":
       type = "text/markdown; charset=UTF-8"
       body = `<!--- © 2013 - 2024 Eric Augustinowicz and Kristina Soriano. All Rights Reserved. --->

# About core_parts

This project aims to meet a large number of requirements which we will detail later.

Every app has a host (domain name) where it can be publically reached.

Domains beginning with the "dev." subdomain are dedicated to an unstable (but still publically available) version of the app used for staging changes.
`
       break
      case "/server.js":
      case "/client.js":
       body = `// ${boilerplate}\n${boot}\nboot()`
       type = "text/javascript; charset=UTF-8"
       break
      case "/manifest.json":
       const manifest = {
        name: host,
        short_name: shortname,
        start_url: ".",
        display: "standalone",
        theme_color: "#faf9f8",
        background_color: "#faf9f8",
        description: "This app is under development.",
        display_override: ["window-controls-overlay"],
        icons: [
         {
          src: "favicon.svg",
          sizes: "144x144",
          type: "image/svg+xml",
         },
         {
          src: "favicon.svg",
          sizes: "any",
          type: "image/svg+xml",
         },
         {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/svg+xml",
         },
         {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/svg+xml",
         },
        ],
        categories: ["entertainment", "games", "utilities"] /*
        protocol_handlers: [
         {
          protocol: "web+core_parts",
          url: "/core_parts?pathname=%s",
         },
        ],
        shortcuts: [
         {
          name: "New Item...",
          short_name: "New...",
          icons: [
           {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
           },
          ],
          url: "/new",
          description: "This is just a placeholder/hint for future development.",
         },
        ],
        screenshots: [
         {
          src: "desktop-screenshot.svg",
          sizes: "640x480",
          type: "image/svg+xml",
          form_factor: "wide",
          label: "This is a placeholder for the image of the app.",
         },
         {
          src: "mobile-screenshot.svg",
          sizes: "640x360",
          type: "image/svg+xml",
          form_factor: "narrow",
          label: "This is a placeholder for the image of the app.",
         },
        ],*/,
       }
       body = JSON.stringify(manifest, null, 1)
       type = "application/json; charset=UTf-8"
       break
       type = "image/svg+xml"
       break
      case "/favicon.svg":
      case "/favicon.ico":
      case "/apple-touch-icon.png":
      case "/mobile-screenshot.svg":
      case "/desktop-screenshot.svg":
      case "/android-chrome-192x192.png":
      case "/android-chrome-512x512.png":
       type = "image/svg+xml"
       body = `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <style>
  svg { background: white }
  text { fill: #333445 }
  @media (prefers-color-scheme = dark) {
   svg { background: #333445 }
   text { fill: white }
  }
 </style>
 <text x="12" y="12" dominant-baseline="central" text-anchor="middle">${shortname[0]}</text>  
</svg>`
       break
      default:
       body = `<!DOCTYPE html>
<html lang=en>
 <head>
  <!-- ${boilerplate} -->
  <link rel=manifest href="${origin}/manifest.json">
  <meta name=robots content=noindex>
  <meta name=viewport content="width=device-width,initial-scale=1">
  <script defer src="${origin}/client.js"></script>
  <title>Loading ...</title>
 </head>
</html>`
       type = "text/html; charset=UTF-8"
     }
     cache[cacheKey] = new Response(body, {
      headers: {
       "content-type": type,
       expires: "Sun, 20 Jul 1969 20:17:00 UTC",
       server: "kireji",
      },
     })
    }
    e.respondWith(cache[cacheKey].clone())
   }
   globalThis.oninstall = e => globalThis.skipWaiting()
   globalThis.onactivate = e => globalThis.clients.claim()
   globalThis.onmessage = e => [onactivate, () => registration.unregister().then(() => e.source.postMessage({ code: 0 }))][e.data.code]()
  }
 }
 class client_core_parts extends decision_core_parts {
  constructor() {
   super(["empty", new common_core_parts()])
  }
  async enter() {
   await super.enter()

   const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_",
    { gpu: g, userAgent: a, serviceWorker: c } = navigator,
    isMac = a.indexOf("Mac") > -1,
    throttleDuration = /^((?!chrome|android).)*safari/i.test(a) ? 350 : 75

   if (c) {
    const reg = await c.register(location.origin + "/server.js"),
     sw = reg.active ?? (await new Promise(r => ((reg.waiting ?? reg.installing).onstatechange = ({ target: t }) => t.state == "activated" && r(t))))
    c.controller || (await new Promise(r => ((c.oncontrollerchange = r), sw.postMessage({ code: 0 }))))
    c.oncontrollerchange = c.onmessage = () => location.reload()
    document.querySelector('[rel="manifest"]').href = location.origin + "/manifest.json"
    addEventListener("focus", () => reg.update().catch(() => location.reload()))
   }

   if (g) {
    GPU = await (await g.requestAdapter()).requestDevice()
   }

   this.stylesheet = new CSSStyleSheet()
   document.adoptedStyleSheets.push(this.stylesheet)

   let fps = 1,
    addressbarIndex,
    throttleStartTime,
    meanFrameTime = 1000,
    time = performance.now(),
    contextKeysDown = 0,
    shiftKeysDown = 0

   onblur = () => {
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

   onhashchange = () => {
    let { pathname, search, hash, origin } = location
    if (pathname !== "/" || search || !hash || hash.length <= 1) history.replaceState({}, null, `${origin}/${(hash ||= "#1")}`)
    let binaryString = "0b"
    for (let i = 1; i < hash.length; i++) binaryString += alphabet.indexOf(hash[i]).toString(2).padStart(6, 0)
    addressbarIndex = this.documentIndex = BigInt(binaryString)
    throttleStartTime = time
   }

   const onframechange = now => {
    fps = Math.round(1000 / (meanFrameTime += (now - time - meanFrameTime) / 20))
    time = now
    if (time - throttleStartTime >= throttleDuration && addressbarIndex !== this.documentIndex) {
     const hexads = [],
      binaryString = this.documentIndex.toString(2),
      newLength = Math.ceil(binaryString.length / 6),
      fullbin = binaryString.padStart(newLength * 6, 0)
     for (let i = 0; i < newLength; i++) hexads.push(fullbin.slice(i * 6, (i + 1) * 6))
     const hash = "#" + hexads.reduce((hash, hexad) => hash + alphabet[parseInt(hexad, 2)], "")
     history.pushState({}, null, hash)
     addressbarIndex = this.documentIndex
     throttleStartTime = time
    }
    if (this.index !== this.documentIndex) this.populate(this.documentIndex).then(() => this.controller?.notify(this.host))
    requestAnimationFrame(onframechange)
   }

   onhashchange()
   onframechange(time)
  }
  notify(from) {
   super.notify(from)
   this.documentIndex = this.index
  }
 }
 class common_core_parts extends composite_core_parts {
  constructor() {
   const apps = ["core.parts", "fallback.cloud", "kireji.io", "glowstick.click", "ejaugust.com", "orenjinari.com"].sort()
   super([new sidebar_common_core_parts(), new app_common_core_parts(), new colormode_core_parts()])
   this.apps = apps
  }
  async enter() {
   this.controller.stylesheet.replaceSync(`html, body {
--sidebar-tween: 0;
--sidebar-width: 256px;
--vellum-white: #faf9f8;
--prussian-blue: #19517f;
--official-blue: #131823;
overflow: hidden;
height: 100vh;
width: 100vw;
margin: 0;
-webkit-user-select: none;
overscroll-behavior: contain !important;
-ms-user-select: none;
user-select: none;
color: var(--official-blue);
background: var(--vellum-white);
}
body {
--system-ui:
 system-ui,
 "Segoe UI",
 Roboto,
 Helvetica,
 Arial,
 sans-serif,
 "Apple Color Emoji",
 "Segoe UI Emoji",
 "Segoe UI Symbol";
--system-ui-mono: ui-monospace, 
 Menlo, Monaco, 
 "Cascadia Mono", "Segoe UI Mono", 
 "Roboto Mono", 
 "Oxygen Mono", 
 "Ubuntu Mono", 
 "Source Code Pro",
 "Fira Mono", 
 "Droid Sans Mono", 
 "Consolas", "Courier New", monospace;
font: 13px var(--system-ui);
display: flex;
flex-flow: column;
justify-content: start;
}
#toolbar {
margin: 0;
padding: 0;
line-height: 61px;
display: flex;
color: var(--official-blue);
height: 61px;
box-sizing: border-box;
box-shadow: 0px 2px 7px #0002;
}
#toolbar > button {
height: 29px;
width: 29px;
cursor: pointer;
margin: 16px;
border-radius: 5px;
border: none;
color: inherit;
background: transparent;
font-size: 29px;
line-height: 29px;
padding: 0;
margin: 16px;
}
#toolbar > button:hover {
background: #fff5;
}
#toolbar > h1 {
cursor: pointer;
margin: 16px 0;
padding: 0;
font-size: 21px;
line-height: 29px;
font-weight: 400;
display: flex;
}
#toolbar > h1 > img {
height: 39px;
width: 39px;
margin: -5px;
}
#toolbar > h1 > .label {
margin-left: 1.5ch;
flex: 1;
line-height: 29px;
}
#toolbar > h1:hover {
text-decoration: underline;
}
#toolbar > .spacer {
flex: 1;
}
#version {
text-align: center;
padding: 0 8px;
font-family: var(--system-ui-mono);
font-size: 10px;
line-height: 18px;
color: var(--official-blue);
background-color: var(--vellum-white);
box-sizing: border-box;
border-radius: 7px;
font-weight: 900;
margin: auto;
box-shadow: 0 0 1px var(--official-blue);
}
#sidebar {
margin: 0;
padding: 0;
position: fixed;
left: calc((var(--sidebar-tween) - 1) * var(--sidebar-width));
top: 0;
height: 100vh;
width: var(--sidebar-width);
background: white;
opacity: var(--sidebar-tween);
box-shadow: 0px 0px 22px 8px #0001;
}
#sidebar {
display: flex;
flex-flow: column;
background: var(--vellum-white);
margin: 0;
box-sizing: border-box;
flex: 2;
min-width: 64px;
color: var(--official-blue);
outline: none;
}
#sidebar > .tagline {
font-weight: 300;
opacity: 60%;
max-height: 100%;
margin: 0;
}
#sidebar > h2 {
display: flex;
margin: 0;
gap: 0.5ch;
padding: 21px 21px 27px 21px;
box-sizing: border-box;
font-weight: 400;
}
#sidebar > h2 > .label {
flex: 1;
}
#sidebar > * {
box-shadow: 0 1px 0 0 #0002;
}
#sidebar .module {
padding: 16px;
}
#sidebar .module > h3 {
margin: 0;
padding: 0;
margin-bottom: 12px;
}
#sidebar .module > ul {
margin: 0;
display: flex;
flex-flow: column;
gap: 1px;
counter-reset: item;
overflow: hidden;
overflow-y: auto;
flex: 0 1 auto;
box-sizing: border-box;
line-height: 29px;
padding: 0;
}
#sidebar .module > ul > li {
list-style-type: none;
display: flex;
gap: 1.5ch;
padding: 4px 13px;
font-size: 13.5px;
border-radius: 3px;
flex: 0;
font-weight: 500;
margin: -1px;
line-height: 25px;
}
#sidebar .module > ul > li > img {
height: 25px;
width: 25px;
}
#sidebar .module > ul > li > .label {
overflow-y: visible;
overflow-x: clip;
text-overflow: ellipsis;
min-width: 0;
flex: 1 1;
}
#sidebar .module > ul > [data-selected="true"] {
color: rgba(12,103,192,1);
}
#sidebar .module > ul > li:not([data-selected="true"]):hover {
color: rgba(12,103,192,1);
cursor: pointer;
}
#logo {
font-weight: 700;
}
@media (display-mode: window-controls-overlay) {
#toolbar {
 padding-left: env(titlebar-area-x, 0);
 top: env(titlebar-area-y, 0);
 padding-right: calc(100% - env(titlebar-area-width, 100%) - env(titlebar-area-x, 0));
 height: 61px;
 width: 100%;
 -webkit-app-region: drag;
 app-region: drag;
}
#toolbar > h1,
#toolbar > button {
 -webkit-app-region: no-drag;
 app-region: no-drag;
}
}
`)
   const toolbar = document.body.appendChild(document.createElement("nav")),
    menuButton = toolbar.appendChild(document.createElement("button")),
    homeButton = toolbar.appendChild(document.createElement("h1")),
    spacer = toolbar.appendChild(document.createElement("span")),
    shareButton = toolbar.appendChild(document.createElement("button"))
   menuButton.innerText = "≡"
   this.menuButton = menuButton
   spacer.setAttribute("class", "spacer")
   toolbar.setAttribute("id", "toolbar")
   homeButton.innerHTML = `<img src=https://${HOST_PREFIX}${APP_HOST}/favicon.svg /><span class=label>${APP_SHORT_NAME}</span>`
   homeButton.onclick = () => {
    this.factors.app
   }
   if (navigator.share) {
    shareButton.onclick = () =>
     navigator.share({ title: document.title, url: location.href }).catch(error => {
      if (error.name !== "AbortError") console.error("Error sharing:", error)
     })
    shareButton.innerText = `➦`
   }
   this.stylesheet = new CSSStyleSheet()
   const appRoot = document.body.appendChild(document.createElement("main"))
   this.sidebar = document.body.appendChild(document.createElement("menu"))
   this.sidebar.setAttribute("id", "sidebar")
   const sidebarHeading = this.sidebar.appendChild(document.createElement("h2"))
   sidebarHeading.innerHTML = `<span id=logo>Kireji</span><span class=label>${APP_SHORT_NAME}</span><span id=version>${VERSION}</span>`
   const appsModule = this.sidebar.appendChild(document.createElement("section")),
    appsTitle = appsModule.appendChild(document.createElement("h3")),
    appList = appsModule.appendChild(document.createElement("ul"))
   appsTitle.innerText = `Apps`
   appsModule.setAttribute("class", "module")
   if (false && IS_DEV_HOST) {
    const pinsModule = this.sidebar.appendChild(document.createElement("section")),
     pinsTitle = pinsModule.appendChild(document.createElement("h3")),
     pinList = pinsModule.appendChild(document.createElement("ul"))
    pinsTitle.innerText = `Pins`
    pinsModule.setAttribute("class", "module")
   }
   this.appNodes = {}
   for (let i = 0; i < this.apps.length; i++) {
    const appname = this.apps[i],
     appParts = appname.split(".").slice(0, -1),
     shortName = appParts.join(" "),
     appNode = appList.appendChild(document.createElement("li"))
    appNode.innerHTML = `<img src=https://${HOST_PREFIX}${appname}/favicon.svg /><span class=label>${shortName}</span>`
    this.appNodes[appname] = appNode
    appNode.onclick = () => {
     const host = this.apps[i]
     if (APP_HOST !== host) location = "https://" + HOST_PREFIX + host + "/#5"
    }
   }
   this.selectedNode = this.appNodes[APP_HOST]
   this.selectedNode.setAttribute("data-selected", "true")
   this.sidebar.tabIndex = 1
   this.appRoot = appRoot.attachShadow({ mode: "closed" })
   this.appRoot.adoptedStyleSheets.push(this.stylesheet)
   document.title = APP_SHORT_NAME
   await super.enter()
  }
  async leave() {
   await super.leave()
   document.body.innerHTML = ``
  }
 }
 class sidebar_common_core_parts extends decision_core_parts {
  constructor() {
   super([new closed_sidebar_common_core_parts(), new introduce_sidebar_common_core_parts(), new open_sidebar_common_core_parts(), new dismiss_sidebar_common_core_parts()])
  }
  async enter() {
   this.button = this.controller.menuButton
   this.sidebar = this.controller.sidebar
   await super.enter()
  }
 }
 class closed_sidebar_common_core_parts extends core_parts {
  async enter() {
   this.sidebar = this.controller.sidebar
   this.button = this.controller.button
   this.button.onclick = async () => {
    await this.controller?.populate(1n)
    this.controller?.controller?.notify(this.controller.host)
   }
   this.sidebar.setAttribute("style", "--sidebar-tween: 0")
   await super.enter()
  }
  async leave() {
   await super.leave()
   if (document.activeElement === this.sidebar) this.sidebar.blur()
   this.button.onclick = undefined
   this.sidebar.removeAttribute("style")
  }
 }
 class introduce_sidebar_common_core_parts extends decision_core_parts {
  constructor() {
   super(["half"])
  }
  async enter() {
   this.sidebar = this.controller.sidebar
   this.sidebar.setAttribute("style", "--sidebar-tween: 0.5")
   requestAnimationFrame(() => {
    this.controller.populate(2n)
    this.controller.controller.notify(this.controller.host)
   })
   await super.enter()
  }
  async leave() {
   await super.leave()
   this.sidebar.removeAttribute("style")
  }
 }
 class open_sidebar_common_core_parts extends core_parts {
  async enter() {
   this.sidebar = this.controller.sidebar
   this.sidebar.focus()
   this.sidebar.onblur = () => {
    this.controller?.populate(3n)
    this.controller?.controller?.notify(this.controller.host)
   }
   this.sidebar.setAttribute("style", "--sidebar-tween: 1")
   await super.enter()
  }
  async leave() {
   await super.leave()
   if (document.activeElement === this.sidebar) this.sidebar.blur()
   this.sidebar.onblur = undefined
   this.sidebar.removeAttribute("style")
  }
 }
 class dismiss_sidebar_common_core_parts extends decision_core_parts {
  constructor() {
   super(["half"])
  }
  async enter() {
   this.sidebar = this.controller.sidebar
   this.sidebar.setAttribute("style", "--sidebar-tween: 0.5")
   requestAnimationFrame(() => {
    this.controller.populate(0n)
    this.controller.controller.notify(this.controller.host)
   })
   await super.enter()
  }
  async leave() {
   await super.leave()
   this.sidebar.removeAttribute("style")
  }
 }
 class error503_app_common_core_parts extends core_parts {
  async enter() {
   this.stylesheet = this.controller.stylesheet
   this.stylesheet.replaceSync(`
:host {
display: block;
--theme-rgb: 23, 29, 42;
--theme: rgb(var(--theme-rgb));
--color: #0a0d0d;
color: var(--color);
background: rgba(var(--theme-rgb), 0.14);
overflow: clip;
position: relative;
box-sizing: border-box;
padding: 15px;
width: 100%;
height: 100%;
font: 18px system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

h1 {
text-align: center;
line-height: 100vh;
height: 100%;
position: absolute;
width: 100%;
left: 0;
top: 0;
margin: 0;
padding: 0;
}

h1 {
font-size: 35vw;
color: rgba(var(--theme-rgb), 0.08);
}

.thin {
font-weight: 200;
}

#float {
font-size: 32px;
height: 100%;
align-items: center;
justify-content: center;
display: flex;
gap: 0.5ch;
line-height: 1em;
}

img {
width: 64px;
height: 64px;
}

#host {
font-weight: 600;
}`)
   this.container = this.controller.container
   this.container.innerHTML = `<h1>503</h1>
<span id=float>
<img src=https://${HOST_PREFIX}${APP_HOST}/favicon.svg><span class=thin>${APP_SHORT_NAME}</span><span>is coming soon.</span>
</span>`
   await super.enter()
  }
  async leave() {
   await super.leave()
   this.container.innerHTML = ``
   this.stylesheet.replaceSync(``)
  }
 }
 class app_common_core_parts extends decision_core_parts {
  constructor() {
   super([new error503_app_common_core_parts()])
  }
  async enter() {
   this.container = this.controller.appRoot
   this.stylesheet = new CSSStyleSheet()
   this.container.adoptedStyleSheets.push(this.stylesheet)
   await super.enter()
  }
  async leave() {
   await super.leave()
   this.container.adoptedStyleSheets = []
  }
 }
 class colormode_core_parts extends decision_core_parts {
  constructor() {
   super(["light", "dark"])
  }
 }
 new boot_core_parts().enter()

 const everything = {
   "https://core.parts/constructor.js": `this.index = 0n
this.size = 1n`,
   "https://core.parts/enter.js": ``,
   "https://core.parts/populate.js": `if (this.index !== index) {
// todo: error page instead of console - keep all api-related information user-facing
if (index < 0n || index >= this.size) throw new RangeError(\`index \${index} out of range (size \${this.size}): \${this.host}\`)
this.index = index
}`,
   "https://core.parts/leave.js": `this.index = 0n`,
   "https://core.parts/notify.js": `this.controller?.notify(this.host)`,

   "https://composite.core.parts/inputs.txt": `parts`,
   "https://composite.core.parts/constructor.js": `super()
const units = (this.units = [1n])
this.factors = {}
this.parts = parts.reduceRight((parts, part, i) => {
if (typeof part === "string") part = new (Part("core.parts"))(part)
if (!(part instanceof core_parts)) throw new TypeError(\`unexpected \${typeof part} encountered as factor of composite \${this.host}\`)
if (part.host in this.factors) throw new RangeError(\`duplicate part \${part.host} in composite \${this.host}\`)
this.factors[part.host] = {
 part,
 i,
 indexCache: part.index,
 get unit() {
  return units[i]
 },
}
parts.unshift(part)
units.unshift(units[0] * part.size)
part.controller = this
return parts
}, [])
this.size = this.units.shift()`,
   "https://composite.core.parts/enter.js": `await super.enter()
for (const part of this.parts) await part.enter()`,
   "https://composite.core.parts/populate.js": `await super.populate(index)
for (let x = 0; x < this.units.length; x++) {
const part = this.parts[x],
 factor = this.factors[part.host],
 unit = factor.unit,
 subindex = index / unit
await part.populate(subindex)
factor.indexCache = subindex
index %= unit
}`,
   "https://composite.core.parts/leave.js": `await super.leave()
for (const part of this.parts) await part.leave()`,
   "https://composite.core.parts/notify.js": `const factor = this.factors[from],
    { part, indexCache } = factor,
    { index: subindex } = part,
    unit = factor.unit
   const difference = subindex - indexCache,
    deltaIndex = difference * unit,
    newIndex = this.index + deltaIndex
   this.index = newIndex
   factor.indexCache = subindex
super.notify(from)`,

   "https://bitmask.core.parts/inputs.txt": `length`,
   "https://bitmask.core.parts/constructor.js": `super()
this.size = 2n ** BigInt(length)`,

   "https://decision.core.parts/inputs.txt": `parts`,
   "https://decision.core.parts/constructor.js": `super()
let offset = 0n
this.options = {}
this.parts = parts.map((part, i) => {
if (typeof part === "string") part = new (Part("core.parts"))(part)
if (!(part instanceof core_parts)) throw new TypeError(\`unexpected \${typeof e} encountered at part = \${i} of decision \${this.host}\`)
this.options[part.host] = { part, i, offset }
offset += part.size
this.size += part.size
part.controller = this
return part
})`,
   "https://decision.core.parts/enter.js": `await super.enter()
this.option = this.options[this.parts[0].host]
await this.option.part.enter()`,
   "https://decision.core.parts/populate.js": `if (this.index !== index || this.repopulate) {
await super.populate(index)
for (const part of this.parts) {
 if (index < part.size) {
  if (this.option.part !== part) {
   await this.option.part?.leave()
   this.option = this.options[part.host]
   await part.enter()
   if (index !== 0n) await part.populate(index)
  } else await part.populate(index)
  break
 }
 index -= part.size
}
}`,
   "https://decision.core.parts/leave.js": `await super.leave()
await this.option.part.leave()
delete this.option`,
   "https://decision.core.parts/notify.js": `this.index = this.option.offset + this.option.part.index
super.notify(from)`,

   "https://boot.core.parts/core.txt": "decision.core.parts",
   "https://boot.core.parts/constructor.js": `super(["boot", new (Part("server.core.parts"))(), new (Part("client.core.parts"))()])`,
   "https://boot.core.parts/enter.js": `await super.enter()
await this.populate(this.options[EN + ".core.parts"].offset)
this.controller?.notify(this.host)`,

   "https://server.core.parts/enter.js": `const cache = {},
   boilerplate = "© 2013 - 2024 Eric Augustinowicz and Kristina Soriano. All Rights Reserved."
  globalThis.onfetch = e => {
   // TODO: detect and throw error on any cross-deployment-stage resource fetches.
   const { pathname, host, origin } = new URL(e.request.url),
    isDevHost = host.startsWith(DEV_PREFIX),
    shortname = host
     .split(".")
     .slice(isDevHost ? 1 : 0, -1)
     .join("."),
    cacheKey = host + pathname
   if (isDevHost !== IS_DEV_HOST) throw new ReferenceError(\`cannot request assets across deployment stages (\${e.request.url})\`)
   if (!(cacheKey in cache)) {
    let body, type
    switch (pathname) {
     case "/.gitignore":
      type = "text/plain"
      body = \`# \${boilerplate}
**/.DS_Store
**/Icon
**/.well-known
**/.tmp.driveupload
**/.tmp.drivedownload
**/*.gdoc
.vscode/scratch/*
favicon.gif
favicon.ico\`
      break
     case "/.htaccess":
      type = "text/plain"
      body = \`# \${boilerplate}
AddCharset utf-8 .js
ErrorDocument 404 /index.php
ErrorDocument 403 /index.php
Options -Indexes\`
      break
     case "/index.php":
      body = \`<!DOCTYPE html>
<html lang=en>
<head>
 <!-- \${boilerplate} -->
 <link rel=manifest>
 <meta name=robots content=noindex>
 <meta name=viewport content="width=device-width,initial-scale=1">
 <script defer src="https://<?=$_SERVER["HTTP_HOST"]?>/server.js"></script>
 <title>Loading ...</title>
</head>
</html>\`
      type = "application/x-httpd-php; charset=UTF-8"
      break
     case "/README.md":
      type = "text/markdown; charset=UTF-8"
      body = \`<!--- \${boilerplate} --->
# About core_parts
This project aims to meet a large number of requirements which we will detail later.
Every app has a host (domain name) where it can be publically reached.
Domains beginning with the "dev." subdomain are dedicated to an unstable (but still publically available) version of the app used for staging changes.\`
      break
     case "/server.js":
     case "/client.js":
      body = \`// \${boilerplate}\n\n\${core_parts}\n\${server_core_parts}\n\${client_core_parts}\n\${boot_core_parts}\nnew boot_core_parts().enter()\`
      type = "text/javascript; charset=UTF-8"
      break
     case "/manifest.json":
      const manifest = {
       name: host,
       short_name: shortname,
       start_url: ".",
       display: "standalone",
       theme_color: "#faf9f8",
       background_color: "#faf9f8",
       description: "This app is under development.",
       display_override: ["window-controls-overlay"],
       icons: [
        {
         src: "favicon.svg",
         sizes: "144x144",
         type: "image/svg+xml",
        },
        {
         src: "favicon.svg",
         sizes: "any",
         type: "image/svg+xml",
        },
        {
         src: "/android-chrome-192x192.png",
         sizes: "192x192",
         type: "image/svg+xml",
        },
        {
         src: "/android-chrome-512x512.png",
         sizes: "512x512",
         type: "image/svg+xml",
        },
       ],
       categories: ["entertainment", "games", "utilities"] /*
       protocol_handlers: [
        {
         protocol: "web+core_parts",
         url: "/core_parts?pathname=%s",
        },
       ],
       shortcuts: [
        {
         name: "New Item...",
         short_name: "New...",
         icons: [
          {
           src: "favicon.svg",
           sizes: "any",
           type: "image/svg+xml",
          },
         ],
         url: "/new",
         description: "This is just a placeholder/hint for future development.",
        },
       ],
       screenshots: [
        {
         src: "desktop-screenshot.svg",
         sizes: "640x480",
         type: "image/svg+xml",
         form_factor: "wide",
         label: "This is a placeholder for the image of the app.",
        },
        {
         src: "mobile-screenshot.svg",
         sizes: "640x360",
         type: "image/svg+xml",
         form_factor: "narrow",
         label: "This is a placeholder for the image of the app.",
        },
       ],*/,
      }
      body = JSON.stringify(manifest, null, 1)
      type = "application/json; charset=UTf-8"
      break
      type = "image/svg+xml"
      break
     case "/favicon.svg":
     case "/favicon.ico":
     case "/apple-touch-icon.png":
     case "/mobile-screenshot.svg":
     case "/desktop-screenshot.svg":
     case "/android-chrome-192x192.png":
     case "/android-chrome-512x512.png":
      type = "image/svg+xml"
      body = \`<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<style>
 svg { background: white }
 text { fill: #333445 }
 @media (prefers-color-scheme = dark) {
  svg { background: #333445 }
  text { fill: white }
 }
</style>
<text x="12" y="12" dominant-baseline="central" text-anchor="middle">\${shortname[0]}</text>  
</svg>\`
      break
     default:
      body = \`<!DOCTYPE html>
<html lang=en>
<head>
 <!-- \${boilerplate} -->
 <link rel=manifest href="\${origin}/manifest.json">
 <meta name=robots content=noindex>
 <meta name=viewport content="width=device-width,initial-scale=1">
 <script defer src="\${origin}/client.js"></script>
 <title>Loading ...</title>
</head>
</html>\`
      type = "text/html; charset=UTF-8"
    }
    cache[cacheKey] = new Response(body, {
     headers: {
      "content-type": type,
      expires: "Sun, 20 Jul 1969 20:17:00 UTC",
      server: "kireji",
     },
    })
   }
   e.respondWith(cache[cacheKey].clone())
  }
  globalThis.oninstall = e => globalThis.skipWaiting()
  globalThis.onactivate = e => globalThis.clients.claim()
  globalThis.onmessage = e => [onactivate, () => registration.unregister().then(() => e.source.postMessage({ code: 0 }))][e.data.code]()`,

   "https://client.core.parts/core.txt": "decision.core.parts",
   "https://client.core.parts/constructor.js": `super(["empty", new (Part("common.core.parts"))()])`,
   "https://client.core.parts/enter.js": `await super.enter()

const 
 n = navigator,
 a = n.userAgent,
 c = n.serviceWorker,
 g = n.gpu,
 isMac = a.indexOf("Mac") > -1,
 alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_",
 throttleDuration = /^((?!chrome|android).)*safari/i.test(a) ? 350 : 75

if (c) {
 const reg = await c.register(location.origin + "/server.js"),
  sw = reg.active ?? (await new Promise(r => ((reg.waiting ?? reg.installing).onstatechange = ({ target: t }) => t.state == "activated" && r(t))))
 c.controller || (await new Promise(r => ((c.oncontrollerchange = r), sw.postMessage({ code: 0 }))))
 c.oncontrollerchange = c.onmessage = () => location.reload()
 document.querySelector('[rel="manifest"]').href = location.origin + "/manifest.json"
 addEventListener("focus", () => reg.update().catch(() => location.reload()))
}

if (g) {
 GPU = await (await g.requestAdapter()).requestDevice()
}

this.stylesheet = new CSSStyleSheet()
document.adoptedStyleSheets.push(this.stylesheet)

let
 fps = 1,
 addressbarIndex,
 throttleStartTime,
 meanFrameTime = 1000,
 time = performance.now(),
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

onhashchange = () => {
 let { pathname, search, hash, origin } = location
 if (pathname !== "/" || search || !hash || hash.length <= 1) history.replaceState({}, null, \`\${origin}/\${(hash ||= "#1")}\`)
 let binaryString = "0b"
 for (let i = 1; i < hash.length; i++) binaryString += alphabet.indexOf(hash[i]).toString(2).padStart(6, 0)
 addressbarIndex = this.documentIndex = BigInt(binaryString)
 throttleStartTime = time
}

const loop = now => {
 fps = Math.round(1000 / (meanFrameTime += (now - time - meanFrameTime) / 20))
 time = now
 if (time - throttleStartTime >= throttleDuration && addressbarIndex !== this.documentIndex) {
  const hexads = [],
   binaryString = this.documentIndex.toString(2),
   newLength = Math.ceil(binaryString.length / 6),
   fullbin = binaryString.padStart(newLength * 6, 0)
  for (let i = 0; i < newLength; i++) hexads.push(fullbin.slice(i * 6, (i + 1) * 6))
  const hash = "#" + hexads.reduce((hash, hexad) => hash + alphabet[parseInt(hexad, 2)], "")
  history.pushState({}, null, hash)
  addressbarIndex = this.documentIndex
  throttleStartTime = time
 }
 if (this.index !== this.documentIndex) this.populate(this.documentIndex).then(() => this.controller?.notify(this.host))
 requestAnimationFrame(loop)
}

onhashchange()
loop()`,
   "https://client.core.parts/notify.js": `super.notify(from)
this.documentIndex = this.index`,
  },
  cache = {}

 function Part(host) {
  if (host in cache) return cache[host]
  return (cache[host] = eval(`(class ${host.replaceAll(".", "_")}${host === "core.parts" ? "" : ` extends Part("${everything[`https://${host}/core.txt`] || "core.parts"}")`} {
host = "${host}"
${[["constructor", (everything[`https://${host}/inputs.txt`] ?? "").replaceAll(/\s+/g, ", "), 1], ["notify", "from", 1], ["enter"], ["populate", "index"], ["leave"]]
 .map(([fn, sig = "", sync = false], i) => {
  const custom = everything[`https://${host}/${fn}.js`]
  if (!custom && !VERBOSE) return ""
  return `${sync ? "" : "async "}${fn}(${sig}) {${
   VERBOSE
    ? `
 console.group(\`\${EN}::${host}[0].${fn}(${[sig, "from", "", "index", ""][i]})\`)`
    : ""
  }
 ${(custom ?? (host === "core.parts" ? "" : `${sync ? "" : "await "}super${i === 0 ? "" : "." + fn}(${sig})`)).split("\n").join("\n  ")}${
   VERBOSE
    ? `
 console.groupEnd()`
    : ""
  }
}`
 })
 .join("\n ")}
})`))
 }

 console.log(Part("decision.core.parts"))
}
boot()
