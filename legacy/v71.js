function bootCore() {
 const cachedata = new Map(),
  stackdata = [],
  handler = {
   get(target, request, receiver) {
    if (stackdata.length >= 17) throw "stack overflow"
    let response
    stackdata.push({ target, request, receiver, location: target[".uri"] })
    const log = this[".log"](...arguments)
    const cache = this[".cache"](...arguments)
    if (cache.closed) {
     response = cache.value
     log.add("cached")
    } else {
     response = this[".any"](...arguments)
     cache.close(response)
    }
    log.close(response)
    stackdata.pop()
    return response
   },
   ".cache"(target, request, receiver) {
    let cache
    if (cachedata.has(receiver)) cache = cachedata.get(receiver)
    else cachedata.set(receiver, (cache = new Map()))
    return {
     get value() {
      return cache.get(request)
     },
     get closed() {
      return cache.has(request)
     },
     close(response) {
      cache.set(request, response)
     }
    }
   },
   ".log"(target, request, receiver) {
    console.groupCollapsed(request)
    console.log([...stackdata])
    return {
     close(response) {
      console.log({ request, response })
      console.groupEnd()
     },
     add(...content) {
      console.log(...content)
     }
    }
   },
   ".any"(target, request, receiver) {
    if (request === ".") {
     return target
    }
    if (request === "..") {
     return target[".."]
    }
    const fromOrigin = request.startsWith("https://"),
     pathindex = fromOrigin ? 8 : 0
    if (request.slice(pathindex).includes("/")) {
     const slashindex = request.indexOf("/", pathindex),
      subreceiver = receiver[request.slice(0, slashindex)]
     return subreceiver[request.slice(slashindex + 1)]
    }
    if (fromOrigin && receiver !== core) {
     return core[request]
    }
    if (request in target) {
     const value = target[request]
     if (typeof value === "function") {
      return value(target, request, receiver)
     }
     if (typeof value === "object") {
      const earlytarget = { ...value, "..": target },
       earlyreceiver = new Proxy(earlytarget, handler)
      earlytarget[".uri"] = (target[".uri"] ?? "") + request + "/"
      if ("core.uri" in value) {
       const subtarget = Object.assign({}, earlyreceiver[`${value["core.uri"]}/.`], earlytarget)
       return new Proxy(subtarget, handler)
      }
      return earlyreceiver
     }
     return value
    }
    if ("fallback" in target) {
     return target.fallback(target, request, receiver)
    }
    console.error("404 (Not Found)")
   },
   "https://pilot.parts": {
    "core.uri": "https://core.parts/web-app",
    nodes: {
     "core.uri": "https://core.parts/web-app"
    }
   },
   "https://core.parts": {
    "core.uri": "web-app",
    "web-app": {
     "addressbar.exe"() {
      return href => {
       const setAddress = () => {
        delete self.navigationBuffer
        delete self.navigationAutoCapture
        history.replaceState({}, null, location.host.startsWith("dev.") ? "https://dev." + href.slice(8) : href)
       }
       if (self.navigationBuffer) clearTimeout(self.navigationBuffer)
       if (!self.navigationAutoCapture) self.navigationAutoCapture = Date.now()
       else {
        if (Date.now() - self.navigationAutoCapture > 240) setAddress()
        else navigationBuffer = setTimeout(setAddress, 120)
       }
      }
     },
     populate: {
      "static.exe"() {
       return (view, nodes) =>
        nodes.forEach((node, index) => {
         const existing = view.childNodes[index]
         if (!existing) view.appendChild(node)
         else if (existing !== node) node.replace(existing)
        })
      }
     },
     "update.exe"(target, request, receiver) {
      const { "populate/static.exe": populate } = receiver
      if ("getNodes.exe" in target) {
       return (request, view) => {
        if (view.request === request) return
        view.request = request
        const { "child.nodes": nodes } = receiver
        populate(view, nodes)
       }
      }
      if ("getHTML.exe" in target) {
       return (request, view) => {
        if (view.request === request) return
        view.request = request
        const { "getHTML.exe": getContent } = receiver
        view.innerHTML = getContent(request)
       }
      }
      return (request, view) => {
       if (view.request === request) return
       view.request = request
       view.innerHTML = "{ empty }"
      }
     },
     "error404.exe"() {
      return request => `<h1>404</h1>Page "${request}" doesn't exist on "${target[".uri"]}."`
     },
     fallback(target, request, { "addressbar.exe": addressbar, "update.exe": update }) {
      return view => {
       // in here, set up the view
       addressbar(target[".uri"] + request)
       update(request, view)
      }
     }
    },
    nodes: {
     "core.uri": "../web-app",
     "text.node": () => document.createTextNode(""),
     "cdata.node": () => document.createCDATASection(""),
     "comment.node": () => document.createComment(""),
     fallback: (target, request) => {
      console.error(new RangeError(`Cannot create node with type ${request}.`))
      return document.createElement("node-error")
     }
    },
    elements: {
     "head.element": () => document.head,
     "body.element": () => document.body,
     "document.element": () => document.documentElement,
     fallback(target, request) {
      try {
       return document.createElement(request)
      } catch {
       console.error(new RangeError(`Cannot create element with tagname ${request}.`))
       return document.createElement("element-error")
      }
     }
    }
   },
   "https://taskbar.pilot.parts": {}
  },
  core = new Proxy(handler, handler)
 return core
}

function client() {
 const core = bootCore()
 Promise.all([
  (async () => {
   const sw = navigator.serviceWorker,
    registration = await sw.register(location.origin + "/server.js"),
    { waiting: w, installing: i, active: a } = registration
   if (!a)
    await new Promise(
     resolve => ((w ?? i).onstatechange = ({ target: t }) => (t.state === "activated" ? resolve(t) : 0))
    )
   if (!sw.controller) {
    await new Promise(resolve => {
     const onclaimed = () => {
      sw.removeEventListener("controllerchange", onclaimed)
      resolve()
     }
     sw.addEventListener("controllerchange", onclaimed)
     registration.active.postMessage(1)
    })
   }
   sw.addEventListener("controllerchange", () => location.reload)
   document.onvisibilitychange = () => document.hidden || registration.update()
   window.onfocus = () => registration.update()
  })(),
  new Promise(resolve => (onload = resolve))
 ]).then(() => {
  if (self.bootstrap) document.querySelector('[rel="manifest"]').href = "manifest.json"
  const url = new URL(location.host.startsWith("dev.") ? `https://${location.href.slice(12)}` : location)
  core[url](document.body)
  document.documentElement.onmousemove = ({ clientX, clientY }) =>
   core[
    `${url.origin + url.pathname}?${new URLSearchParams([
     ["x", clientX],
     ["y", clientY]
    ])}${url.hash}`
   ](document.body)
 })
}

function server() {
 const cache = {},
  core = bootCore()
 oninstall = () => globalThis.skipWaiting()
 onactivate = onmessage = () => clients.claim()
 onfetch = e => {
  const request = e.request.url,
   { host, pathname } = new URL(request)
  if (!(request in cache)) {
   let body, type
   switch (pathname) {
    case "/client.js":
     body = `${bootCore}\n\n${client}\n\nbootClient()`
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
        url: "/part?path=%s"
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
  @keyframes daynight {
   0%, 49% { --color: #fff }
   50%, 100% { --color: #ccc }
  }
  @keyframes nightday {
   0%, 49% { --color: #333 }
   50%, 100% { --color: #000 }
  }
  svg {
   background-color: var(--color);
   animation: daynight 1s infinite;
  }
  path { 
   stroke: var(--color);
   animation: nightday 1s infinite;
  }
  @media (prefers-color-scheme: dark) {
   svg { animation: nightday 1s infinite }
   path { animation: daynight 1s infinite }
  }
 </style>
 <path d="M8 11C9.10457 11 10 10.1046 10 9C10 7.89543 9.10457 7 8 7C6.89543 7 6 7.89543 6 9C6 10.1046 6.89543 11 8 11Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
 <path d="M6.56055 21C12.1305 8.89998 16.7605 6.77998 22.0005 14.63" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
 <path d="M18 3H6C3.79086 3 2 4.79086 2 7V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V7C22 4.79086 20.2091 3 18 3Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
     break
    default:
     body = `<!DOCTYPE html
><link rel=manifest href="https://${host}/manifest.json"
><link rel="apple-touch-icon" sizes="144x144" href="https://${host}/apple-touch-icon.png"
><meta name=robots content=noindex
><meta name=viewport content="width=device-width,initial-scale=1"
><meta name=copyright content="&copy; 2024 Eric Augustinowicz"
><style>body{font-family:monospace;white-space:pre wrap;word-break:break-all}</style><script src="https://${host}/client.js"
></script>`
     type = "text/html; charset=UTF-8"
   }
   cache[request] = new Response(body, {
    headers: {
     "content-type": type,
     expires: "Sun, 20 Jul 1969 20:17:00 UTC",
     server: "kireji"
    }
   })
  }
  e.respondWith(cache[request].clone())
 }
}

self.bootstrap = true
if (self instanceof (self.Window ?? class {})) client()
else server()

class T {
 constructor(...properties) {
  this["properties.uri"] = properties
 }
}

const tests = {
 "https://type.core.parts": new T(".properties"),
 "https://properties.core.parts": new T("length.integer"),
 "https://integer.core.parts": new T("value.value"),
 "https://value.core.parts": new T(),
 "https://type.core.parts/.properties": new T(".properties"),
 "properties.t": new T(),
 "example.t": new T(),
 "example/.properties": []
}
