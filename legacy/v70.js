const client = async onclient => {
 const sw = navigator.serviceWorker
 await Promise.all([
  (async () => {
   const registration = await sw.register(location.origin + "/server.js"),
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
 ])
 onclient?.()
}

class Vert {
 static inputVerts = new Map()
 static outputVerts = []
 #proxy
 get proxy() {
  if (!this.#proxy) {
   this.#proxy = new Proxy(this, {
    get(v, p) {
     const v_p = new Vert(p)
     if (!v_p) throw "no vert: " + p + " on " + v.url
     const { action, init, cache } = v_p
     ;(v_p.fx ??= new Set()).add(v)
     ;(v.src ??= {})[p] = v_p
     if (!init) v_p.init = true
     else if (!Vert.inputVerts.has(v_p)) return cache
     // console.log("first eval", v_p.url)
     return (v_p.cache = action.length === 2 ? action(v_p.proxy, v_p) : action(v_p))
    }
   })
  }
  return this.#proxy
 }
 traceOutputs() {
  this.fx?.forEach(v => {
   const index = Vert.outputVerts.indexOf(v)
   if (index !== -1) Vert.outputVerts.splice(index, 1)
   Vert.outputVerts.push(v)
   if (!Vert.inputVerts.has(v)) Vert.inputVerts.set(v, new Set())
   Vert.inputVerts.get(v).add(this)
   v.traceOutputs()
  })
 }
 static set(vert, cache) {
  this.outputVerts.splice(0, this.outputVerts.length)
  vert.traceOutputs()
  vert.cache = cache
  for (const outputVert of this.outputVerts) {
   outputVert.changes = this.inputVerts.get(outputVert)
   const arg = {},
    { action } = outputVert
   // TODO name is not real on sourceVert
   for (const p in outputVert.src) {
    const sourceVert = outputVert.src[p]
    arg[p] = sourceVert.cache
   }
   const value = action.length === 2 ? action(arg, outputVert) : action(outputVert)
   if (value === outputVert.cache) {
    console.log("re-eval keep " + outputVert.url)
    outputVert.fx?.forEach(fxVert => {
     if (!this.inputVerts.has(fxVert)) return
     const set = this.inputVerts.get(fxVert)
     set.delete(outputVert)
     if (!set.size) this.inputVerts.delete(fxVert)
    })
   } else {
    console.log("re-eval mutate " + outputVert.url)
    outputVert.cache = value
   }
   delete outputVert.changes
  }
 }
 set(cache) {
  Vert.set(this, cache)
 }
 static verts = {}
 static files = {}
 static root = {
  parts: {
   core: {
    manifest: {
     "#action"({}) {}
    },
    "#action"({ "https://yellow.core.parts": yellow, "https://color.core.parts": color }, {}) {
     return (document.body.innerHTML = color + yellow)
    },
    "#node": {},
    "#manifest": {
     name: "dev core parts"
    },
    dev: { "#base": "core.parts" },
    sense: {
     "#action"({ cache = "organ" }) {
      return cache
     }
    },
    eyeball: {
     "#action"({ cache = "iris" }) {
      return cache
     }
    }, // set this to pupil as a test
    skin: {
     "#action"({ cache = "skin" }) {
      return cache
     }
    },
    color: {
     "#action"(
      {
       "https://sense.core.parts": sense,
       "https://eyeball.core.parts": eyeball,
       "https://color-label.core.parts": colorLabel
      },
      {}
     ) {
      return sense + ": " + eyeball + colorLabel
     }
    },
    "color-label": {
     "#action"({ cache = "\nhue: " }) {
      return cache
     }
    },
    red: {
     "#action"({ "https://color.core.parts": color }, {}) {
      return 0
     }
    },
    green: {
     "#action"({ "https://color.core.parts": color }, {}) {
      return 120
     }
    },
    yellow: {
     "#action"({ "https://red.core.parts": red, "https://green.core.parts": green }, {}) {
      return (red + green) / 2
     }
    },
    orange: {
     "#action"({ "https://red.core.parts": red, "https://yellow.core.parts": yellow }, {}) {
      return (red + yellow) / 2
     }
    },
    temperature: {
     "#action"({ "https://sense.core.parts": sense, "https://skin.core.parts": skin }, {}) {
      return sense + ": " + skin + "\ndegrees: "
     }
    },
    hot: {
     "#action"({ "https://temperature.core.parts": temperature }, { cache = temperature + "many" }) {
      return cache
     }
    },
    cold: {
     "#action"({ "https://temperature.core.parts": temperature }, { cache = temperature + "few" }) {
      return cache
     }
    }
   },
   pilot: {
    "#node": {},
    "#manifest": {},
    dev: { "#base": "pilot.parts" }
   }
  },
  com: {
   ejaugust: {
    "#node": {},
    "#manifest": {},
    dev: { "#base": "ejaugust.com" }
   },
   orenjinari: {
    "#node": {},
    "#manifest": {
     name: "OrenjiNari.com",
     short_name: "OrenjiNari"
    },
    dev: { "#base": "orenjinari.com" }
   }
  },
  online: {
   kheb: {
    "#node": {},
    "#manifest": {},
    dev: { "#base": "kheb.online" }
   }
  },
  cloud: {
   fallback: {
    "#node": {},
    "#manifest": {},
    dev: { "#base": "fallback.cloud" }
   }
  },
  app: {
   kireji: {
    "#node": {},
    "#manifest": {},
    dev: { "#base": "kireji.app" }
   }
  },
  io: {
   kireji: {
    "#node": {},
    "#manifest": {},
    dev: { "#base": "kireji.io" }
   }
  },
  design: {
   stargate: {
    "#node": {},
    "#manifest": {},
    dev: { "#base": "stargate.design" }
   }
  }
 }
 static manifest = {
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
 }
 static node = {
  type: 1,
  children: ["error404"],
  events: {
   click() {
    console.warn("onclick handler is working")
   }
  },
  attributes: {
   "data-": "this is a test attribute"
  }
 }
 constructor(uri) {
  if (uri in Vert.verts) return Vert.verts[uri]
  Vert.verts[uri] = this
  console.log("new " + uri)
  this.url = new URL(uri)
  const { host, pathname } = this.url
  this.host = host
  this.pathname = pathname
  this.filepath = host + pathname
  this.root = Vert.root
  this.name = "core"
  const path = host.split(".")
  this.name = path[0]
  while (path.length && this.root) {
   this.name = path.pop()
   this.root = this.root[this.name]
  }
  if (!this.root) throw "no root at " + uri
  this.manifest = this.root["#manifest"]
  this.node = this.root["#node"]
  this.action = this.root["#action"]
  if (this.action) this.action.vert = this
 }
 cloneResponse() {
  if (!(this.filepath in Vert.files)) {
   let body, type
   switch (this.pathname) {
    case "/client.js":
     body = `(${client})()\n${Vert}`
     type = "text/javascript; charset=UTF-8"
     break
    case "/manifest.json":
     body = JSON.stringify({ ...Vert.manifest, ...(this.manifest ?? {}) })
     type = "application/json; charset=UTF-8"
     break
    case "/node.json":
     body = JSON.stringify({ ...Vert.node, ...(this.node ?? {}) })
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
  svg { background-color: white }
  path { stroke: #333445 }
  @media (prefers-color-scheme: dark) {
   svg { background-color: #333445 }
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
><link rel=manifest href="https://${this.host}/manifest.json"
><link rel="apple-touch-icon" sizes="144x144" href="https://${this.host}/apple-touch-icon.png"
><meta name=robots content=noindex
><meta name=viewport content="width=device-width,initial-scale=1"
><meta name=copyright content="&copy; 2024 Eric Augustinowicz"
><style>body{font-family:monospace;white-space:pre wrap;word-break:break-all}</style><script src="https://${this.host}/client.js"
></script>`
     type = "text/html; charset=UTF-8"
   }

   Vert.files[this.filepath] = new Response(body, {
    headers: {
     "content-type": type,
     expires: "Sun, 20 Jul 1969 20:17:00 UTC",
     server: "kireji"
    }
   })
  }
  return Vert.files[this.filepath].clone()
 }
}

if (self instanceof (self.Window ?? class {}))
 client(async () => (document.querySelector('[rel="manifest"]').href = "manifest.json"))
else {
 oninstall = () => globalThis.skipWaiting()
 onactivate = onmessage = () => clients.claim()
 onfetch = e => e.respondWith(new Vert(e.request.url).cloneResponse())
}
