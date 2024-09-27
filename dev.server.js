var remoteScript = true
const common = () => {
  Object.assign(globalThis, {
   environment: "common",
   version: 78 / 1000,
   pool: {},
   logFrame: "padding:3px 6px;overflow:hidden;white-space:nowrap;padding-right:100%;border-collapse:collapse",
   maskDevSubdomain(url) {
    const debug = /(?:^.{8})dev\./.test(url)
    return { debug, url: debug ? "https://" + url.slice(12) : url }
   },
   print(type, subtype, string, ...data) {
    string = string.replaceAll("https://", "")
    console[type](
     `%c${this.environment === "client" ? (this.remoteScript ? `remote ` : "local ") : ""}${environment} | ${subtype}%c${string}`,
     "white-space:nowrap;background:#0005;color:#89a;border-radius:8px 8px 0 0;" + this.logFrame,
     "color:#9ac;background:#000a;border-radius:0 0 8px 8px;" + logFrame,
     ...data
    )
   },
   todo: (string, ...data) =>
    print("debug", "To-do item", `%c${string}%c `, "color:#000c;background:#68a;" + logFrame, "color:#000c;background:#68a;border-radius:0 0 8px 8px;" + logFrame, ...data),
   warn: (string, ...data) =>
    print("warn", "Warning", `%c${string}%c `, "color:#000c;background:#993;" + logFrame, "color:#000c;background:#993;border-radius:0 0 8px 8px;" + logFrame, ...data),
   info: (...args) => print("info", "Active Notice", ...args),
   debug: (...args) => print("debug", "Verbose Notice", ...args),
   activeServiceWorker: undefined,
   source: {
    "https://core.parts/index/header/type/": "text/html",
    "https://core.parts/index/": `<!DOCTYPE html
 ><link rel=manifest href=manifest.json
 ><meta name=robots content=noindex
 ><meta name=viewport content="width=device-width,initial-scale=1"
 ><meta name=copyright content="&copy; 2024 Eric Augustinowicz"
 ><script defer src="${location.origin}/client.js"
 ></script><!-- LOCAL INDEX -->`,

    "https://core.parts/location/#https://core.parts/header/type/": "text/uri-list",
    "https://core.parts/location/": "https://core.parts/blank/",

    "https://core.parts/location/#https://core.parts/file/header/type/": "https://core.parts/location/file/header/type/",

    "https://core.parts/location/#https://core.parts/downstream/": "https://core.parts/location/downstream/",

    "https://core.parts/location/downstream/": "https://core.parts/location/host/ https://core.parts/location/pathname/ https://core.parts/location/hash/",

    "https://core.parts/location/host/#https://core.parts/constructor/": "https://core.parts/location/host/constructor/",
    "https://core.parts/location/host/#https://core.parts/location/host/": "console.log('make the host', this)",
    "https://core.parts/location/pathname/#https://core.parts/constructor/": "console.log('make the pathname', this)",
    "https://core.parts/location/pathname/#https://core.parts/constructor/": "console.log('make the pathname', this)",
    "https://core.parts/location/hash/#https://core.parts/constructor/": "console.log('make the hash', this)",
    "https://core.parts/location/hash/#https://core.parts/constructor/": "console.log('make the hash', this)",
    "https://core.parts/node/element/onblur/#https://core.parts/node/element/events/type/": 0,
    "https://core.parts/node/element/events/onkeyup/#https://core.parts/node/element/events/type/": 0,
    "https://core.parts/node/element/events/onclick/#https://core.parts/node/element/events/type/": 0,
    "https://core.parts/node/element/events/onwheel/#https://core.parts/node/element/events/type/": 0,
    "https://core.parts/node/element/events/onfocus/#https://core.parts/node/element/events/type/": 0,
    "https://core.parts/node/element/events/onkeydown/#https://core.parts/node/element/events/type/": 0,
    "https://core.parts/node/element/events/ondblclick/#https://core.parts/node/element/events/type/": 0,
    "https://core.parts/node/element/events/onpointerup/#https://core.parts/node/element/events/type/": 0,
    "https://core.parts/node/element/events/ondragstart/#https://core.parts/node/element/events/type/": -1,
    "https://core.parts/node/element/events/oncontextmenu/#https://core.parts/node/element/events/type/": 0,
    "https://core.parts/node/element/events/onpointerdown/#https://core.parts/node/element/events/type/": 0,
    "https://core.parts/node/element/events/onpointermove/#https://core.parts/node/element/events/type/": 0,
    "https://core.parts/node/element/layout/#https://core.parts/node/element/events/type/": 1,
    "https://core.parts/node/element/manifest/#https://core.parts/node/element/events/type/": 1
   }
  })
 },
 client = async () => {
  environment = "client"
  const urlSummary = maskDevSubdomain(location.href),
   devEnvironment = urlSummary,
   serviceWorkerContainer = navigator.serviceWorker,
   serviceWorkerRegistration = await serviceWorkerContainer.register(location.origin + "/" + (devEnvironment ? "dev." : "") + "server.js")
  activeServiceWorker =
   serviceWorkerRegistration.active ??
   (await new Promise(r => ((serviceWorkerRegistration.waiting ?? serviceWorkerRegistration.installing).onstatechange = ({ target }) => target.state == "activated" && r(target))))
  serviceWorkerContainer.controller || (await new Promise(r => ((serviceWorkerContainer.oncontrollerchange = r), activeServiceWorker.postMessage({ code: 0 }))))
  serviceWorkerContainer.oncontrollerchange = serviceWorkerContainer.onmessage = () => location.reload()
  onfocus = () => {
   debug("Checking for updates...")
   serviceWorkerRegistration.update().catch(() => {
    warn("ServiceWorker unregistered.")
    location.reload()
   })
  }

  if (globalThis.remoteScript) {
   debug("Setting <link rel=manifest href=manifest.json>")
   document.querySelector('[rel="manifest"]').href = "manifest.json"
  }

  pool["https://core.parts/blank/"] = new Set([document.body])
  Object.defineProperties(
   Node.prototype,
   Object.getOwnPropertyDescriptors({
    get shadow() {
     // return this.setForever("shadow", this.attachShadow({ mode: "closed", writable: 0, configurable: 0 }))
     throw "not ready yet"
    },
    get layout() {
     if (!this._layout) {
      this._layout = new CSSStyleSheet()
      this.shadow.adoptedStyleSheets.push(this._layout)
     }
     return this._layout
    },
    set layout(v) {
     this.layout.replaceSync(v)
    },
    get manifest() {
     return [...this.shadow.children].map(node => node.url).join(" ")
    },
    set manifest(v) {
     if (v === undefined) throw new TypeError(`manifest called on undefined (${this._url})`)
     if (typeof v !== "string") throw new TypeError(`part manifest must have mime of text/uri-list. Function expected js input "string", but got "${typeof v}." (${this._url})`)
     const s = this.shadow,
      oldURLs = [...s.children].map(node => node.url)
     if (v === "") {
      ;[...s.children].forEach(url => url.remove())
      return
     }
     if (oldURLs.join(" ") === v) return
     const newURLs = v.split(" ")
     let oldURL,
      newURL,
      i = -1
     while (oldURLs.length && newURLs.length) {
      i++
      if ((oldURL = oldURLs.shift()) !== (newURL = newURLs.shift())) {
       const u = oldURLs.findIndex(url => url === newURL)
       if (u === -1) this.install(newURL, i)
       else {
        s.insertBefore(s.children[i + u + 1], s.children[i])
        oldURLs.splice(u, 1)
       }
       if (newURLs.some(url => url === oldURL)) oldURLs.unshift(oldURL)
       else s.children[i + 1].remove()
      }
      // if (repair) s.children[i].repair()
     }
     if (oldURLs.length) oldURLs.forEach(() => s.children[i + 1].remove())
     else if (newURLs.length) newURLs.forEach(url => this.install(url))
    },
    install(url, index) {
     if (!url || url === "undefined")
      throw new TypeError(`install url cannot be ${url === undefined ? "undefined" : url === "" ? "an empty string" : `"${url}"`} (installing <${self.tagName}> on ${self._url})`)
     const poolNode = url in pool ? [...pool[url]].find(url => !url.isConnected && !url.parentNode) : undefined,
      hadPoolNode = !!poolNode,
      node = hadPoolNode ? poolNode : document.createElement(CORE[url].getEmbedTag())
     if (index === undefined || index >= self.shadow.children.length) self.shadow.appendChild(node)
     else self.shadow.insertBefore(node, self.shadow.children[index])
     if (node._url !== url) node.url = url
    },
    set(url, newString) {
     const strand = (this.strand ??= Object.create(source)),
      existingUrl = (this.url ??= strand["https://core.parts/location/"]),
      setsUrl = url === "https://core.parts/location/",
      existingString = setsUrl ? existingUrl : strand[url]

     if (newString === existingString) {
      info("No change to node " + newString)
      return
     }

     debug(
      `%c${this.constructor?.name ?? "custom object"}\n Location: ${existingUrl}\n Filename: ${url}%c${existingString}%c${newString}`,
      "color:#78b;background:#000a;" + logFrame,
      `color:#${existingString === undefined ? "554" : "d85"};background:#000a;${logFrame}`,
      "color:#9ca;background:#000a;border-radius:0 0 8px 8px;" + logFrame
      // ,{ [this.constructor?.name ?? "unknownObject"]: this }
     )

     if (setsUrl) {
      const existingPoolSet = pool[existingUrl],
       newPoolSet = (pool[newString] ??= new Set())
      existingPoolSet.delete(this)
      newPoolSet.add(this)
      this.url = newString
     } else {
      warn(
       `Alternate URL setting requires fx-tracking.
Inner changes need to be fx-tracked.
Out-of-strand changes (such as the location of ancestor(s)
 (up to and including the client location)
 must also be tracked.
 
A downstream strand acting like this must update
 an upstream strand if it was not caused by one.
 
This involves tracking cross-strand fx connections.`
      )
     }

     strand[url] = newString
     warn(`Bypassing fx-based strand and node rebuild for now.`)
     this.innerHTML =
      `<pre>{\n ${Object.keys(strand)
       .map(key => `"${key}": "${strand[key]}"`)
       .join(",\n ")}\n}</pre>` +
      '<button onclick="activeServiceWorker.postMessage({ code: 1 })">Factory Reset</button>' +
      '<button onclick="activeServiceWorker.postMessage({ code: 2, source })">Quick Save</button>'
     /*
      const keys = parts of ,
       focus_events = ["onfocus", "onpointerdown", "onclick", "oncontextmenu", "onblur"]
      if (keys.some(url => focus_events.includes(url))) this.tabIndex = 0

      for (const key in keys) {
       if (type) this[kireji] = eval(this.point[kireji])
       else i{
        if 
       }
       switch (type) {
        case 0:
         
         break
        case 1:
         this[kireji] = this.point[kireji]
         break
       }
      }
     */
    }
   })
  )

  document.body.set("https://core.parts/location/", urlSummary.url)
  const tests = [
   ["Add file to body strand", document.body, "https://core.parts/fake-folder/test-file/", "Hello world!"],
   ["Add same file to same strand as last time", document.body, "https://core.parts/fake-folder/test-file/", "Hello world!"]
  ]
  for (const n in tests)
   setTimeout(() => {
    const [name, target, key, value] = tests[n]
    console.group(`%cTest %c${n}%c: %c${name}`, "color:#777", "font-weight:200;color:#c95", "color:#777", "color:#aa8")
    try {
     target.set(key, value)
    } catch (error) {
     warn(error)
    } finally {
     console.groupEnd()
    }
   }, 1000)
 },
 server = () => {
  environment = "local server"
  debug(`Installed version ${version}${((Date.now() / 0x9ca41900) % 1).toString().slice(1, 8)}`)
  const cache = {}
  onfetch = e => {
   const { url } = maskDevSubdomain(e.request.url)
   debug(`%cFetch%c${url}`, "background:#000a;" + logFrame, "background:#000a;color:#7ad;border-radius:0 0 8px 8px;" + logFrame)
   todo("Get response body from strand.")

   const { pathname } = new URL(url)
   if (!(url in cache)) {
    let body, type
    switch (pathname) {
     case "/client.js":
      body = `const\n common = ${common},\n client = ${client};\ncommon()\nclient()`
      type = "text/javascript; charset=UTF-8"
      break
     case "/manifest.json":
      body = JSON.stringify({
       name: "Untitled Application",
       short_name: "Untitled",
       start_url: ".",
       display: "standalone",
       theme_color: "#336598",
       background_color: "#333445",
       description: "A kireji app.",
       display_override: ["window-controls-overlay"],
       icons: [
        {
         src: "favicon.svg",
         sizes: "144x144",
         type: "image/svg+xml"
        },
        {
         src: "favicon.svg",
         sizes: "any",
         type: "image/svg+xml"
        },
        {
         src: "/android-chrome-192x192.png",
         sizes: "192x192",
         type: "image/svg+xml"
        },
        {
         src: "/android-chrome-512x512.png",
         sizes: "512x512",
         type: "image/svg+xml"
        }
       ],
       categories: ["entertainment", "games", "utilities"],
       protocol_handlers: [
        {
         protocol: "web+part",
         url: "/part?pathname=%s"
        }
       ],
       shortcuts: [
        {
         name: "New Item...",
         short_name: "New...",
         icons: [
          {
           src: "favicon.svg",
           sizes: "any",
           type: "image/svg+xml"
          }
         ],
         url: "/new",
         description: "This is just a placeholder/hint for future development."
        }
       ],
       screenshots: [
        {
         src: "desktop-screenshot.svg",
         sizes: "640x480",
         type: "image/svg+xml",
         form_factor: "wide",
         label: "This is a placeholder for the image of the app."
        },
        {
         src: "mobile-screenshot.svg",
         sizes: "640x360",
         type: "image/svg+xml",
         form_factor: "narrow",
         label: "This is a placeholder for the image of the app."
        }
       ]
      })
      type = "application/json; charset=UTF-8"
      break
     case "/favicon.svg":
     case "/desktop-screenshot.svg":
     case "/mobile-screenshot.svg":
     case "/favicon.ico":
     case "/apple-touch-icon.png":
     case "/android-chrome-192x192.png":
     case "/android-chrome-512x512.png":
      type = "image/svg+xml"
      body = `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <style>
  /*svg { background: white }*/
  path { stroke: #333445 }
  @media (prefers-color-scheme: dark) {
   /*svg { background: #333445 } */
   path { stroke: white }
  }
 </style>
 <path d="M8 11C9.10457 11 10 10.1046 10 9C10 7.89543 9.10457 7 8 7C6.89543 7 6 7.89543 6 9C6 10.1046 6.89543 11 8 11Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
 <path d="M6.56055 21C12.1305 8.89998 16.7605 6.77998 22.0005 14.63" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
 <path d="M18 3H6C3.79086 3 2 4.79086 2 7V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V7C22 4.79086 20.2091 3 18 3Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>`
      break
     default:
      body = `<!DOCTYPE html
 ><link rel=manifest href=manifest.json
 ><meta name=robots content=noindex
 ><meta name=viewport content="width=device-width,initial-scale=1"
 ><meta name=copyright content="&copy; 2024 Eric Augustinowicz"
 ><script defer src="${location.origin}/client.js"
 ></script><!-- LOCAL INDEX -->`
      type = "text/html; charset=UTF-8"
    }
    cache[url] = new Response(body, {
     headers: {
      "content-type": type,
      expires: "Sun, 20 Jul 1969 20:17:00 UTC",
      server: "kireji"
     }
    })
   }
   e.respondWith(cache[url].clone())
  }
  onmessage = e =>
   [
    () => {
     debug("Client was hard-reloaded.")
     clients.claim()
    },
    () => {
     debug("%cFactory reset", "color:black;background:#38a;border-radius:0 0 8px 8px;" + logFrame)
     registration.update()
     registration.unregister().then(() => e.source.postMessage({ code: 0 }))
    },
    () => {
     debug("QuickSave")
     warn(`Need QuickSave here.`, e.data.source)
    }
   ][e.data.code]()
  oninstall = () => skipWaiting()
  onactivate = () => clients.claim()
 }
common()
if (this instanceof (this.Window ?? class {})) client()
else server()
