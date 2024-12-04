// © 2013 - 2024 Eric Augustinowicz and Kristina Soriano. All Rights Reserved.
class Core {
 static VERSION = `0.87.2`
 static Composite = class Composite extends this {
  constructor(name, parts) {
   console.group(`${EN}::${name}:Core.Composite[${0n}].constructor(name, parts)`)
   {
    super(name)
    const units = (this.units = [1n])
    this.factors = {}
    this.parts = parts.reduceRight((parts, part, i) => {
     if (typeof part === "string") part = new Core(part)
     if (!(part instanceof Core)) throw new TypeError(`unexpected ${typeof part} encountered as factor of composite ${this.name}`)
     if (part.name in this.factors) throw new RangeError(`duplicate part name ${part.name} in composite ${name}`)
     this.factors[part.name] = {
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
   console.groupEnd()
  }
  async enter() {
   console.group(`${EN}::${this.name}:Core.Composite[${this.index}].enter()`)
   {
    console.assert(EN, this.index === 0n)
    await super.enter()
    for (const part of this.parts) await part.enter()
   }
   console.groupEnd()
  }
  async populate(index) {
   console.group(`${EN}::${this.name}:Core.Composite[${this.index}].populate(${index})`)
   {
    await super.populate(index)
    for (let x = 0; x < this.units.length; x++) {
     const part = this.parts[x],
      { name } = part,
      factor = this.factors[name],
      unit = factor.unit,
      subindex = index / unit
     console.log({ factor, unit })
     await part.populate(subindex)
     factor.indexCache = subindex
     index %= unit
    }
   }
   console.groupEnd()
  }
  async leave() {
   console.group(`${EN}::${this.name}:Core.Composite[${this.index}].leave()`)
   {
    await super.leave()
    for (const part of this.parts) await part.leave()
   }
   console.groupEnd()
  }
  notify(from) {
   console.group(`${EN}::${this.name}:Core[${this.index}].notify(from: ${from})`)
   {
    const factor = this.factors[from],
     { part, indexCache } = factor,
     { index: subindex } = part,
     unit = factor.unit
    console.log(indexCache, subindex, part)
    const difference = subindex - indexCache,
     deltaIndex = difference * unit,
     newIndex = this.index + deltaIndex
    this.index = newIndex
    console.log(this.index)
    factor.indexCache = subindex
    super.notify(from)
   }
   console.groupEnd()
  }
 }
 static Bitmask = class Bitmask extends this {
  constructor(name, length) {
   console.group(`${EN}::${name}:Core.Bitmask[${0n}].constructor(name, length)`)
   {
    super(name)
    this.size = 2n ** BigInt(length)
   }
   console.groupEnd()
  }
  async enter() {
   console.group(`${EN}::${this.name}:Core.Bitmask[${this.index}].enter()`)
   {
    await super.enter()
   }
   console.groupEnd()
  }
  async populate(index) {
   console.group(`${EN}::${this.name}:Core.Bitmask[${this.index}].populate(${index})`)
   {
    await super.populate(index)
   }
   console.groupEnd()
  }
  async leave() {
   console.group(`${EN}::${this.name}:Core.Bitmask[${this.index}].leave()`)
   {
    await super.leave()
   }
   console.groupEnd()
  }
  notify(from) {
   console.group(`${EN}::${this.name}:Core.Bitmask[${this.index}].notify(from: ${from})`)
   {
    super.notify(from)
   }
   console.groupEnd()
  }
 }
 static Decision = class Decision extends this {
  size = 0n
  constructor(name, parts) {
   console.group(`${EN}::${name}:Core.Decision[${0n}].constructor(name, parts)`)
   {
    super(name)
    let offset = 0n
    this.options = {}
    this.parts = parts.map((part, i) => {
     if (typeof part === "string") part = new Core(part)
     if (!(part instanceof Core)) throw new TypeError(`unexpected ${typeof e} encountered at part = ${i} of decision ${this.name}`)
     this.options[part.name] = { part, i, offset }
     offset += part.size
     this.size += part.size
     part.controller = this
     return part
    })
   }
   console.groupEnd()
  }
  async enter() {
   console.group(`${EN}::${this.name}:Core.Decision[${this.index}].enter()`)
   {
    await super.enter()
    this.option = this.options[this.parts[0].name]
    await this.option.part.enter()
   }
   console.groupEnd()
  }
  async populate(index) {
   console.group(`${EN}::${this.name}:Core.Decision[${this.index}].populate(${index})`)
   {
    if (this.index !== index || this.repopulate) {
     await super.populate(index)
     for (const part of this.parts) {
      if (index < part.size) {
       if (this.option.part !== part) {
        await this.option.part?.leave()
        this.option = this.options[part.name]
        await part.enter()
        if (index !== 0n) await part.populate(index)
       } else await part.populate(index)
       break
      }
      index -= part.size
     }
    }
   }
   console.groupEnd()
  }
  async leave() {
   console.group(`${EN}::${this.name}:Core.Decision[${this.index}].leave()`)
   {
    await super.leave()
    await this.option.part.leave()
    delete this.option
   }
   console.groupEnd()
  }
  notify(from) {
   console.group(`${EN}::${this.name}:Core.Decision[${this.index}].notify(from: ${from})`)
   {
    this.index = this.option.offset + this.option.part.index
    console.log(this.index)
    super.notify(from)
   }
   console.groupEnd()
  }
 }
 index = 0n
 size = 1n
 constructor(name) {
  console.group(`${EN}::${name}:Core[${0n}].constructor(name)`)
  {
   this.name = name
  }
  console.groupEnd()
 }
 async enter() {
  console.group(`${EN}::${this.name}:Core[${this.index}].enter()`)
  {
  }
  console.groupEnd()
 }
 async populate(index) {
  {
   console.group(`${EN}::${this.name}:Core[${this.index}].populate(${index})`)
   if (this.index !== index) {
    if (index < 0n || index >= this.size) throw new RangeError(`index ${index} out of range (size ${this.size}): ${this.name}`)
    this.index = index
    console.log(index)
   }
   console.groupEnd()
  }
 }
 async leave() {
  console.group(`${EN}::${this.name}:Core[${this.index}].leave()`)
  {
   this.index = 0n
  }
  console.groupEnd()
 }
 notify(from) {
  console.group(`${EN}::${this.name}:Core[${this.index}].notify(from: ${from})`)
  {
   this.controller?.notify(this.name)
  }
  console.groupEnd()
 }
}
class Server extends Core {
 static DEV_PREFIX = "dev."
 static IS_DEV_HOST = location.host.startsWith(this.DEV_PREFIX)
 static APP_HOST = location.host.slice(this.DEV_PREFIX.length * this.IS_DEV_HOST)
 static HOST_PREFIX = this.IS_DEV_HOST ? this.DEV_PREFIX : ""
 static APP_HOST_PARTS = this.APP_HOST.split(".")
 static APP_TLD = this.APP_HOST_PARTS.at(-1)
 static APP_SHORT_NAME = this.APP_HOST.slice(0, -1 - this.APP_TLD.length)
 constructor(name = "server") {
  console.group(`${EN}::${name}:Server[${0n}].constructor(name)`)
  {
   super(name)
  }
  console.groupEnd()
 }
 async enter() {
  console.group(`${EN}::${this.name}:Server[${this.index}].enter()`)
  {
   const cache = {},
    boilerplate = "© 2013 - 2024 Eric Augustinowicz and Kristina Soriano. All Rights Reserved."
   globalThis.onfetch = e => {
    // TODO: detect and throw error on any cross-deployment-stage resource fetches.
    const { pathname, host, origin } = new URL(e.request.url),
     isDevHost = host.startsWith(Server.DEV_PREFIX),
     shortname = host
      .split(".")
      .slice(isDevHost ? 1 : 0, -1)
      .join("."),
     cacheKey = host + pathname
    if (isDevHost !== Server.IS_DEV_HOST) throw new ReferenceError(`cannot request assets across deployment stages (${e.request.url})`)
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

# About Core

This project aims to meet a large number of requirements which we will detail later.

Every app has a host (domain name) where it can be publically reached.

Domains beginning with the "dev." subdomain are dedicated to an unstable (but still publically available) version of the app used for staging changes.
`
       break
      case "/server.js":
      case "/client.js":
       body = `// ${boilerplate}\n\n${Core}\n${Server}\n${Client}\n${Bootstrap}\nnew Bootstrap().enter()`
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
          protocol: "web+Core",
          url: "/Core?pathname=%s",
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
  console.groupEnd()
 }
 async populate(index) {
  console.group(`${EN}::${this.name}:Server[${this.index}].populate(${index})`)
  {
   await super.populate(index)
  }
  console.groupEnd()
 }
 async leave() {
  console.group(`${EN}::${this.name}:Server[${this.index}].leave()`)
  {
   await super.leave()
  }
  console.groupEnd()
 }
 notify(from) {
  console.group(`${EN}::${this.name}:Server[${this.index}].notify(from: ${from})`)
  {
   super.notify(from)
  }
  console.groupEnd()
 }
}
class Client extends Core.Decision {
 static CommonLayout = class CommonLayout extends Core.Composite {
  static Sidebar = class Sidebar extends Core.Decision {
   static Closed = class SidebarClosed extends Core {
    constructor(name = "closed") {
     console.group(`${EN}::${name}:Client.CommonLayout.Sidebar.Closed[${0n}].constructor(name)`)
     {
      super(name)
     }
     console.groupEnd()
    }
    async enter() {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.Closed[${this.index}].enter()`)
     {
      this.sidebar = this.controller.sidebar
      this.button = this.controller.button
      this.button.onclick = async () => {
       console.log("current page index is ... " + this.controller.controller.controller.index)
       await this.controller?.populate(1n)
       this.controller?.controller?.notify(this.controller.name)
       console.log("new index is ... (drumroll please ...)", this.controller.controller.controller.index)
      }
      this.sidebar.setAttribute("style", "--sidebar-tween: 0")
      await super.enter()
     }
     console.groupEnd()
    }
    async populate(index) {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.Closed[${this.index}].populate(${index})`)
     {
      await super.populate(index)
     }
     console.groupEnd()
    }
    async leave() {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.Closed[${this.index}].leave()`)
     {
      await super.leave()
      if (document.activeElement === this.sidebar) this.sidebar.blur()
      this.button.onclick = undefined
      this.sidebar.removeAttribute("style")
     }
     console.groupEnd()
    }
    notify(from) {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.Closed[${this.index}].notify(from: ${from})`)
     {
      super.notify(from)
     }
     console.groupEnd()
    }
   }
   static TweenIn = class SidebarTweenIn extends Core.Decision {
    constructor(name = "tween-in") {
     console.group(`${EN}::${name}:Client.CommonLayout.Sidebar.TweenIn[${0n}].constructor(name)`)
     {
      super(name, ["half"])
     }
     console.groupEnd()
    }
    async enter() {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.TweenIn[${this.index}].enter()`)
     {
      this.sidebar = this.controller.sidebar
      this.sidebar.setAttribute("style", "--sidebar-tween: 0.5")
      requestAnimationFrame(() => {
       this.controller.populate(2n)
       this.controller.controller.notify(this.controller.name)
      })
      await super.enter()
     }
     console.groupEnd()
    }
    async populate(index) {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.TweenIn[${this.index}].populate(${index})`)
     {
      await super.populate(index)
     }
     console.groupEnd()
    }
    async leave() {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.TweenIn[${this.index}].leave()`)
     {
      await super.leave()
      this.sidebar.removeAttribute("style")
     }
     console.groupEnd()
    }
    notify(from) {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.TweenIn[${this.index}].notify(from: ${from})`)
     {
      super.notify(from)
     }
     console.groupEnd()
    }
   }
   static Open = class SidebarOpen extends Core {
    constructor(name = "open") {
     console.group(`${EN}::${name}:Client.CommonLayout.Sidebar.Open[${0n}].constructor(name)`)
     {
      super(name)
     }
     console.groupEnd()
    }
    async enter() {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.Open[${this.index}].enter()`)
     {
      this.sidebar = this.controller.sidebar
      this.sidebar.focus()
      this.sidebar.onblur = () => {
       this.controller?.populate(3n)
       this.controller?.controller?.notify(this.controller.name)
      }
      this.sidebar.setAttribute("style", "--sidebar-tween: 1")
      await super.enter()
     }
     console.groupEnd()
    }
    async populate(index) {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.Open[${this.index}].populate(${index})`)
     {
      await super.populate(index)
     }
     console.groupEnd()
    }
    async leave() {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.Open[${this.index}].leave()`)
     {
      await super.leave()
      if (document.activeElement === this.sidebar) this.sidebar.blur()
      this.sidebar.onblur = undefined
      this.sidebar.removeAttribute("style")
     }
     console.groupEnd()
    }
    notify(from) {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.Open[${this.index}].notify(from: ${from})`)
     {
      super.notify(from)
     }
     console.groupEnd()
    }
   }
   static TweenOut = class SidebarTweenOut extends Core.Decision {
    constructor(name = "tween-out") {
     console.group(`${EN}::${name}:Client.CommonLayout.Sidebar.TweenOut[${0n}].constructor(name)`)
     {
      super(name, ["half"])
     }
     console.groupEnd()
    }
    async enter() {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.TweenOut[${this.index}].enter()`)
     {
      this.sidebar = this.controller.sidebar
      this.sidebar.setAttribute("style", "--sidebar-tween: 0.5")
      requestAnimationFrame(() => {
       this.controller.populate(0n)
       this.controller.controller.notify(this.controller.name)
      })
      await super.enter()
     }
     console.groupEnd()
    }
    async populate(index) {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.TweenOut[${this.index}].populate(${index})`)
     {
      await super.populate(index)
     }
     console.groupEnd()
    }
    async leave() {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.TweenOut[${this.index}].leave()`)
     {
      await super.leave()
      this.sidebar.removeAttribute("style")
     }
     console.groupEnd()
    }
    notify(from) {
     console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar.TweenOut[${this.index}].notify(from: ${from})`)
     {
      super.notify(from)
     }
     console.groupEnd()
    }
   }
   constructor(name = "sidebar") {
    console.group(`${EN}::${name}:Client.CommonLayout.Sidebar[${0n}].constructor(name)`)
    {
     super(name, [
      new Client.CommonLayout.Sidebar.Closed(),
      new Client.CommonLayout.Sidebar.TweenIn(),
      new Client.CommonLayout.Sidebar.Open(),
      new Client.CommonLayout.Sidebar.TweenOut(),
     ])
    }
    console.groupEnd()
   }
   async enter() {
    console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar[${this.index}].enter()`)
    {
     this.button = this.controller.menuButton
     this.sidebar = this.controller.sidebar
     await super.enter()
    }
    console.groupEnd()
   }
   async populate(index) {
    console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar[${this.index}].populate(${index})`)
    {
     await super.populate(index)
    }
    console.groupEnd()
   }
   async leave() {
    console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar[${this.index}].leave()`)
    {
     await super.leave()
    }
    console.groupEnd()
   }
   notify(from) {
    console.group(`${EN}::${this.name}:Client.CommonLayout.Sidebar[${this.index}].notify(from: ${from})`)
    {
     super.notify(from)
    }
    console.groupEnd()
   }
  }
  static App = class App extends Core.Decision {
   static Error503 = class Error503 extends Core {
    constructor(name = "error503") {
     console.group(`${EN}::${name}:Client.CommonLayout.App.Error503[${0n}].constructor(name)`)
     {
      super(name)
     }
     console.groupEnd()
    }
    async enter() {
     console.group(`${EN}::${this.name}:Client.CommonLayout.App.Error503[${this.index}].enter()`)
     {
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
 font-size: 42px;
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
 <img src=https://${Server.DEV_PREFIX}${Server.APP_HOST}/favicon.svg><span class=thin>${Server.APP_SHORT_NAME}</span><span>is coming soon.</span>
</span>`
      await super.enter()
     }
     console.groupEnd()
    }
    async populate(index) {
     console.group(`${EN}::${this.name}:Client.CommonLayout.App.Error503[${this.index}].populate(${index})`)
     {
      await super.populate(index)
     }
     console.groupEnd()
    }
    async leave() {
     console.group(`${EN}::${this.name}:Client.CommonLayout.App.Error503[${this.index}].leave()`)
     {
      await super.leave()
      this.container.innerHTML = ``
      this.stylesheet.replaceSync(``)
     }
     console.groupEnd()
    }
    notify(from) {
     console.group(`${EN}::${this.name}:Client.CommonLayout.App.Error503[${this.index}].notify(from: ${from})`)
     {
      super.notify(from)
     }
     console.groupEnd()
    }
   }
   constructor(name = "app") {
    console.group(`${EN}::${name}:Client.CommonLayout.App[${0n}].constructor(name)`)
    {
     super(name, [new Client.CommonLayout.App.Error503()])
    }
    console.groupEnd()
   }
   async enter() {
    console.group(`${EN}::${this.name}:Client.CommonLayout.App[${this.index}].enter()`)
    {
     this.container = this.controller.appRoot
     this.stylesheet = new CSSStyleSheet()
     this.container.adoptedStyleSheets.push(this.stylesheet)
     await super.enter()
    }
    console.groupEnd()
   }
   async populate(index) {
    console.group(`${EN}::${this.name}:Client.CommonLayout.App[${this.index}].populate(${index})`)
    {
     await super.populate(index)
    }
    console.groupEnd()
   }
   async leave() {
    console.group(`${EN}::${this.name}:Client.CommonLayout.App[${this.index}].leave()`)
    {
     await super.leave()
     this.container.adoptedStyleSheets = []
    }
    console.groupEnd()
   }
   notify(from) {
    console.group(`${EN}::${this.name}:Client.CommonLayout.App[${this.index}].notify(from: ${from})`)
    {
     super.notify(from)
    }
    console.groupEnd()
   }
  }
  static ColorMode = class ColorMode extends Core.Decision {
   constructor() {
    super("color-mode", ["light", "dark"])
   }
  }
  constructor(name = "common") {
   console.group(`${EN}::${name}:Client.CommonLayout[${0n}].constructor(name)`)
   {
    const apps = ["core.parts", "fallback.cloud", "kireji.io", "glowstick.click", "ejaugust.com", "orenjinari.com"].sort()
    super(name, [new Client.CommonLayout.Sidebar(), new Client.CommonLayout.App(), new Client.CommonLayout.ColorMode()])
    this.apps = apps
   }
   console.groupEnd()
  }
  async enter() {
   console.group(`${EN}::${this.name}:Client.CommonLayout[${this.index}].enter()`)
   {
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
    homeButton.innerHTML = `<img src=https://${Server.HOST_PREFIX}${Server.APP_HOST}/favicon.svg /><span class=label>${Server.APP_SHORT_NAME}</span>`
    homeButton.onclick = () => {
     this.factors.app
    }
    if (navigator.share) {
     shareButton.onclick = () =>
      navigator
       .share({ title: document.title, url: location.href })
       .then(() => console.log("Successful share"))
       .catch(error => {
        if (error.name === "AbortError") {
         console.log("Share cancelled")
        } else {
         console.error("Error sharing:", error)
        }
       })
     shareButton.innerText = `➦`
    }
    this.stylesheet = new CSSStyleSheet()
    const appRoot = document.body.appendChild(document.createElement("main"))
    this.sidebar = document.body.appendChild(document.createElement("menu"))
    this.sidebar.setAttribute("id", "sidebar")
    const sidebarHeading = this.sidebar.appendChild(document.createElement("h2"))
    sidebarHeading.innerHTML = `<span id=logo>Kireji</span><span class=label>${Server.APP_SHORT_NAME}</span><span id=version>${Core.VERSION}</span>`
    const appsModule = this.sidebar.appendChild(document.createElement("section")),
     appsTitle = appsModule.appendChild(document.createElement("h3")),
     appList = appsModule.appendChild(document.createElement("ul"))
    appsTitle.innerText = `Apps`
    appsModule.setAttribute("class", "module")
    if (false && Server.IS_DEV_HOST) {
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
     appNode.innerHTML = `<img src=https://${Server.HOST_PREFIX}${appname}/favicon.svg /><span class=label>${shortName}</span>`
     this.appNodes[appname] = appNode
     appNode.onclick = () => {
      const host = this.apps[i]
      if (Server.APP_HOST !== host) location = "https://" + Server.DEV_PREFIX + host + "/#5"
     }
    }
    this.selectedNode = this.appNodes[Server.APP_HOST]
    this.selectedNode.setAttribute("data-selected", "true")
    this.sidebar.tabIndex = 1
    this.appRoot = appRoot.attachShadow({ mode: "closed" })
    this.appRoot.adoptedStyleSheets.push(this.stylesheet)
    document.title = Server.APP_SHORT_NAME
    await super.enter()
   }
   console.groupEnd()
  }
  async populate(index) {
   console.group(`${EN}::${this.name}:Client.CommonLayout[${this.index}].populate(${index})`)
   {
    await super.populate(index)
   }
   console.groupEnd()
  }
  async leave() {
   console.group(`${EN}::${this.name}:Client.CommonLayout[${this.index}].leave()`)
   {
    await super.leave()
    document.body.innerHTML = ``
   }
   console.groupEnd()
  }
  notify(from) {
   console.group(`${EN}::${this.name}:Client.CommonLayout[${this.index}].notify(from: ${from})`)
   {
    super.notify(from)
   }
   console.groupEnd()
  }
 }
 static gpu
 static here = 0n
 static shiftKeysDown = 0
 static contextKeysDown = 0
 constructor(name = "client") {
  console.group(`${EN}::${name}:Client[${0n}].constructor(name)`)
  {
   super(name, ["empty", new Client.CommonLayout()])
  }
  console.groupEnd()
 }
 async enter() {
  console.group(`${EN}::${this.name}:Client[${this.index}].enter()`)
  {
   await super.enter()

   if (navigator.serviceWorker) {
    const c = navigator.serviceWorker,
     reg = await c.register(location.origin + "/server.js"),
     sw = reg.active ?? (await new Promise(r => ((reg.waiting ?? reg.installing).onstatechange = ({ target: t }) => t.state == "activated" && r(t))))
    c.controller || (await new Promise(r => ((c.oncontrollerchange = r), sw.postMessage({ code: 0 }))))
    c.oncontrollerchange = c.onmessage = () => location.reload()
    document.querySelector('[rel="manifest"]').href = location.origin + "/manifest.json"
    addEventListener("focus", () => reg.update().catch(() => location.reload()))
   }

   if (navigator.gpu) {
    Client.gpu = await (await navigator.gpu.requestAdapter()).requestDevice()
   }

   this.stylesheet = new CSSStyleSheet()
   document.adoptedStyleSheets.push(this.stylesheet)

   let fps = 1,
    meanFrameTime = 1000,
    addressbarIndex,
    throttleStartTime,
    time = performance.now()

   const isMac = navigator.userAgent.indexOf("Mac") > -1,
    alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_",
    throttleDuration = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? 350 : 75,
    loop = now => {
     fps = Math.round(1000 / (meanFrameTime += (now - time - meanFrameTime) / 20))
     time = now

     if (time - throttleStartTime >= throttleDuration && addressbarIndex !== Client.here) {
      const hexads = [],
       binaryString = Client.here.toString(2),
       newLength = Math.ceil(binaryString.length / 6),
       fullbin = binaryString.padStart(newLength * 6, 0)
      for (let i = 0; i < newLength; i++) hexads.push(fullbin.slice(i * 6, (i + 1) * 6))
      const hash = "#" + hexads.reduce((hash, hexad) => hash + alphabet[parseInt(hexad, 2)], "")
      history.pushState({}, null, hash)
      addressbarIndex = Client.here
      throttleStartTime = time
     }

     if (this.index !== Client.here) {
      console.info(this.name + " ==> populate self from loop")
      this.populate(Client.here).then(() => this.controller?.notify(this.name))
     }

     requestAnimationFrame(loop)
    }

   onblur = e => {
    Client.contextKeysDown = Client.shiftKeysDown = 0
   }
   onkeyup = e => {
    if (isMac) {
     if (e.key === "Meta") Client.contextKeysDown = Math.max(0, Client.contextKeysDown - 1)
    } else if (e.key === "Control") Client.contextKeysDown = Math.max(0, Client.contextKeysDown - 1)
    if (e.key === "Shift") Client.shiftKeysDown = Math.max(0, Client.shiftKeysDown - 1)
    e.preventDefault()
   }
   onkeydown = e => {
    if (isMac) {
     if (e.key === "Meta") Client.contextKeysDown++
    } else if (e.key === "Control") Client.contextKeysDown++
    if (e.key === "Shift") Client.shiftKeysDown++
    if (Client.contextKeysDown === 1 && !Client.shiftKeysDown && e.key === "z") history.back()
    if (Client.contextKeysDown === 1 && !Client.shiftKeysDown && e.key === "y") history.forward()
    if (Client.contextKeysDown === 1 && Client.shiftKeysDown && e.key === "z") history.forward()
    e.preventDefault()
   }
   ;(onhashchange = () => {
    let { pathname, search, hash, origin } = location
    if (pathname !== "/" || search || !hash || hash.length <= 1) history.replaceState({}, null, `${origin}/${(hash ||= "#1")}`)
    let binaryString = "0b"
    for (let i = 1; i < hash.length; i++) binaryString += alphabet.indexOf(hash[i]).toString(2).padStart(6, 0)
    addressbarIndex = Client.here = BigInt(binaryString)
    throttleStartTime = time
   })()

   loop()
  }
  console.groupEnd()
 }
 async populate(index) {
  console.group(`${EN}::${this.name}:Client[${this.index}].populate(${index})`)
  {
   await super.populate(index)
  }
  console.groupEnd()
 }
 async leave() {
  console.group(`${EN}::${this.name}:Client[${this.index}].leave()`)
  {
   await super.leave()
  }
  console.groupEnd()
 }
 notify(from) {
  console.group(`${EN}::${this.name}:Client[${this.index}].notify(from: ${from})`)
  {
   super.notify(from)
   Client.here = this.index
  }
  console.groupEnd()
 }
}
class Bootstrap extends Core.Decision {
 constructor(name = "boot") {
  globalThis.EN = globalThis.constructor === globalThis.Window ? "client" : "server"
  console.group(`${EN}::${name}:Bootstrap[${0n}].constructor(name)`)
  {
   super(name, ["boot", new Server(), new Client()])
  }
 }
 async enter() {
  console.group(`${EN}::${this.name}:Bootstrap[${this.index}].enter()`)
  {
   await super.enter()
   await this.populate(this.options[EN].offset)
   this.controller?.notify(this.name)
  }
  console.groupEnd()
 }
 async populate(index) {
  console.group(`${EN}::${this.name}:Bootstrap[${this.index}].populate(${index})`)
  {
   await super.populate(index)
  }
  console.groupEnd()
 }
 async leave() {
  console.group(`${EN}::${this.name}:Bootstrap[${this.index}].leave()`)
  {
   await super.leave()
  }
  console.groupEnd()
 }
 notify(from) {
  console.group(`${EN}::${this.name}:Bootstrap[${this.index}].notify(from: ${from})`)
  {
   super.notify(from)
  }
  console.groupEnd()
 }
}
new Bootstrap().enter()
