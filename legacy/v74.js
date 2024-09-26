function ƒ(𝑧) {
 var BASE_URL = "https://core.parts/base/",
  CACHE = { },
  GET = 𝑥 => {
   if (𝑥 in CACHE) return CACHE[𝑥]
   class Part extends (GET(`${𝑥}?base` in 𝑧 ? 𝑧[`${𝑥}?base`] : ) : 𝑥 === BASE_URL ? null : CACHE[BASE_URL]) {
    𝑥
   }
   if (`${𝑥}?` in 𝑧) console.warn("add own keys of " + 𝑥, 𝑧[`${𝑥}?`])
   return Part
  },
  //CORE = new Proxy({}, new Proxy(𝑧, { get: (_, Γ) => eval(𝑧["https://core.parts/proxy/alpha.js"]) })),
  LIVE_NODES = {}
 if (self instanceof (self.Window ?? class {})) {
  GET("https://core.parts/window.js").eval(true)
 } else {
  onfetch = e => GET("https://core.parts/serviceWorker/fetch.js").eval(e)
  onmessage = e => GET("https://core.parts/serviceWorker/message.js").eval(e)
  oninstall = () => globalThis.skipWaiting()
  onactivate = () => globalThis.clients.claim()
 }
}
ƒ({
 "https://core.parts/base/?": "eval",
 "https://core.parts/base/?eval": "https://core.parts/base/eval/",
 "https://core.parts/base/eval/?": "script",
 "https://core.parts/base/eval/?script": "https://core.parts/base/eval/script.js",
 "https://core.parts/base/eval/script.js": "console.warn('evaluate', this.𝑥)",

 "https://core.parts/window-fx.uri": "*",
 "https://ejaugust.com/boot.js?base": "https://core.parts/boot.js",
 "https://orenjinari.com/boot.js?base": "https://core.parts/boot.js",
 "https://fallback.cloud/boot.js?base": "https://core.parts/boot.js",
 "https://kheb.online/boot.js?base": "https://core.parts/boot.js",
 "https://kireji.io/boot.js?base": "https://core.parts/boot.js",
 "https://stargate.design/boot.js?base": "https://core.parts/boot.js",

 "https://ejaugust.com/manifest.json?base": "https://core.parts/manifest.json",
 "https://orenjinari.com/manifest.json?base": "https://core.parts/manifest.json",
 "https://fallback.cloud/manifest.json?base": "https://core.parts/manifest.json",
 "https://kheb.online/manifest.json?base": "https://core.parts/manifest.json",
 "https://kireji.io/manifest.json?base": "https://core.parts/manifest.json",
 "https://stargate.design/manifest.json?base": "https://core.parts/manifest.json",

 "https://core.parts/index.php":
  '<!DOCTYPE html><link rel=manifest><meta name=robots content=noindex><meta name=viewport content="width=device-width,initial-scale=1"><meta name=copyright content="&copy; 2024 Eric Augustinowicz"><script src="https://<?=$_SERVER["HTTP_HOST"]."/boot.js"></script>',
 "https://core.parts/base-part/": `<!DOCTYPE html><link rel=manifest><meta name=robots content=noindex><meta name=viewport content="width=device-width,initial-scale=1"><meta name=copyright content="&copy; 2024 Eric Augustinowicz"><script src="${location.origin}/boot.js"></script>`,

 "https://core.parts/favicon.svg":
  '<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 11C9.10457 11 10 10.1046 10 9C10 7.89543 9.10457 7 8 7C6.89543 7 6 7.89543 6 9C6 10.1046 6.89543 11 8 11Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.56055 21C12.1305 8.89998 16.7605 6.77998 22.0005 14.63" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 3H6C3.79086 3 2 4.79086 2 7V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V7C22 4.79086 20.2091 3 18 3Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 "https://core.parts/desktop-screenshot.svg?base": "https://core.parts/favicon.svg",
 "https://core.parts/mobile-screenshot.svg?base": "https://core.parts/favicon.svg",
 "https://core.parts/android-chrome-192x192.png?base": "https://core.parts/favicon.ico",
 "https://core.parts/android-chrome-512x512.png?base": "https://core.parts/favicon.ico",
 "https://core.parts/manifest.json": JSON.stringify({
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
 }),
 "https://core.parts/.htaccess":
  "AddCharset utf-8 .js\nErrorDocument 404 /index.php\nErrorDocument 403 /index.php\nOptions -Indexes",
 "https://core.parts/boot.js?archive": "https://core.parts/boot.a.js",
 "https://core.parts/boot.a.js": (() => {
  const result = `${ƒ}\nƒ(${JSON.stringify(
   Object.keys(𝑧)
    .sort()
    .reduce((o, k) => ((o[k] = 𝑧[k]), o), {})
  )})`
  return result
 })
  .toString()
  .slice(7, -1),
 "https://core.parts/window.js":
  "" +
  (isBooting => {
   Promise.all([
    (async () => {
     const e = "controllerchange",
      sw = navigator.serviceWorker,
      registration = await sw.register(location.origin + "/boot.js", { updateViaCache: "none" }),
      { waiting: w, installing: i, active: a } = registration,
      REBUILD_CLIENT = () => location.reload()
     if (!a) await new Promise(ƒ => ((w ?? i).onstatechange = ({ target: t }) => t.state == "activated" && ƒ(t)))
     if (!sw.controller)
      await new Promise(ƒ => {
       const ƒƒ = () => (sw.removeEventListener(e, ƒƒ), ƒ())
       sw.addEventListener(e, ƒƒ)
       registration.active.postMessage({ type: "claim" })
      })
     sw.addEventListener(e, REBUILD_CLIENT)
     sw.addEventListener("message", REBUILD_CLIENT)
     document.onvisibilitychange = () => document.hidden || registration.update()
     window.onfocus = () => registration.update()
    })(),
    new Promise(ƒ => (onload = ƒ))
   ]).then(() => {
    if (isBooting) document.querySelector('[rel="manifest"]').href = "manifest.json"
    globalThis.nodePool = {}
    const eventKireji = {
     onkeydown: 0,
     onkeyup: 0,
     onclick: 0,
     onwheel: 0,
     oncontextmenu: 0,
     onpointerdown: 0,
     onpointerup: 0,
     onpointermove: 0,
     ondblclick: 0,
     onfocus: 0,
     onblur: 0,
     layout: 1,
     manifest: 1,
     ondragstart: -1
    }
    Object.defineProperties(HTMLElement.prototype, {
     shadow: {
      get() {
       if (!this._shadow) this._shadow = this.attachShadow({ mode: "closed" })
       return this._shadow
      }
     },
     layout: {
      get() {
       if (!this._layout) {
        this._layout = new CSSStyleSheet()
        this.shadow.adoptedStyleSheets.push(this._layout)
       }
       return this._layout
      },
      set(v) {
       this.layout.replaceSync(v)
      }
     },
     manifest: {
      get() {
       return [...this.shadow.children].map(x => x.url).join(" ")
      },
      set(v) {
       if (v === undefined) throw new TypeError(`manifest called on undefined (${this._url})`)
       if (typeof v !== "string")
        throw new TypeError(
         `part manifest must have mime of text/uri-list. Function expected js input "string", but got "${typeof v}." (${
          this._url
         })`
        )
       const C = this.shadow,
        O = [...C.children].map(x => x.url)
       if (v === "") {
        ;[...C.children].forEach(x => x.remove())
        return
       }
       if (O.join(" ") === v) return
       const N = v.split(" ")
       let o,
        n,
        i = -1
       while (O.length && N.length) {
        i++
        if ((o = O.shift()) !== (n = N.shift())) {
         const u = O.findIndex(x => x === n)
         if (u === -1) this.install(n, i)
         else {
          C.insertBefore(C.children[i + u + 1], C.children[i])
          O.splice(u, 1)
         }
         if (N.some(x => x === o)) O.unshift(o)
         else C.children[i + 1].remove()
        }
        // if (repair) C.children[i].repair()
       }
       if (O.length) O.forEach(() => C.children[i + 1].remove())
       else if (N.length) N.forEach(x => this.install(x))
      }
     },
     install: {
      get() {
       const self = this
       return function nodeInstall(url, index) {
        if (!url || url === "undefined")
         throw new TypeError(
          `install url cannot be ${
           url === undefined ? "undefined" : url === "" ? "an empty string" : `"${url}"`
          } (installing <${self.tagName}> on ${self._url})`
         )
        const poolNode = url in nodePool ? [...nodePool[url]].find(x => !x.isConnected && !x.parentNode) : undefined,
         hadPoolNode = !!poolNode,
         node = hadPoolNode ? poolNode : document.createElement(CORE[url].getEmbedTag())
        if (index === undefined || index >= self.shadow.children.length) self.shadow.appendChild(node)
        else self.shadow.insertBefore(node, self.shadow.children[index])
        if (node._url !== url) node.url = url
       }
      }
     },
     proxy: {
      get() {
       if (!this._proxy) this._proxy = CORE[this.url]
       return this._proxy
      }
     },
     url: {
      get() {
       if (!this._url) throw new ReferenceError("attempted to get url before it was defined.")
       return this._url
      },
      set(v) {
       if (this._url) throw new TypeError(`cannot change HTMLElement's url (is ${this._url}, tried to set to ${v})`)
       this._url = v
       if (!(v in nodePool)) nodePool[v] = new Set()
       nodePool[v].add(this)
       const proxy_keys = Object.keys(this.proxy),
        focus_events = ["onfocus", "onpointerdown", "onclick", "oncontextmenu", "onblur"]
       if (proxy_keys.some(x => focus_events.includes(x))) this.tabIndex = 0
       for (const kireji in eventKireji) {
        const type = eventKireji[kireji]
        if (type === -1) {
         this[kireji] = e => e.preventDefault()
        } else if (proxy_keys.includes(kireji)) {
         const subproxy = this.proxy[kireji]
         switch (type) {
          case 0:
           this[kireji] = subproxy
           break
          case 1:
           const primitive = subproxy.toPrimitive()
           this[kireji] = primitive
           const url = subproxy.headerOf().href
           if (!(url in LIVE_NODES)) LIVE_NODES[url] = {}
           if (!(kireji in LIVE_NODES[url])) LIVE_NODES[url][kireji] = new Set()
           LIVE_NODES[url][kireji].add(this)
           break
         }
        }
       }
      }
     }
    })
    console.info("[Client] Ready. Setting body url")
    document.body.url = location.host.startsWith("dev.") ? "https://" + location.href.slice(12) : location.href
   })
  }),
 "https://core.parts/serviceWorker/message.js":
  "" +
  (({ data, source }) => {
   switch (data.type) {
    case "restart":
     registration.unregister()
     source.postMessage({ type: "rebuild" })
     break
    case "save":
     Object.assign(𝑧, data.𝑧)
     delete 𝑧["https://core.parts/boot.js"]
     delete 𝑧["https://pilot.parts/boot.js"]
     delete 𝑧["https://ejaugust.com/boot.js"]
     delete 𝑧["https://orenjinari.com/boot.js"]
     delete 𝑧["https://stargate.design/boot.js"]
     delete 𝑧["https://kheb.online/boot.js"]
     delete 𝑧["https://kireji.app/boot.js"]
     delete 𝑧["https://kireji.io/boot.js"]
     delete 𝑧["https://fallback.cloud/boot.js"]
     break
    case "claim":
     globalThis.clients.claim()
     break
    default:
     throw "unhandled server command: " + data.type
   }
  }),
 "https://core.parts/serviceWorker/message.js?fx": "https://core.parts/window-fx.uri",
 "https://core.parts/serviceWorker/fetch.js?fx": "https://core.parts/window-fx.uri",
 "https://core.parts/serviceWorker/fetch.js":
  "" +
  (event => {
   const direct = typeof event === "string",
    raw_url = direct ? event : event.request.url,
    url = new URL(raw_url).host.startsWith("dev.") ? "https://" + raw_url.slice(12) : raw_url
   const proxy = CORE[url],
    { binary, type, kireji, target } = proxy.headerOf().groups
   let string = ""
   string = proxy.toPrimitive()
   if (kireji) {
    console.warn("deprecate this redirect concept?")
    const response = Response.redirect(string, 307)
    return direct ? response : event.respondWith(response)
   }
   var body = new TextEncoder().encode(string)
   if (binary) {
    const B = atob(string),
     k = B.length,
     A = new ArrayBuffer(k),
     I = new Uint8Array(A)
    for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i)
    body = new Blob([I], { type })
   }
   const response = new Response(body, {
    headers: {
     "content-type": `${type}${binary ? "" : "; charset=UTF-8"}`,
     expires: "Sun, 20 Jul 1969 20:17:00 UTC",
     server: "kireji"
    }
   })
   return direct ? response : event.respondWith(response)
  }),
 "https://core.parts/base-part/hash.js":
  "(x, y = 0x811c9dc5) => [...x].reduce((y, c) => (y ^= c.charCodeAt(0)) + (y << 1) + (y << 4) + (y << 7) + (y << 8) + (y << 24), y).toString(36)",
 "https://core.parts/base-part/layout.css": "",
 "https://core.parts/base-part/manifest.uri": "",
 "https://core.parts/base-part/?": "https://core.parts/base-part/parts.txt",
 "https://core.parts/base-part/parts.txt":
  "apply get getEmbedTag getOwnPropertyDescriptor getPrototypeOf has hash headerOf isExtensible layout manifest ownKeys query rootsOf set toPrimitive toString valueOf",
 "https://core.parts/base-part/?apply": "https://core.parts/proxy/beta/apply.js",
 "https://core.parts/base-part/?get": "https://core.parts/proxy/beta/get.js",
 "https://core.parts/base-part/?getEmbedTag": "https://core.parts/proxy/beta/getEmbedTag.js",
 "https://core.parts/base-part/?getOwnPropertyDescriptor": "https://core.parts/proxy/beta/getOwnPropertyDescriptor.js",
 "https://core.parts/base-part/?getPrototypeOf": "https://core.parts/proxy/beta/getPrototypeOf.js",
 "https://core.parts/base-part/?has": "https://core.parts/proxy/beta/has.js",
 "https://core.parts/base-part/?hash": "https://core.parts/base-part/hash.js",
 "https://core.parts/base-part/?headerOf": "https://core.parts/proxy/beta/headerOf.js",
 "https://core.parts/base-part/?isExtensible": "https://core.parts/proxy/beta/isExtensible.js",
 "https://core.parts/base-part/?layout": "https://core.parts/base-part/layout.css",
 "https://core.parts/base-part/?manifest": "https://core.parts/base-part/manifest.uri",
 "https://core.parts/base-part/?ownKeys": "https://core.parts/proxy/beta/ownKeys.js",
 "https://core.parts/base-part/?query": "https://core.parts/proxy/beta/query.js",
 "https://core.parts/base-part/?rootsOf": "https://core.parts/proxy/beta/rootsOf.js",
 "https://core.parts/base-part/?set": "https://core.parts/proxy/beta/set.js",
 "https://core.parts/base-part/?toPrimitive": "https://core.parts/proxy/beta/toPrimitive.js",
 "https://core.parts/base-part/?toString": "https://core.parts/proxy/beta/toString.js",
 "https://core.parts/base-part/?valueOf": "https://core.parts/proxy/beta/valueOf.js",
 "https://core.parts/proxy/alpha.js": (
  "" +
  (() =>
   ({
    get: (_, 𝑥) => {
     if (𝑥 in CACHE) return CACHE[𝑥].β
     const regex =
       /^(?<protocol>[a-z+]+:\/\/?)(?:(?<host>[^\/]+?)(?:\/(?<path>(?:[^\s.?\/]+?\/)*)(?:(?<part>[a-z][a-z0-9-]*)\/?|(?<filename>[^\s?\/]*)\.(?<extension>(?<binary>png|ico|woff2|wasm)|[^\s.?\/]+))|\/(?<index>(?:[^\s.?\/]+?\/)*))(?:\?(?<kireji>[a-zA-Z][a-zA-Z0-9_]*)(?:=(?<value>-?[\d]*\.?[\d]*)(?<rest_kireji>&(?:[a-zA-Z][a-zA-Z0-9_]*=-?[\d]*\.?[\d]*)+)?$)?)?)?$/,
      Ψ = 𝑥.match(regex)?.groups
     if (!Ψ) {
      throw new TypeError("AlphaError: bad request " + 𝑥)
     }
     const extras = {
       size: {
        get() {
         return 𝑧[𝑥]?.length ?? 0
        }
       },
       entrySize: {
        get() {
         return this.size + 𝑥.length
        }
       }
      },
      types = {
       js: "text/javascript",
       css: "text/css",
       json: "application/json",
       svg: "image/svg+xml",
       png: "image/png",
       woff2: "font/woff2",
       ico: "image/vnd.microsoft.icon",
       html: "text/html",
       wasm: "application/wasm",
       uri: "text/uri-list",
       hood: "physical/car-part",
       cork: "physical/drink-stopper",
       balloon: "physical/toy",
       zit: "physical/blemish"
      },
      true_extension = Ψ.value
       ? "js"
       : Ψ.index !== undefined || Ψ.part !== undefined
       ? "html"
       : Ψ.kireji === undefined
       ? Ψ.extension
       : "uri"
     Object.defineProperties(Ψ, extras)
     if (Ψ.value) Ψ.target = 𝑥.slice(0, -Ψ.kireji.length - (2 + Ψ.value.length))
     Ψ.type = types[true_extension] ?? "text/plain"
     let α, β
     α = new Proxy(Proxy, {
      get: (_, π) => {
       if (π === Symbol.toPrimitive) π = "toPrimitive"
       const result = eval(
        `(${
         𝑧[𝑧[`${𝑥}?${π}`] ?? 𝑧[`${𝑧[`${𝑥}?base`] ?? "https://core.parts/base-part/"}?${π}`]] ??
         𝑧[`https://core.parts/proxy/beta/${π}.js`]
        })`
       )
       return result
      }
     })
     β = new Proxy(α, α)
     CACHE[𝑥] = { β }
     return β
    },
    set: (_, 𝑥, δ) => {
     if (𝑧[𝑥] === δ) return
     const payload = { [𝑥]: δ },
      onset = data => {
       for (const url in data)
        if (url in LIVE_NODES)
         Object.entries(LIVE_NODES[url]).forEach(([kireji, nodeset]) => {
          nodeset.forEach(node => (node[kireji] = data[url]))
         })
      },
      compute_item = url => {
       // TODO: check that the urls who affect this one - imagined earlier in this for loop - had any actual changes compared to existing. Skip if not.
       const existing = 𝑧[url],
        generated = CORE[url].toPrimitive("imagine", 𝑥)
       if (existing !== generated) {
        payload[url] = 𝑧[url] = generated
        // TODO: verify. For all fx of current url whose own url already passed through this callback,
        // imagine the fx's value again. maybe it changed? That would be a consistency issue.
       }
      }
     𝑧[𝑥] = δ
     if (globalThis.coresetlock) return onset(payload)
     globalThis.coresetlock = true
     const fxall = new Set(),
      recursive_getfx = (cause, affected, level) => {
       for (const url of affected) {
        if (url === "undefined" || fxall.has(url)) continue
        fxall.add(url)
        recursive_getfx(url, ("" + CORE[url].fx).split(" "), level + 1)
       }
      }
     recursive_getfx(undefined, [𝑥], 0)
     const seen = new Set(),
      order = [...fxall],
      extract = item => {
       if (!order.includes(item)) return
       order.splice(order.indexOf(item), 1)
      }
     extract(𝑥)
     extract("undefined")
     // TODO: Allow a script to set others?
     if (order.includes("*")) {
      throw "not yet setting * to refresh the page ...."
     }
     order.forEach(compute_item)
     onset(payload)
     globalThis.coresetlock = false
    }
   }[Γ]))
 ).slice(6),
 "https://core.parts/proxy/beta/apply.js":
  "" +
  ((unused1, unused2, A) => {
   return eval("" + α)(...A)
  }),
 "https://core.parts/proxy/beta/get.js":
  "" +
  ((_, π) => {
   if (
    ["toPrimitive", Symbol.toPrimitive, "toString", "valueOf", "headerOf", "rootsOf", "query", "getEmbedTag"].includes(
     π
    )
   ) {
    return α[π]
   }
   let p,
    r = (p = 𝑥),
    result,
    exists,
    base_url = "https://core.parts/base-part/"
   do {
    exists = (result = 𝑧[(url = `${r}?${π}`)]) !== undefined
    if (exists) return CORE[result]

    if (r === base_url) break
    p = r
    r = 𝑧[`${r}?base`] ?? base_url
   } while (r !== p)
  }),
 "https://core.parts/proxy/beta/getEmbedTag.js": "" + ((part = Ψ.part) => part + (part.includes("-") ? "" : "-")),
 "https://core.parts/proxy/beta/getOwnPropertyDescriptor.js":
  "" +
  ((_, π) => ({
   configurable: true,
   enumerable: true,
   writable: true,
   value: α
  })),
 "https://core.parts/proxy/beta/getPrototypeOf.js":
  "" +
  (() => {
   return Object.prototype
  }),
 "https://core.parts/proxy/beta/has.js":
  "" +
  ((_, π) => {
   // Beta proxy functions - 𝑥 (upsilon) refers to subject url in the function body.
   if (
    ["toPrimitive", Symbol.toPrimitive, "toString", "valueOf", "headerOf", "rootsOf", "query", "getEmbedTag"].includes(
     π
    )
   ) {
    return α[π] !== undefined
   }
   // For other functions, 𝑥 will refer to the url of the function itself
   let p,
    r = (p = 𝑥),
    url,
    result,
    exists,
    base_url = "https://core.parts/base-part/"
   do {
    exists = (result = 𝑧[(url = `${r}?${π}`)]) !== undefined
    if (exists) {
     return true
    }
    if (r === base_url) break
    p = r
    r = 𝑧[`${r}?base`] ?? base_url
   } while (r !== p)
  }),
 "https://core.parts/proxy/beta/headerOf.js":
  "" +
  (() => ({
   kernelActionKey: Γ,
   href: 𝑥,
   metaKernel: α,
   self: β,
   groups: Ψ,
   metaKernelKey: π
  })),
 "https://core.parts/proxy/beta/isExtensible.js":
  "" +
  (() => {
   return true
  }),
 "https://core.parts/proxy/beta/ownKeys.js":
  "" +
  function ownKeys() {
   const base_url = "https://core.parts/base-part/",
    keys = new Set(),
    own_keys_url = `${𝑥}?`
   if (own_keys_url in 𝑧) {
    if (𝑥 !== base_url) {
     const startTime = Date.now()
     console.group("BEGIN PERFORMANCE SIMULATION", startTime)
     let result
     for (let i = 0; i < 1000; i++) {
      const base_keys = Object.keys(CORE[𝑧[`${𝑥}?base`] ?? base_url])
      result = new Set(base_keys.concat(CORE[𝑧[own_keys_url]].toPrimitive().split(" ")))
     }
     const markTime = Date.now()
     console.info("MARK - Fast method", markTime - startTime)
     for (let i = 0; i < 1000; i++) {
      for (const url in 𝑧) {
       if (!url.match(/^[^?]*\?\w*$/)) continue
       let p,
        r = (p = 𝑥)
       const [base, π] = url.split("?")
       if (keys.has(π)) continue
       do {
        if (r === base) {
         keys.add(π)
         break
        }
        if (r === base_url) break
        p = r
        r = 𝑧[`${r}?base`] ?? base_url
       } while (r !== p)
      }
      result = [...keys]
     }
     console.info("MARK - Slow method", Date.now() - markTime)
     console.groupEnd()
     return result
    } else {
     return 𝑧[𝑧["https://core.parts/base-part/?"]].split(" ")
    }
   }
   for (const url in 𝑧) {
    if (!url.match(/^[^?]*\?\w*$/)) continue
    let p,
     r = (p = 𝑥)
    const [base, π] = url.split("?")
    if (keys.has(π) || !π) continue
    do {
     if (r === base) {
      keys.add(π)
      break
     }
     if (r === base_url) break
     p = r
     r = 𝑧[`${r}?base`] ?? base_url
    } while (r !== p)
   }
   const result = [...keys]
   return result
  },
 "https://core.parts/proxy/beta/query.js":
  "" +
  ((ƒ = x => x) => {
   const roots = β.rootsOf()
   return Object.keys(𝑧).reduce((o, url) => {
    const rootIndex = roots.findIndex(root => url.startsWith(root + "?"))
    if (rootIndex !== -1) {
     const root = roots[rootIndex],
      kireji = url.slice(root.length + 1)
     const item = { url, root, kireji, rootIndex, href: 𝑧[url] }
     const result = ƒ(item)
     if (result) o.push(result)
    }
    return o
   }, [])
  }),
 "https://core.parts/proxy/beta/rootsOf.js":
  "" +
  (() => {
   const roots = [𝑥],
    protobase = "https://core.parts/base-part/"
   if (𝑥 === protobase) throw "recursion"
   let root = 𝑥,
    key
   while ((root = 𝑧[(key = root + "?base")])) {
    if (roots.includes(root)) throw "base loop"
    roots.push(root)
    if (root === protobase) break
   }
   if (!roots.includes(protobase)) roots.push(protobase)
   return roots
  }),
 "https://core.parts/proxy/beta/set.js":
  "" +
  ((_, kireji, value) => {
   console.warn("try to use the other method directly", { kireji, value, 𝑥 })
   return (CORE[CORE[CORE[𝑥].query(l => (l.kireji === kireji ? l.url : undefined))[0]]] = value)
  }),
 "https://core.parts/proxy/beta/toPrimitive.js":
  "" +
  function toPrimitive(hint, caller) {
   const imagine = hint === "imagine",
    existing = 𝑧[𝑥]

   if (!imagine && existing !== undefined) return existing

   const archive_script = β.archive?.toPrimitive(),
    base_root = "https://core.parts/base-part/"

   if (!archive_script) return (β.base ?? CORE[base_root]).toPrimitive()

   const properties = new Map()

   for (const url in 𝑧) {
    if (!url.match(/^[^?]*\?\w*$/)) continue

    let p,
     r = (p = 𝑥),
     rank = 0

    const [base, π] = url.split("?")

    if (!π) continue

    do {
     if (r === base) {
      if (!properties.has(π) || properties.get(π)[0] > rank) properties.set(π, [rank, `"${𝑧[url]}": ${π}`])

      break
     }

     if (r === base_root) break

     p = r
     rank++
     r = 𝑧[`${r}?base`] ?? base_root
    } while (r !== p)
   }

   const script =
     "({ \n " + [...properties.values()].map(x => x[1]).join(",\n ") + "\n}) => {\n " + archive_script + "\n}",
    primitive = eval(script)(CORE),
    output_type = typeof primitive

   if (output_type !== "string") throw new TypeError(`output of ${𝑥} must be a primitive string (got ${output_type})`)

   return imagine ? primitive : (CORE[𝑥] = primitive)
  },
 "https://core.parts/proxy/beta/toString.js": "\n  () => {\n   return 𝑧[𝑥]\n  }",
 "https://core.parts/proxy/beta/valueOf.js": "\n  () => {\n   return 𝑧[𝑥]\n  }",

 "https://core.parts/?base": "https://pilot.parts/",

 "https://core.parts/apple-touch-icon.png":
  "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",
 "https://core.parts/behaviors/copy-from-source.js": "return ''+CORE[𝑥.replace(''+destination,''+source)]",
 "https://core.parts/behaviors/grab/fx.uri": "https://core.parts/onpointermove.js https://core.parts/onpointerup.js",
 "https://core.parts/behaviors/grab/position.json": "{}",
 "https://core.parts/behaviors/grab/src.uri": "",
 "https://core.parts/behaviors/shift.txt": "0",
 "https://core.parts/behaviors/grab/src.uri?fx": "https://core.parts/behaviors/grab/fx.uri",
 "https://core.parts/behaviors/move.txt": "move",
 "https://core.parts/behaviors/release/fx.uri": "https://core.parts/onpointerup.js",
 "https://core.parts/behaviors/release/src.uri": "",
 "https://core.parts/behaviors/release/src.uri?fx": "https://core.parts/behaviors/release/fx.uri",
 "https://core.parts/behaviors/resize/bottom-.css":
  "\n  :host {\n   position: absolute;\n   bottom: -2px;\n   left: 4px;\n   right: 4px;\n   height: 6px;\n   cursor: ns-resize\n  }",
 "https://core.parts/behaviors/resize/bottom-.txt": "s-resize",
 "https://core.parts/behaviors/resize/bottom-left.css":
  "\n  :host {\n   position: absolute;\n   bottom: -2px;\n   left: -2px;\n   width: 6px;\n   height: 6px;\n   cursor: nesw-resize\n  }",
 "https://core.parts/behaviors/resize/bottom-left.txt": "sw-resize",
 "https://core.parts/behaviors/resize/bottom-right.css":
  "\n  :host {\n   position: absolute;\n   bottom: -2px;\n   right: -2px;\n   width: 6px;\n   height: 6px;\n   cursor: nwse-resize\n  }",
 "https://core.parts/behaviors/resize/bottom-right.txt": "se-resize",
 "https://core.parts/behaviors/resize/left-.css":
  "\n  :host {\n   position: absolute;\n   bottom: 4px;\n   left: -2px;\n   top: 4px;\n   width: 6px;\n   cursor: ew-resize\n  }",
 "https://core.parts/behaviors/resize/left-.txt": "w-resize",
 "https://core.parts/behaviors/resize/left-right.txt": "ew-resize",
 "https://core.parts/behaviors/resize/onpointerdown.a.js":
  '\n  const\n   input_url = position.headerOf().href,\n   transformer_url = "https://core.parts/behaviors/resize/transformer.js",\n   output_properties = {\n    "move":      "[north_south_pan, east_west_pan]",\n    "n-resize":  "north_resize",\n    "s-resize":  "south_resize",\n    "e-resize":  "east_resize",\n    "w-resize":  "west_resize",\n    "ne-resize": "[north_resize, east_resize]",\n    "se-resize": "[south_resize, east_resize]",\n    "nw-resize": "[north_resize, west_resize]",\n    "sw-resize": "[south_resize, west_resize]"\n   }[mode],\n   stop = ("" + stop_propagation) === "1" ? `event.stopPropagation(); event.preventDefault()` : ``,\n   focus = ("" + should_focus) === "1" ? `event.target.focus();` : ``;\n  if (!output_properties) throw "bad mode: " + mode\n  return `event => {\n   const\n    { clientX: x, clientY: y } = event,\n    { x: X = 0, y: Y = 0, w: W = 0, h: H = 0, range = { }, snap = { } } = JSON.parse(CORE["${input_url}"].toPrimitive()),\n    { x: rx = [], y: ry = [], w: rw = [], h: rh = [] } = range,\n    { x: sx = 1, y: sy = 1 } = snap,\n    [min_x = -Infinity, max_x = Infinity] = rx,\n    [min_y = -Infinity, max_y = Infinity] = ry,\n    [min_w = -Infinity, max_w = Infinity] = rw,\n    [min_h = -Infinity, max_h = Infinity] = rh,\n    original_properties = ${"`x: ${X}, y: ${Y}, w: ${W}, h: ${H}, range: { x: [${rx}], y: [${ry}], w: [${rw}], h: [${rh}] }, snap: { x: ${sx} , y: ${sy} }`"},\n    north_south_pan = ${"`y: Math.max(${min_y}, ${Y} - ${y} + y)`"},\n    east_west_pan = ${"`x: Math.max(${min_x}, ${X} - ${x} + x)`"},\n    north_resize = [north_south_pan,${"`h: Math.max(${min_h}, ${H} + (${y} - y))`"}].join(", "),\n    south_resize = ${"`h: Math.max(${min_h}, ${H} - (${y} - y))`"},\n    east_resize = ${"`w: Math.max(${min_w}, ${W} - (${x} - x))`"},\n    west_resize = [east_west_pan, ${"`w: Math.max(${min_w}, ${W} + (${x} - x))`"}].join(", "),\n    properties = [original_properties, ${output_properties}].join(", ");\n   ${stop}\n   ${focus}\n   CORE["${transformer_url}"] = \\`({ clientX: x, clientY: y }) => {\n    const object = {\\${properties}};\n    if (!object.x) delete object.x\n    if (!object.y) delete object.y\n    if (!object.h) delete object.h\n    if (!object.w) delete object.w\n    if (!object.snap.x) delete object.snap.x\n    else {\n     if ("x" in object) object.x = Math.round(object.x / object.snap.x) * object.snap.x\n     if ("w" in object) object.w = Math.round(object.w / object.snap.x) * object.snap.x\n    }\n    if (!object.snap.y) delete object.snap.y\n    else {\n     if ("y" in object) object.y = Math.round(object.y / object.snap.y) * object.snap.y\n     if ("h" in object) object.h = Math.round(object.h / object.snap.y) * object.snap.y\n    }\n    if (!Object.keys(object.snap).length) delete object.snap\n    if (!object.range.x.length) delete object.range.x\n    if (!object.range.y.length) delete object.range.y\n    if (!object.range.w.length) delete object.range.w\n    if (!object.range.h.length) delete object.range.h\n    if (!Object.keys(object.range).length) delete object.range\n    CORE["${input_url}"] = JSON.stringify(object)\n   }\\`\n   CORE["https://core.parts/behaviors/grab/src.uri"] = "${transformer_url}";\n  }`',
 "https://core.parts/behaviors/resize/onpointerdown.js?archive":
  "https://core.parts/behaviors/resize/onpointerdown.a.js",
 "https://core.parts/behaviors/resize/onpointerdown.js?should_focus": "https://core.parts/const/zero.txt",
 "https://core.parts/behaviors/resize/onpointerdown.js?stop_propagation": "https://core.parts/const/zero.txt",
 "https://core.parts/behaviors/resize/right-.css":
  "\n  :host {\n   position: absolute;\n   bottom: 4px;\n   right: -2px;\n   top: 4px;\n   width: 6px;\n   cursor: ew-resize\n  }",
 "https://core.parts/behaviors/resize/right-.txt": "e-resize",
 "https://core.parts/behaviors/resize/top-.css":
  "\n  :host {\n   position: absolute;\n   top: -2px;\n   left: 4px;\n   right: 4px;\n   height: 6px;\n   cursor: ns-resize\n  }",
 "https://core.parts/behaviors/resize/top-.txt": "n-resize",
 "https://core.parts/behaviors/resize/top-bottom.txt": "ns-resize",
 "https://core.parts/behaviors/resize/top-left-bottom-right.txt": "nwse-resize",
 "https://core.parts/behaviors/resize/top-left.css":
  "\n    :host {\n     position: absolute;\n     top: -2px;\n     left: -2px;\n     width: 6px;\n     height: 6px;\n     cursor: nwse-resize\n    }",
 "https://core.parts/behaviors/resize/top-left.txt": "nw-resize",
 "https://core.parts/behaviors/resize/top-right-bottom-left.txt": "nesw-resize",
 "https://core.parts/behaviors/resize/top-right.css":
  "\n  :host {\n   position: absolute;\n   top: -2px;\n   right: -2px;\n   width: 6px;\n   height: 6px;\n   cursor: nesw-resize\n  }",
 "https://core.parts/behaviors/resize/top-right.txt": "ne-resize",
 "https://core.parts/behaviors/window-close.a.js":
  '\n  const\n   task_url = task.headerOf().href,\n   window_url = window.headerOf().href;\n  return `\n   () => {\n    const\n     windows_uri = "https://pilot.parts/windows.uri",\n     tasks_uri = "https://pilot.parts/tasks.uri",\n     windows_string = CORE[windows_uri].toPrimitive(),\n     tasks_string = CORE[tasks_uri].toPrimitive(),\n     windows = windows_string ? windows_string.split(" ") : [],\n     tasks = tasks_string ? tasks_string.split(" ") : [],\n     own_window = "${window_url}",\n     own_task = "${task_url}";\n    const window_index = windows.indexOf(own_window);\n    const task_index = tasks.indexOf(own_task);\n    if (window_index !== -1) windows.splice(window_index, 1)\n    if (task_index !== -1) tasks.splice(task_index, 1)\n    CORE[windows_uri] = windows.join(" ")\n    CORE[tasks_uri] = tasks.join(" ")\n   }\n  `',
 "https://core.parts/behaviors/window-focus.a.js":
  '\n  const\n   active_url = active.headerOf().href,\n   window_url = window.headerOf().href;\n  return `\n   e => {\n    CORE["${active_url}"] = "1";\n    const\n     windows_uri = "https://pilot.parts/windows.uri",\n     windows_string = CORE[windows_uri].toPrimitive(),\n     windows = windows_string ? windows_string.split(" ") : [],\n     own_window = "${window_url}";\n    if (windows.at(-1) !== own_window) {\n     const window_index = windows.indexOf(own_window);\n     if (window_index !== -1) windows.splice(window_index, 1)\n     windows.push(own_window)\n     CORE[windows_uri] = windows.join(" ")\n    }\n   }\n  `',
 "https://core.parts/components/button/construct.js":
  '\n  (url, layout = "", manifest = "", onclickjs = `()=>{ console.trace("button click ${url}") }`) => {\n   let parts = ("" + CORE["https://core.parts/components/button/construct.json"]).replace(/\\$1/g, url).replace(/\\$2/, layout.replace(/\\n/g, "\\\\n").replace(/"/g, \'\\\\"\')).replace(/\\$3/, manifest).replace(/"\\$4"/, JSON.stringify(""+onclickjs))\n   Object.entries(JSON.parse(parts)).forEach(([url, value]) => CORE[url] = value)\n  }',
 "https://core.parts/components/button/construct.json":
  '\n  {\n   "$1layout.css?archive": "$1layout.css.a.js",\n   "$1layout.css.a.js": "{ return `:host { background-color: #c3c3c3;${(``+down) === `1` ? `background-image: linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white), linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white); background-size: 2px 2px; background-position: 0 0, 1px 1px;`:``}; box-sizing: border-box; box-shadow: ${(``+down) === `1` ? `inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a` : `inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb`}} $2` }",\n   "$1manifest.uri": "$3",\n   "$1onclick.js": "$4",\n   "$1?layout": "$1layout.css",\n   "$1?manifest": "$1manifest.uri",\n   "$1?onclick": "$1onclick.js",\n   "$1layout.css?down": "$1down.txt",\n   "$1?onpointerdown": "$1onpointerdown.js",\n   "$1onpointerdown.js": "e => { e.stopPropagation(); CORE[\'$1down.txt\'] = \'1\'; CORE[\'https://core.parts/behaviors/release/src.uri\'] = \'$1release.js\' }","$1release.js":"e => { CORE[\'$1down.txt\'] = \'0\' }",\n   "$1down.txt": "0",\n   "$1down.txt?fx": "$1down-fx.uri",\n   "$1down-fx.uri": "$1layout.css"\n  }',
 "https://core.parts/components/cell/construct.js":
  '\n  (url, layout, manifest, layout_by_reference = false, manifest_by_reference = false) => {\n   if (layout) {\n    if (layout_by_reference) CORE[url + "?layout"] = layout\n    else {\n     const layout_url = url + "layout.css";\n     CORE[url + "?layout"] = layout_url\n     CORE[layout_url] = layout\n    }\n   }\n   if (manifest) {\n    if (manifest_by_reference) CORE[url + "?manifest"] = manifest\n    else {\n     const manifest_url = url + "manifest.uri";\n     CORE[url + "?manifest"] = manifest_url\n     CORE[manifest_url] = manifest\n    }\n   }\n  }',
 "https://core.parts/components/click/construct.js":
  '\n  ($1, $2 = "https://core.parts/const/do-nothing.js", $3 = "https://core.parts/const/do-nothing.js") => {\n   return CORE["https://core.parts/components/click/instantiate.js"]("click", $1, $2, $3)\n  }',
 "https://core.parts/components/click/construct.json":
  '\n  {\n   "$1?onclick": "$1onclick.js",\n   "$1onclick.js": "e => CORE[\'https://core.parts/components/click/handler.js\'](e, \'$2\',\'$3\')"\n  }',
 "https://core.parts/components/click/handler.js":
  '\n  (e, $2, $3) => {\n   const\n    key = "%double_click_timer%",\n    waiting = key in globalThis,\n    own_url = e.target.url;\n   if (waiting) {\n    const\n     config = globalThis[key],\n     clicked_url = config.url;\n    // Stop waiting for double click.\n    clearTimeout(config.timeout)\n    delete globalThis[key]\n    if (clicked_url === own_url) {\n     // Handle double click.\n     return CORE[$3](e)\n    }\n   }\n   // Wait for double click.\n   globalThis[key] = { url: e.target.url, timeout: setTimeout(() => delete globalThis[key], 500) }\n   // Handle single click.\n   return CORE[$2](e)\n  }',
 "https://core.parts/components/click/instantiate.js":
  '\n  (template_name, ...$) => Object.assign(𝑧, JSON.parse($.reduce(\n   (x, $n, n) => x.replace(new RegExp("\\\\$" + (n+1), "g"), $n),\n   "" + CORE[`https://core.parts/components/${template_name}/construct.json`]\n  )))',
 "https://core.parts/components/transform/construct.js":
  '(transform_url, position_url, directions = "nesw", move_handle_url) => {\n if (!/^n?e?s?w?$/.test(directions)) throw new TypeError(`transform component requires format /^n?e?s?w?$/ (got ${directions})`)\n const\n  manifest = [],\n  base_url = transform_url + "base/",\n  behavior_url = "https://core.parts/behaviors/resize/",\n  resize_cell = dir => {\n   const\n    dir_url = transform_url + dir + "/",\n    dir_base = `${behavior_url}${dir}.`;\n   CORE[dir_url + "?layout"] = dir_base + "css"\n   CORE[dir_url + "?onpointerdown"] = dir_url + "onpointerdown.js"\n   CORE[dir_url + "onpointerdown.js?base"] = base_url + "onpointerdown.js"\n   CORE[dir_url + "onpointerdown.js?mode"] = dir_base + "txt"\n   manifest.push(dir_url)\n  };\n CORE[base_url + "onpointerdown.js?base"] = behavior_url + "onpointerdown.js"\n CORE[base_url + "onpointerdown.js?position"] = position_url\n if (directions.includes("n")) {\n  resize_cell("top-")\n  if (directions.includes("e")) resize_cell("top-right")\n  if (directions.includes("w")) resize_cell("top-left")\n }\n if (directions.includes("s")) {\n  resize_cell("bottom-")\n  if (directions.includes("e")) resize_cell("bottom-right")\n  if (directions.includes("w")) resize_cell("bottom-left")\n }\n if (directions.includes("e")) resize_cell("right-")\n if (directions.includes("w")) resize_cell("left-")\n if (move_handle_url) {\n  CORE[move_handle_url + "?onpointerdown"] = move_handle_url + "onpointerdown.js"\n  CORE[move_handle_url + "onpointerdown.js?base"] = base_url + "onpointerdown.js"\n  CORE[move_handle_url + "onpointerdown.js?mode"] = "https://core.parts/behaviors/move.txt"\n }\n return manifest.join(" ")\n}',
 "https://core.parts/const/do-nothing.js": "()=>{}",
 "https://core.parts/const/one.txt": "1",
 "https://core.parts/const/zero.txt": "0",
 "https://core.parts/debug/event.js": "e => console.trace(e)",
 "https://core.parts/favicon.ico?base": "https://core.parts/apple-touch-icon.png",
 "https://core.parts/flex-spacer/?layout": "https://core.parts/flex-spacer/layout.css",
 "https://core.parts/flex-spacer/layout.css": "\n  :host {\n   flex: 1 1;\n  }",
 "https://core.parts/img/blue-grid.png":
  "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",
 "https://core.parts/img/white-dots.png":
  "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",
 "https://core.parts/img/white-grid.png":
  "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",
 "https://core.parts/oncontextmenu.js": "e => { e.preventDefault(); e.stopPropagation(); }",
 "https://core.parts/onpointermove.a.js": 'return (""+behavior) ? (""+CORE[behavior]) : "( ) => { }"',
 "https://core.parts/onpointermove.js?behavior": "https://core.parts/behaviors/grab/src.uri",
 "https://core.parts/onpointermove.js?archive": "https://core.parts/onpointermove.a.js",
 "https://core.parts/onpointerup.a.js":
  'return `e => { ${(""+grab) ? `CORE["${grab.headerOf().href}"] = ""; ` : ""}${(""+release) ? `CORE["${release}"](e); CORE["${release.headerOf().href}"] = ""; ` : ""}}`',
 "https://core.parts/onkeydown.js":
  "" +
  (e => {
   const shift_url = "https://core.parts/behaviors/shift.txt"
   if (e.key === "Shift" && "" + CORE[shift_url] === "0") CORE[shift_url] = "1"
  }),
 "https://core.parts/onkeyup.js":
  "" +
  (e => {
   const shift_url = "https://core.parts/behaviors/shift.txt"
   if (e.key === "Shift" && !e.shiftKey) CORE[shift_url] = "0"
  }),
 "https://core.parts/onpointerup.js?archive": "https://core.parts/onpointerup.a.js",
 "https://core.parts/onpointerup.js?grab": "https://core.parts/behaviors/grab/src.uri",
 "https://core.parts/onpointerup.js?release": "https://core.parts/behaviors/release/src.uri",
 "https://core.parts/version.txt": "0.026",
 "https://ejaugust.com/favicon.ico?base": "https://core.parts/apple-touch-icon.png",
 "https://ejaugust.com/research/wasm/test.js":
  'WebAssembly.instantiateStreaming(onfetch("https://core.parts/wasm/test.wasm")).then(module => console.trace(module.instance.exports))',
 "https://ejaugust.com/research/wasm/test.wasm":
  "AGFzbQEAAAABBwFgA39/fwADAgEABQMBAAEHDgIDbWVtAgAEZmlsbAAACg0BCwAgACABIAL8CwALAAoEbmFtZQIDAQAA",
 "https://ejaugust.com/?base": "https://pilot.parts/",
 "https://kheb.online/favicon.ico?base": "https://core.parts/apple-touch-icon.png",
 "https://kheb.online/?base": "https://pilot.parts/",
 "https://stargate.design/?base": "https://pilot.parts/",
 "https://kireji.app/demo/hello.txt.a.js":
  "return `Welcome to my ${noun}, ${persons_name}! I've been ${verb_ending_in_ing} on it all ${time_interval}. I'm so ${mood} you ${past_phrasal_verb}.`",
 "https://kireji.app/demo/hello.txt?archive": "https://kireji.app/demo/hello.txt.a.js",
 "https://kireji.app/demo/hello.txt?mood": "https://kireji.app/demo/mood.txt",
 "https://kireji.app/demo/hello.txt?noun": "https://kireji.app/demo/noun.txt",
 "https://kireji.app/demo/hello.txt?past_phrasal_verb": "https://kireji.app/demo/past_phrasal_verb.txt",
 "https://kireji.app/demo/hello.txt?persons_name": "https://kireji.app/demo/persons_name.txt",
 "https://kireji.app/demo/hello.txt?time_interval": "https://kireji.app/demo/time_interval.txt",
 "https://kireji.app/demo/hello.txt?verb_ending_in_ing": "https://kireji.app/demo/verb_ending_in_ing.txt",
 "https://kireji.app/demo/mood.txt": "glad",
 "https://kireji.app/demo/noun.txt": "website",
 "https://kireji.app/demo/past_phrasal_verb.txt": "stopped by",
 "https://kireji.app/demo/persons_name.txt": "stranger",
 "https://kireji.app/demo/time_interval.txt": "day",
 "https://kireji.app/demo/verb_ending_in_ing.txt": "working",
 "https://kireji.app/favicon.ico?base": "https://core.parts/apple-touch-icon.png",
 "https://kireji.app/?base": "https://pilot.parts/",
 "https://kireji.io/favicon.ico?base": "https://core.parts/apple-touch-icon.png",
 "https://kireji.io/poppable/car.hood": "",
 "https://kireji.io/poppable/champaign.cork": "",
 "https://kireji.io/poppable/forehead.zit": "",
 "https://kireji.io/poppable/party.balloon": "",
 "https://kireji.io/?base": "https://pilot.parts/",
 "https://orenjinari.com/favicon.ico?base": "https://core.parts/apple-touch-icon.png",
 "https://orenjinari.com/?base": "https://pilot.parts/",
 "https://pilot.parts/?layout": "https://pilot.parts/layout.css",
 "https://pilot.parts/?manifest": "https://pilot.parts/manifest.uri",
 "https://pilot.parts/?oncontextmenu": "https://core.parts/oncontextmenu.js",
 "https://pilot.parts/?onpointermove": "https://core.parts/onpointermove.js",
 "https://pilot.parts/?onpointerup": "https://core.parts/onpointerup.js",
 "https://pilot.parts/?onkeyup": "https://core.parts/onkeyup.js",
 "https://pilot.parts/?onkeydown": "https://core.parts/onkeydown.js",
 "https://pilot.parts/context-menu/?layout": "https://pilot.parts/context-menu/layout.css",
 "https://pilot.parts/context-menu/?manifest": "https://pilot.parts/context-menu/manifest.uri",
 "https://pilot.parts/context-menu/?onblur": "https://pilot.parts/context-menu/onblur.js",
 "https://pilot.parts/context-menu/onblur.js": "() => { CORE['https://pilot.parts/context-menu/open.txt'] = 0 }",
 "https://pilot.parts/context-menu/core-item/?layout": "https://pilot.parts/context-menu/core-item/layout.css",
 "https://pilot.parts/context-menu/core-item/layout.css.a.js":
  'return `:host { padding-left: 18px${𝑥.replace("layout.css", "") === ("" + main) ? `; font-weight: 700` : ``} } :host(:hover) { background: rgb(0, 0, 163); color: white } :host::before { content: "${CORE[𝑥.replace("layout.css", "label.txt")]}" }`',
 "https://pilot.parts/context-menu/core-item/layout.css?archive":
  "https://pilot.parts/context-menu/core-item/layout.css.a.js",
 "https://pilot.parts/context-menu/core-item/layout.css?main": "https://pilot.parts/context-menu/main.uri",
 "https://pilot.parts/context-menu/debate/?layout": "https://pilot.parts/context-menu/debate/layout.css",
 "https://pilot.parts/context-menu/debate/label.txt": "Debate",
 "https://pilot.parts/context-menu/debate/layout.css?base": "https://pilot.parts/context-menu/core-item/layout.css",
 "https://pilot.parts/context-menu/download/?layout": "https://pilot.parts/context-menu/download/layout.css",
 "https://pilot.parts/context-menu/download/label.txt": "Download",
 "https://pilot.parts/context-menu/download/layout.css?base": "https://pilot.parts/context-menu/core-item/layout.css",
 "https://pilot.parts/context-menu/layout.css.a.js":
  'const { x, y } = JSON.parse("" + position);\n return `\n :host {\n  display: flex;\n  flex-flow: column nowrap;\n  position: absolute;\n  left: ${x}px;\n  top: ${y}px;\n  user-select: none;\n  line-height: 18px;\n  text-align: left;\n  background: #c3c3c3;\n  box-sizing: border-box;\n  padding: 3px 3px 3px 3px;\n  text-align: left;\n  background: #c3c3c3;\n  min-width: 128px;\n  box-shadow:\n   inset -1px -1px black,\n   inset 1px 1px white,\n   inset -2px -2px #7a7a7a,\n   inset 2px 2px #dbdbdb;\n }`',
 "https://pilot.parts/context-menu/layout.css?archive": "https://pilot.parts/context-menu/layout.css.a.js",
 "https://pilot.parts/context-menu/layout.css?position": "https://pilot.parts/context-menu/position.json",
 "https://pilot.parts/context-menu/locate/?layout": "https://pilot.parts/context-menu/locate/layout.css",
 "https://pilot.parts/context-menu/locate/label.txt": "Locate",
 "https://pilot.parts/context-menu/locate/layout.css?base": "https://pilot.parts/context-menu/core-item/layout.css",
 "https://pilot.parts/context-menu/main.uri": "https://pilot.parts/context-menu/locate/",
 "https://pilot.parts/context-menu/manifest.uri":
  "https://pilot.parts/context-menu/locate/ https://pilot.parts/context-menu/relate/ https://pilot.parts/context-menu/debate/ https://pilot.parts/horizontal-line/ https://pilot.parts/context-menu/download/ https://pilot.parts/context-menu/properties/",
 "https://pilot.parts/context-menu/open-fx.js": "https://pilot.parts/manifest.uri",
 "https://pilot.parts/context-menu/open.txt": "0",
 "https://pilot.parts/context-menu/open.txt?fx": "https://pilot.parts/context-menu/open-fx.js",
 "https://pilot.parts/context-menu/position.json": '{ "x": 120, "y": 70 }',
 "https://pilot.parts/context-menu/position.json?fx": "https://pilot.parts/context-menu/reposition.uri",
 "https://pilot.parts/context-menu/properties/?layout": "https://pilot.parts/context-menu/properties/layout.css",
 "https://pilot.parts/context-menu/properties/label.txt": "Properties",
 "https://pilot.parts/context-menu/properties/layout.css?base": "https://pilot.parts/context-menu/core-item/layout.css",
 "https://pilot.parts/context-menu/relate/?layout": "https://pilot.parts/context-menu/relate/layout.css",
 "https://pilot.parts/context-menu/relate/label.txt": "Relate",
 "https://pilot.parts/context-menu/relate/layout.css?base": "https://pilot.parts/context-menu/core-item/layout.css",
 "https://pilot.parts/context-menu/reposition.uri": "https://pilot.parts/context-menu/layout.css",
 "https://pilot.parts/desktop/?": "https://pilot.parts/desktop/parts.txt",
 "https://pilot.parts/desktop/parts.txt": "layout onfocus",
 "https://pilot.parts/desktop/?layout": "https://pilot.parts/desktop/layout.css",
 "https://pilot.parts/desktop/?onfocus": "https://pilot.parts/desktop/onfocus.js",
 "https://pilot.parts/desktop/layout.css?archive": "https://pilot.parts/desktop/layout.css.a.js",
 "https://pilot.parts/desktop/layout.css?background": "https://pilot.parts/desktop/background.txt",
 "https://pilot.parts/desktop/background.txt?archive": "https://pilot.parts/desktop/background.txt.a.js",
 "https://pilot.parts/desktop/background.txt.a.js": "return `#377f7f`",
 "https://pilot.parts/desktop/layout.css.a.js":
  "return `\n  :host {\n   position: relative;\n   width: 100%;\n   box-sizing: border-box;\n   height: 100%;\n   margin: 0;\n   background: ${background};\n  }`",
 "https://pilot.parts/desktop/onfocus.a.js":
  '\n  const has_active = "" + selected !== "-1", active_url = selected.headerOf().href;\n  return `\n   () => {\n    ${has_active ? `CORE["${active_url}"] = "-1"` : ``}\n   }\n  `',
 "https://pilot.parts/desktop/onfocus.js?archive": "https://pilot.parts/desktop/onfocus.a.js",
 "https://pilot.parts/desktop/onfocus.js?selected": "https://pilot.parts/taskbar/selected.txt",
 "https://pilot.parts/favicon.ico?base": "https://core.parts/apple-touch-icon.png",
 "https://pilot.parts/horizontal-line/?layout": "https://pilot.parts/horizontal-line/layout.css",
 "https://pilot.parts/horizontal-line/layout.css":
  "\n  :host {\n   height: 2px;\n   border-top: 1px solid #7f7f7f;\n   border-bottom: 1px solid white;\n   box-sizing: border-box;\n   margin: 4px 0;\n  }",
 "https://pilot.parts/icons/application-json-icon/?layout":
  "https://pilot.parts/icons/application-json-icon/layout.css",
 "https://pilot.parts/icons/application-json-icon/layout.css.a.js":
  "return layout([220, 220, 255], '\\u{1F4C4}', 'json', [1/7, 1/16, 1/8])",
 "https://pilot.parts/icons/application-json-icon/layout.css?archive":
  "https://pilot.parts/icons/application-json-icon/layout.css.a.js",
 "https://pilot.parts/icons/application-json-icon/layout.css?layout": "https://pilot.parts/icons/layout.js",
 "https://pilot.parts/icons/application-wasm-icon/?layout":
  "https://pilot.parts/icons/application-wasm-icon/layout.css",
 "https://pilot.parts/icons/application-wasm-icon/layout.css.a.js": "return layout([0, 0, 0, 0], '\\u{1F4E6}')",
 "https://pilot.parts/icons/application-wasm-icon/layout.css?archive":
  "https://pilot.parts/icons/application-wasm-icon/layout.css.a.js",
 "https://pilot.parts/icons/application-wasm-icon/layout.css?layout": "https://pilot.parts/icons/layout.js",
 "https://pilot.parts/icons/domain-icon/?layout": "https://pilot.parts/icons/domain-icon/layout.css",
 "https://pilot.parts/icons/domain-icon/layout.css":
  "\n  :host {\n   --size: 16px;\n   width: var(--size);\n   height: var(--size);\n   font-size: var(--size);\n   line-height: var(--size);\n  }\n  :host::before {\n   content: '🗄';\n  }",
 "https://pilot.parts/icons/folder-icon/?layout": "https://pilot.parts/icons/folder-icon/layout.css",
 "https://pilot.parts/icons/folder-icon/layout.css":
  "\n  :host {\n   --size: 16px;\n   width: var(--size);\n   height: var(--size);\n   font-size: var(--size);\n   line-height: var(--size);\n  }\n  :host::before {\n   content: '📁';\n  }",
 "https://pilot.parts/icons/image-png-icon/?layout": "https://pilot.parts/icons/image-png-icon/layout.css",
 "https://pilot.parts/icons/image-png-icon/layout.css.a.js": "return layout([255, 127, 0], '\\u{1F4C4}', 'png')",
 "https://pilot.parts/icons/image-png-icon/layout.css?archive":
  "https://pilot.parts/icons/image-png-icon/layout.css.a.js",
 "https://pilot.parts/icons/image-png-icon/layout.css?layout": "https://pilot.parts/icons/layout.js",
 "https://pilot.parts/icons/image-vnd-microsoft-icon-icon/?layout":
  "https://pilot.parts/icons/image-vnd-microsoft-icon-icon/layout.css",
 "https://pilot.parts/icons/image-vnd-microsoft-icon-icon/layout.css.a.js":
  "return layout([127, 127, 127, 0.25], '\\u{1F4C4}', 'ico', [0.1, 0.1, 0.1])",
 "https://pilot.parts/icons/image-vnd-microsoft-icon-icon/layout.css?archive":
  "https://pilot.parts/icons/image-vnd-microsoft-icon-icon/layout.css.a.js",
 "https://pilot.parts/icons/image-vnd-microsoft-icon-icon/layout.css?layout": "https://pilot.parts/icons/layout.js",
 "https://pilot.parts/icons/kireji-icon/?layout": "https://pilot.parts/icons/kireji-icon/layout.css",
 "https://pilot.parts/icons/kireji-icon/layout.css":
  "\n  :host {\n   --size: 16px;\n   width: var(--size);\n   height: var(--size);\n   font-size: var(--size);\n   line-height: var(--size);\n  }\n  :host::before {\n   content: '🔗';\n  }",
 "https://pilot.parts/icons/layout.js":
  "\n  ([bgr, bgg, bgb, bga = 0.8], c, ext, [r = 0, g = 0, b = 0, a = 1] = []) => {\n   return `\n    :host {\n     --rgb-bg: rgba(${bgr}, ${bgg}, ${bgb}, ${bga});\n     --rgb: ${r}, ${g}, ${b};\n     --character: '${c}';\n     --size: 16px;\n     --unit: calc(var(--size) / 16);\n     color: rgba(var(--rgb), ${a});\n     position: relative;\n     width: var(--size);\n     height: var(--size);\n    }\n    :host::before,\n    :host::after {\n     border-radius: calc(var(--size) / 6);\n    }\n    :host::before {\n     content: var(--character);\n     font-size: var(--size);\n     line-height: var(--size);\n    }\n    :host::after {\n     box-shadow: 0 0 0 var(--unit) rgba(var(--rgb), ${a/2});\n     background: var(--rgb-bg);\n     position: absolute;\n     bottom: var(--unit);\n     right: 0;${ext ? `\n     content: '${ext}';` : ``}\n     font: 400 calc(var(--size) / 3) / calc(var(--size) / 3) monospace;\n     padding: var(--unit);\n    }\n   `\n  }",
 "https://pilot.parts/icons/physical-blemish-icon/?layout":
  "https://pilot.parts/icons/physical-blemish-icon/layout.css",
 "https://pilot.parts/icons/physical-blemish-icon/layout.css.a.js":
  "return layout([255, 127, 127, 0.25], '🌋', undefined, [0.1, 0.1, 0.1])",
 "https://pilot.parts/icons/physical-blemish-icon/layout.css?archive":
  "https://pilot.parts/icons/physical-blemish-icon/layout.css.a.js",
 "https://pilot.parts/icons/physical-blemish-icon/layout.css?layout": "https://pilot.parts/icons/layout.js",
 "https://pilot.parts/icons/physical-car-part-icon/?layout":
  "https://pilot.parts/icons/physical-car-part-icon/layout.css",
 "https://pilot.parts/icons/physical-car-part-icon/layout.css.a.js":
  "return layout([255, 127, 127, 0.25], '🚘', undefined, [0.1, 0.1, 0.1])",
 "https://pilot.parts/icons/physical-car-part-icon/layout.css?archive":
  "https://pilot.parts/icons/physical-car-part-icon/layout.css.a.js",
 "https://pilot.parts/icons/physical-car-part-icon/layout.css?layout": "https://pilot.parts/icons/layout.js",
 "https://pilot.parts/icons/physical-drink-stopper-icon/?layout":
  "https://pilot.parts/icons/physical-drink-stopper-icon/layout.css",
 "https://pilot.parts/icons/physical-drink-stopper-icon/layout.css.a.js":
  "return layout([127, 127, 127, 0.25], '🍾', undefined, [0.1, 0.1, 0.1])",
 "https://pilot.parts/icons/physical-drink-stopper-icon/layout.css?archive":
  "https://pilot.parts/icons/physical-drink-stopper-icon/layout.css.a.js",
 "https://pilot.parts/icons/physical-drink-stopper-icon/layout.css?layout": "https://pilot.parts/icons/layout.js",
 "https://pilot.parts/icons/physical-toy-icon/?layout": "https://pilot.parts/icons/physical-toy-icon/layout.css",
 "https://pilot.parts/icons/physical-toy-icon/layout.css.a.js":
  "return layout([255, 127, 127, 0.25], '🎈', undefined, [0.1, 0.1, 0.1])",
 "https://pilot.parts/icons/physical-toy-icon/layout.css?archive":
  "https://pilot.parts/icons/physical-toy-icon/layout.css.a.js",
 "https://pilot.parts/icons/physical-toy-icon/layout.css?layout": "https://pilot.parts/icons/layout.js",
 "https://pilot.parts/icons/protocol-icon/?layout": "https://pilot.parts/icons/protocol-icon/layout.css",
 "https://pilot.parts/icons/protocol-icon/layout.css":
  "\n  :host {\n   --size: 16px;\n   width: var(--size);\n   height: var(--size);\n   font-size: var(--size);\n   line-height: var(--size);\n  }\n  :host::before {\n   content: '⭄';\n  }",
 "https://pilot.parts/icons/text-css-icon/?layout": "https://pilot.parts/icons/text-css-icon/layout.css",
 "https://pilot.parts/icons/text-css-icon/layout.css.a.js": "return layout([0, 255, 255], '\\u{1F4C4}', 'css')",
 "https://pilot.parts/icons/text-css-icon/layout.css?archive":
  "https://pilot.parts/icons/text-css-icon/layout.css.a.js",
 "https://pilot.parts/icons/text-css-icon/layout.css?layout": "https://pilot.parts/icons/layout.js",
 "https://pilot.parts/icons/text-html-icon/?layout": "https://pilot.parts/icons/text-html-icon/layout.css",
 "https://pilot.parts/icons/text-html-icon/layout.css.a.js": "return layout([255, 255, 255], '\\u{1F4C4}', 'html')",
 "https://pilot.parts/icons/text-html-icon/layout.css?archive":
  "https://pilot.parts/icons/text-html-icon/layout.css.a.js",
 "https://pilot.parts/icons/text-html-icon/layout.css?layout": "https://pilot.parts/icons/layout.js",
 "https://pilot.parts/icons/text-javascript-icon/?layout": "https://pilot.parts/icons/text-javascript-icon/layout.css",
 "https://pilot.parts/icons/text-javascript-icon/layout.css.a.js":
  "return layout([255, 127, 127, 0.7], '\\u{1F4C4}', 'js', [0.4])",
 "https://pilot.parts/icons/text-javascript-icon/layout.css?archive":
  "https://pilot.parts/icons/text-javascript-icon/layout.css.a.js",
 "https://pilot.parts/icons/text-javascript-icon/layout.css?layout": "https://pilot.parts/icons/layout.js",
 "https://pilot.parts/icons/text-plain-icon/?layout": "https://pilot.parts/icons/text-plain-icon/layout.css",
 "https://pilot.parts/icons/text-plain-icon/layout.css":
  "\n  :host {\n   --size: 16px;\n   width: var(--size);\n   height: var(--size) }\n  :host::before {\n   content: '📄';\n   font-size: var(--size);\n   line-height: var(--size)\n  }",
 "https://pilot.parts/icons/text-uri-list-icon/?layout": "https://pilot.parts/icons/text-uri-list-icon/layout.css",
 "https://pilot.parts/icons/text-uri-list-icon/layout.cs?layout": "https://pilot.parts/icons/layout.js",
 "https://pilot.parts/icons/text-uri-list-icon/layout.css":
  "\n  :host {\n   --rgba: rgba(0, 0, 0, 0.8);\n   --character: '📄';\n   --size: 16px;\n   color: #ffff3f;\n   position: relative;\n   width: 16px;\n   height: 16px;\n  }\n  :host::before,\n  :host::after {\n   border-radius: calc(var(--size) / 6);\n  }\n  :host::before {\n   content: var(--character);\n   font-size: var(--size);\n   line-height: var(--size);\n  }\n  :host::after {\n   box-shadow: 0 0 0 calc(var(--size) / 16) #ffff3f;\n   background: var(--rgba);\n   position: absolute;\n   bottom: 0;\n   right: 0;\n   content: 'uri';\n   font: 400 calc(var(--size) / 3) / calc(var(--size) / 3) monospace;\n   padding: calc(var(--size) / 16);\n  }",
 "https://pilot.parts/icons/text-uri-list-icon/layout.css.a.js":
  'return layout([0, 0, 0], "\\u{1F4C4}", "uri", [1, 1, 0.3])',
 "https://pilot.parts/icons/text-uri-list-icon/layout.css?archive":
  "https://pilot.parts/icons/text-uri-list-icon/layout.css.a.js",
 "https://pilot.parts/layout.css.a.js":
  "\n  return `\n   :host {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    box-sizing: border-box;\n    height: 100%;\n    margin: 0;\n    display: grid;\n    grid-template-rows: 1fr ${height};\n    font: 11px / 16px sans-serif;\n   }\n  `",
 "https://pilot.parts/layout.css?archive": "https://pilot.parts/layout.css.a.js",
 "https://pilot.parts/layout.css?height": "https://pilot.parts/taskbar/css-height.txt",
 "https://pilot.parts/letters/capital-f/?layout": "https://pilot.parts/letters/capital-f/layout.css",
 "https://pilot.parts/letters/capital-f/layout.css": '\n  :host::before {\n   content: "F"\n  }',
 "https://pilot.parts/letters/lowercase-e/?layout": "https://pilot.parts/letters/lowercase-e/layout.css",
 "https://pilot.parts/letters/lowercase-e/layout.css": ':host::before {\n   content: "e"\n  }',
 "https://pilot.parts/letters/lowercase-i/?layout": "https://pilot.parts/letters/lowercase-i/layout.css",
 "https://pilot.parts/letters/lowercase-i/layout.css": ':host::before {\n   content: "i"\n  }',
 "https://pilot.parts/letters/lowercase-l/?layout": "https://pilot.parts/letters/lowercase-l/layout.css",
 "https://pilot.parts/letters/lowercase-l/layout.css": ':host::before {\n   content: "l"\n  }',
 "https://pilot.parts/manifest.uri.a.js":
  '\n  const\n   urls = ["https://pilot.parts/desktop/"],\n   windows_string = "" + windows,\n   list = windows_string ? windows_string.split(" ").forEach(url => {\n    if (("" + CORE[url + "minimized.txt"]) === "0") urls.push(url)\n   }) : []\n  urls.push("https://pilot.parts/taskbar/");\n  if (""+start_menu === "1") urls.push(\n   "https://pilot.parts/taskbar/start-menu/"\n  );\n  if (""+context_menu === "1") urls.push(\n   "https://pilot.parts/context-menu/"\n  );\n  return urls.join(" ")',
 "https://pilot.parts/manifest.uri?archive": "https://pilot.parts/manifest.uri.a.js",
 "https://pilot.parts/manifest.uri?context_menu": "https://pilot.parts/context-menu/open.txt",
 "https://pilot.parts/manifest.uri?start_menu": "https://pilot.parts/start-menu/open.txt",
 "https://pilot.parts/manifest.uri?windows": "https://pilot.parts/windows.uri",
 "https://pilot.parts/programs/answer/app-icon/?layout": "https://pilot.parts/programs/answer/app-icon/layout.css",
 "https://pilot.parts/programs/answer/app-icon/character.txt": "☏",
 "https://pilot.parts/programs/answer/app-icon/layout.css?character":
  "https://pilot.parts/programs/answer/app-icon/character.txt",
 "https://pilot.parts/programs/answer/app-icon/layout.css?archive":
  "https://pilot.parts/programs/prototype/app-icon/layout.css.a.js",
 "https://pilot.parts/programs/answer/app-label/?layout": "https://pilot.parts/programs/answer/app-label/layout.css",
 "https://pilot.parts/programs/answer/app-label/label.txt": "Answer Call",
 "https://pilot.parts/programs/answer/app-label/layout.css?archive":
  "https://pilot.parts/programs/prototype/app-label/layout.css.a.js",
 "https://pilot.parts/programs/answer/app-label/layout.css?label":
  "https://pilot.parts/programs/answer/app-label/label.txt",
 "https://pilot.parts/programs/answer/connection/answer.txt": "",
 "https://pilot.parts/programs/answer/connection/answered.txt": "0",
 "https://pilot.parts/programs/answer/connection/call.txt": "",
 "https://pilot.parts/programs/answer/connection/call.txt?fx":
  "https://pilot.parts/programs/answer/window/panel/call/change.uri",
 "https://pilot.parts/programs/answer/task/?layout": "https://pilot.parts/programs/answer/task/layout.css",
 "https://pilot.parts/programs/answer/task/?manifest": "https://pilot.parts/programs/answer/task/manifest.uri",
 "https://pilot.parts/programs/answer/task/?onpointerdown": "https://pilot.parts/programs/answer/task/onpointerdown.js",
 "https://pilot.parts/programs/answer/task/datum.txt": "https://pilot.parts/programs/answer/task/",
 "https://pilot.parts/programs/answer/task/index.txt?archive":
  "https://pilot.parts/programs/locate/task/index.txt.a.js",
 "https://pilot.parts/programs/answer/task/index.txt?datum": "https://pilot.parts/programs/answer/task/datum.txt",
 "https://pilot.parts/programs/answer/task/index.txt?fx": "https://pilot.parts/programs/answer/task/index/fx.uri",
 "https://pilot.parts/programs/answer/task/index.txt?tasks": "https://pilot.parts/tasks.uri",
 "https://pilot.parts/programs/answer/task/index/fx.uri": "https://pilot.parts/programs/answer/window/active.txt",
 "https://pilot.parts/programs/answer/task/layout.css?archive":
  "https://pilot.parts/programs/relate/task/layout.css.a.js",
 "https://pilot.parts/programs/answer/task/layout.css?open": "https://pilot.parts/programs/answer/window/active.txt",
 "https://pilot.parts/programs/answer/task/manifest.uri":
  "https://pilot.parts/programs/answer/app-icon/ https://pilot.parts/programs/answer/app-label/",
 "https://pilot.parts/programs/answer/task/manifest.uri?open": "https://pilot.parts/programs/answer/window/active.txt",
 "https://pilot.parts/programs/answer/task/onpointerdown.js?active":
  "https://pilot.parts/programs/answer/window/active.txt",
 "https://pilot.parts/programs/answer/task/onpointerdown.js?archive":
  "https://pilot.parts/programs/relate/task/onpointerdown.a.js",
 "https://pilot.parts/programs/answer/task/onpointerdown.js?minimized":
  "https://pilot.parts/programs/answer/window/minimized.txt",
 "https://pilot.parts/programs/answer/task/onpointerdown.js?task": "https://pilot.parts/programs/answer/task/",
 "https://pilot.parts/programs/answer/task/onpointerdown.js?window": "https://pilot.parts/programs/answer/window/",
 "https://pilot.parts/programs/answer/task/open/fx.uri":
  "https://pilot.parts/programs/answer/task/layout.css https://pilot.parts/taskbar/selected.txt https://pilot.parts/programs/answer/window/layout.css https://pilot.parts/programs/answer/task/onpointerdown.js",
 "https://pilot.parts/programs/answer/window/?layout": "https://pilot.parts/programs/answer/window/layout.css",
 "https://pilot.parts/programs/answer/window/?manifest": "https://pilot.parts/programs/answer/window/manifest.uri",
 "https://pilot.parts/programs/answer/window/?onfocus": "https://pilot.parts/programs/answer/window/onfocus.js",
 "https://pilot.parts/programs/answer/window/active.txt?archive":
  "https://pilot.parts/programs/relate/window/active.txt.a.js",
 "https://pilot.parts/programs/answer/window/active.txt?fx": "https://pilot.parts/programs/answer/task/open/fx.uri",
 "https://pilot.parts/programs/answer/window/active.txt?index": "https://pilot.parts/programs/answer/task/index.txt",
 "https://pilot.parts/programs/answer/window/active.txt?minimized":
  "https://pilot.parts/programs/answer/window/minimized.txt",
 "https://pilot.parts/programs/answer/window/active.txt?selected": "https://pilot.parts/taskbar/selected.txt",
 "https://pilot.parts/programs/answer/window/controls/?layout":
  "https://pilot.parts/programs/answer/window/controls/layout.css",
 "https://pilot.parts/programs/answer/window/controls/?manifest":
  "https://pilot.parts/programs/answer/window/controls/manifest.uri",
 "https://pilot.parts/programs/answer/window/controls/exit-button/?layout":
  "https://pilot.parts/programs/answer/window/controls/exit-button/layout.css",
 "https://pilot.parts/programs/answer/window/controls/exit-button/?onclick":
  "https://pilot.parts/programs/answer/window/controls/exit-button/onclick.js",
 "https://pilot.parts/programs/answer/window/controls/exit-button/?onpointerdown":
  "https://pilot.parts/programs/answer/window/controls/exit-button/onpointerdown.js",
 "https://pilot.parts/programs/answer/window/controls/exit-button/down-fx.uri":
  "https://pilot.parts/programs/answer/window/controls/exit-button/layout.css",
 "https://pilot.parts/programs/answer/window/controls/exit-button/down.txt": "0",
 "https://pilot.parts/programs/answer/window/controls/exit-button/down.txt?fx":
  "https://pilot.parts/programs/answer/window/controls/exit-button/down-fx.uri",
 "https://pilot.parts/programs/answer/window/controls/exit-button/layout.css?archive":
  "https://pilot.parts/programs/relate/window/controls/exit-button/layout.css.a.js",
 "https://pilot.parts/programs/answer/window/controls/exit-button/layout.css?down":
  "https://pilot.parts/programs/answer/window/controls/exit-button/down.txt",
 "https://pilot.parts/programs/answer/window/controls/exit-button/onclick.js?archive":
  "https://core.parts/behaviors/window-close.a.js",
 "https://pilot.parts/programs/answer/window/controls/exit-button/onclick.js?task":
  "https://pilot.parts/programs/answer/task/",
 "https://pilot.parts/programs/answer/window/controls/exit-button/onclick.js?window":
  "https://pilot.parts/programs/answer/window/",
 "https://pilot.parts/programs/answer/window/controls/exit-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/answer/window/controls/exit-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/answer/window/controls/exit-button/release.js'\n  }",
 "https://pilot.parts/programs/answer/window/controls/exit-button/release.js":
  "e => { CORE['https://pilot.parts/programs/answer/window/controls/exit-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/answer/window/controls/layout.css":
  "\n  :host {\n   display: flex;\n   flex-flow: row nowrap\n  }",
 "https://pilot.parts/programs/answer/window/controls/manifest.uri":
  "https://pilot.parts/programs/answer/window/controls/minimize-button/ https://pilot.parts/programs/answer/window/controls/exit-button/",
 "https://pilot.parts/programs/answer/window/controls/minimize-button/?layout":
  "https://pilot.parts/programs/answer/window/controls/minimize-button/layout.css",
 "https://pilot.parts/programs/answer/window/controls/minimize-button/?onclick":
  "https://pilot.parts/programs/answer/window/controls/minimize-button/onclick.js",
 "https://pilot.parts/programs/answer/window/controls/minimize-button/?onpointerdown":
  "https://pilot.parts/programs/answer/window/controls/minimize-button/onpointerdown.js",
 "https://pilot.parts/programs/answer/window/controls/minimize-button/down-fx.uri":
  "https://pilot.parts/programs/answer/window/controls/minimize-button/layout.css",
 "https://pilot.parts/programs/answer/window/controls/minimize-button/down.txt": "0",
 "https://pilot.parts/programs/answer/window/controls/minimize-button/down.txt?fx":
  "https://pilot.parts/programs/answer/window/controls/minimize-button/down-fx.uri",
 "https://pilot.parts/programs/answer/window/controls/minimize-button/layout.css?archive":
  "https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css.a.js",
 "https://pilot.parts/programs/answer/window/controls/minimize-button/layout.css?down":
  "https://pilot.parts/programs/answer/window/controls/minimize-button/down.txt",
 "https://pilot.parts/programs/answer/window/controls/minimize-button/onclick.js":
  "()=>{CORE['https://pilot.parts/programs/answer/window/minimized.txt'] = '1'\n  }",
 "https://pilot.parts/programs/answer/window/controls/minimize-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/answer/window/controls/minimize-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/answer/window/controls/minimize-button/release.js'\n  }",
 "https://pilot.parts/programs/answer/window/controls/minimize-button/release.js":
  "e => { CORE['https://pilot.parts/programs/answer/window/controls/minimize-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/answer/window/layout.css?active":
  "https://pilot.parts/programs/answer/window/active.txt",
 "https://pilot.parts/programs/answer/window/layout.css?archive":
  "https://pilot.parts/programs/welcome/window/layout.css.a.js",
 "https://pilot.parts/programs/answer/window/layout.css?position":
  "https://pilot.parts/programs/answer/window/position.json",
 "https://pilot.parts/programs/answer/window/manifest.uri.a.js":
  'const [title_url, panel_url, transform_url, position_url] = [title, panel, transform_path, position].map(x => x.headerOf().href)\nconst transform_urls = transform(transform_url, position_url, "", title_url);\nconst urlSet = [title_url, panel_url]\nif (transform_urls) urlSet.push(transform_urls)\nreturn urlSet.join(" ")',
 "https://pilot.parts/programs/answer/window/manifest.uri?archive":
  "https://pilot.parts/programs/answer/window/manifest.uri.a.js",
 "https://pilot.parts/programs/answer/window/manifest.uri?panel": "https://pilot.parts/programs/answer/window/panel/",
 "https://pilot.parts/programs/answer/window/manifest.uri?position":
  "https://pilot.parts/programs/answer/window/position.json",
 "https://pilot.parts/programs/answer/window/manifest.uri?title":
  "https://pilot.parts/programs/answer/window/title-bar/",
 "https://pilot.parts/programs/answer/window/manifest.uri?transform":
  "https://core.parts/components/transform/construct.js",
 "https://pilot.parts/programs/answer/window/manifest.uri?transform_path":
  "https://pilot.parts/programs/answer/window/transform/",
 "https://pilot.parts/programs/answer/window/minimized.txt": "0",
 "https://pilot.parts/programs/answer/window/minimized.txt?fx":
  "https://pilot.parts/programs/answer/window/minimized/fx.uri",
 "https://pilot.parts/programs/answer/window/minimized/fx.uri":
  "https://pilot.parts/manifest.uri https://pilot.parts/programs/answer/window/active.txt https://pilot.parts/programs/answer/task/onpointerdown.js",
 "https://pilot.parts/programs/answer/window/onfocus.js?active":
  "https://pilot.parts/programs/answer/window/active.txt",
 "https://pilot.parts/programs/answer/window/onfocus.js?archive": "https://core.parts/behaviors/window-focus.a.js",
 "https://pilot.parts/programs/answer/window/onfocus.js?window": "https://pilot.parts/programs/answer/window/",
 "https://pilot.parts/programs/answer/window/panel/?layout":
  "https://pilot.parts/programs/answer/window/panel/layout.css",
 "https://pilot.parts/programs/answer/window/panel/?manifest":
  "https://pilot.parts/programs/answer/window/panel/manifest.uri",
 "https://pilot.parts/programs/answer/window/panel/call/change.uri":
  "https://pilot.parts/programs/answer/window/panel/call/layout.css https://pilot.parts/programs/answer/window/panel/menu/manifest.uri",
 "https://pilot.parts/programs/answer/window/panel/heading/?layout":
  "https://pilot.parts/programs/answer/window/panel/heading/layout.css",
 "https://pilot.parts/programs/answer/window/panel/heading/layout.css":
  ':host { display: flex; flex-flow: row nowrap; font-size: 24px; line-height: 24px; } :host::before { content: "Answer Call\\00a0"; font-weight: 300; }',
 "https://pilot.parts/programs/answer/window/panel/layout.css":
  '\n  :host {\n   height: 100%;\n   display: grid;\n   padding: 12px;\n   gap: 12px;\n   grid-template-columns: 1fr 100px;\n   grid-template-rows: 24px 1fr;\n   grid-template-areas:\n    "head head"\n    "answer btns";\n  }\n  heading- {\n   grid-area: head;\n  }',
 "https://pilot.parts/programs/answer/window/panel/manifest.uri":
  "https://pilot.parts/programs/answer/window/panel/heading/ https://pilot.parts/programs/answer/window/panel/menu/",
 "https://pilot.parts/programs/answer/window/panel/menu/?base": "",
 "https://pilot.parts/programs/answer/window/panel/menu/?layout":
  "https://pilot.parts/programs/invite/window/panel/menu/layout.css",
 "https://pilot.parts/programs/answer/window/panel/menu/?manifest":
  "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri",
 "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri.a.js":
  'console.log("answer manifest")\nconst\n common_url = "https://pilot.parts/programs/answer/window/panel/menu/",\n buttons = [],\n call_string = "" + call;\n\nif (call_string) {\n if ("" + answered === "1") return "";\n \n const remote = new RTCPeerConnection();\n remote.onicecandidate = () => CORE[answer.headerOf().href] = JSON.stringify(remote.localDescription)\n remote.oniceconnectionstatechange = () => console.log("remote connection", remote.connectionState)\n remote.onicegatheringstatechange = () => console.log("remote ice gathering", remote.iceGatheringState)\n remote.onsignalingstatechange = () => console.log("remote signaling", remote.signalingState)\n remote.ondatachannel = e => {\n  e.channel.onmessage = e => console.log(e.target.label + " message => " + JSON.stringify(e.data))\n  e.channel.onclose = e => console.log(e.target.label + " closed!", remote.connectionState)\n  e.channel.onopen = e => {\n   close_window()\n   CORE["https://pilot.parts/programs/answer/window/panel/menu/manifest.uri"] = ""\n   CORE[call.headerOf().href] = ""\n   CORE[answer.headerOf().href] = ""\n   console.log(e.target.label + " opened!", "TODO: add channel to view, garbage collect and reset for next peer")\n  }\n }\n remote.setRemoteDescription(JSON.parse(call_string)).then(() => remote.createAnswer().then(a => { remote.setLocalDescription(a); CORE[answered.headerOf().href] = "1" }))\n buttons.push([\n  common_url + "copy/",\n  ":host::before { content: \\\'Copy Answer\\\'; width: 100%; }",\n  "",\n  `() => { const x = ""+CORE["${answer.headerOf().href}"]; navigator.clipboard.writeText(x) }`,\n  // TODO: copy, paste and cut buttons. To instantiate one of these buttons, just set the base along with a single uri file pointing to the file that is being copied from, pasted to or cut.\n ])\n} else {\n buttons.push([\n  common_url + "paste/",\n  ":host::before { content: \\\'Paste Call\\\'; width: 100%; }",\n  "",\n  `() => navigator.clipboard.readText().then(x => CORE["${call.headerOf().href}"] = x )`,\n ])\n}\n\nreturn buttons.map(config => { button(...config); return config[0] }).join(" ")',
 "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri?answer":
  "https://pilot.parts/programs/answer/connection/answer.txt",
 "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri?answered":
  "https://pilot.parts/programs/answer/connection/answered.txt",
 "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri?button":
  "https://core.parts/components/button/construct.js",
 "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri?call":
  "https://pilot.parts/programs/answer/connection/call.txt",
 "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri?close_window":
  "https://pilot.parts/programs/answer/window/controls/exit-button/onclick.js",
 "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri?archive":
  "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri.a.js",
 "https://pilot.parts/programs/answer/window/panel/menu/manifest.uri?pickup":
  "https://pilot.parts/programs/answer/connection/pickup.js",
 "https://pilot.parts/programs/answer/window/position.json":
  '\n  {\n   "x": 72,\n   "y": 44,\n   "w": 350,\n   "h": 250,\n   "range": {\n    "x": [-64, 512],\n    "y": [-2, 256],\n    "w": [96, 256],\n    "h": [64, 128]\n   }\n  }',
 "https://pilot.parts/programs/answer/window/position.json?fx":
  "https://pilot.parts/programs/answer/window/position/fx.uri",
 "https://pilot.parts/programs/answer/window/position/fx.uri": "https://pilot.parts/programs/answer/window/layout.css",
 "https://pilot.parts/programs/answer/window/title-bar/?layout":
  "https://pilot.parts/programs/invite/window/title-bar/layout.css",
 "https://pilot.parts/programs/answer/window/title-bar/?manifest":
  "https://pilot.parts/programs/answer/window/title-bar/manifest.uri",
 "https://pilot.parts/programs/answer/window/title-bar/manifest.uri":
  "https://pilot.parts/programs/answer/app-icon/ https://pilot.parts/programs/answer/app-label/ https://core.parts/flex-spacer/ https://pilot.parts/programs/answer/window/controls/",
 "https://pilot.parts/programs/debate/app-icon/?layout": "https://pilot.parts/programs/debate/app-icon/layout.css",
 "https://pilot.parts/programs/debate/app-icon/layout.css":
  '\n  :host {\n   --size: 16px;\n   width: var(--size);\n   height: var(--size);\n   font-size: var(--size);\n   line-height: var(--size);\n  }\n  :host::before {\n   content: "💬";\n  }',
 "https://pilot.parts/programs/debate/app-label/?layout": "https://pilot.parts/programs/debate/app-label/layout.css",
 "https://pilot.parts/programs/debate/app-label/layout.css":
  '\n  return `:host {\n   margin: 0;\n   height: 16px;\n   vertical-align: center;\n   text-overflow: ellipsis;\n   overflow: hidden;\n  }\n  :host::after {\n   content: "Debate";\n   white-space: nowrap;\n  }`',
 "https://pilot.parts/programs/debate/connection/onstatus.uri":
  "https://pilot.parts/programs/debate/window/panel/status/layout.css",
 "https://pilot.parts/programs/debate/connection/status.txt.a.js": 'return "0"',
 "https://pilot.parts/programs/debate/connection/status.txt?archive":
  "https://pilot.parts/programs/debate/connection/status.txt.a.js",
 "https://pilot.parts/programs/debate/connection/status.txt?fx":
  "https://pilot.parts/programs/debate/connection/onstatus.uri",
 "https://pilot.parts/programs/debate/start-menu-item/?layout":
  "https://pilot.parts/programs/debate/start-menu-item/layout.css",
 "https://pilot.parts/programs/debate/start-menu-item/?manifest":
  "https://pilot.parts/programs/debate/start-menu-item/manifest.uri",
 "https://pilot.parts/programs/debate/start-menu-item/?onclick":
  "https://pilot.parts/programs/debate/task/onpointerdown.js",
 "https://pilot.parts/programs/debate/start-menu-item/app-label/?layout":
  "https://pilot.parts/programs/debate/start-menu-item/app-label/layout.css",
 "https://pilot.parts/programs/debate/start-menu-item/app-label/layout.css":
  ':host::after {\n   height: 24px;\n   content: "Debate";\n  }',
 "https://pilot.parts/programs/debate/start-menu-item/layout.css":
  "\n  :host {\n   position: relative;\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n   padding: 4px 0 }\n  :host(:hover) {\n   background: #00007f;\n   color: white }\n  app-icon {\n   width: 24px;\n   height: 24px;\n   margin: 0 10px;\n   --size: 24px;\n  }",
 "https://pilot.parts/programs/debate/start-menu-item/manifest.uri":
  "https://pilot.parts/programs/debate/app-icon/ https://pilot.parts/programs/debate/start-menu-item/app-label/",
 "https://pilot.parts/programs/debate/task/?layout": "https://pilot.parts/programs/debate/task/layout.css",
 "https://pilot.parts/programs/debate/task/?manifest": "https://pilot.parts/programs/debate/task/manifest.uri",
 "https://pilot.parts/programs/debate/task/?onpointerdown": "https://pilot.parts/programs/debate/task/onpointerdown.js",
 "https://pilot.parts/programs/debate/task/datum.txt": "https://pilot.parts/programs/debate/task/",
 "https://pilot.parts/programs/debate/task/index.txt": "1",
 "https://pilot.parts/programs/debate/task/index.txt?archive":
  "https://pilot.parts/programs/locate/task/index.txt.a.js",
 "https://pilot.parts/programs/debate/task/index.txt?datum": "https://pilot.parts/programs/debate/task/datum.txt",
 "https://pilot.parts/programs/debate/task/index.txt?fx": "https://pilot.parts/programs/debate/task/index/fx.uri",
 "https://pilot.parts/programs/debate/task/index.txt?tasks": "https://pilot.parts/tasks.uri",
 "https://pilot.parts/programs/debate/task/index/fx.uri": "https://pilot.parts/programs/debate/window/active.txt",
 "https://pilot.parts/programs/debate/task/layout.css?archive":
  "https://pilot.parts/programs/relate/task/layout.css.a.js",
 "https://pilot.parts/programs/debate/task/layout.css?open": "https://pilot.parts/programs/debate/window/active.txt",
 "https://pilot.parts/programs/debate/task/manifest.uri":
  "https://pilot.parts/programs/debate/app-icon/ https://pilot.parts/programs/debate/app-label/",
 "https://pilot.parts/programs/debate/task/manifest.uri?open": "https://pilot.parts/programs/debate/window/active.txt",
 "https://pilot.parts/programs/debate/task/onpointerdown.js?active":
  "https://pilot.parts/programs/debate/window/active.txt",
 "https://pilot.parts/programs/debate/task/onpointerdown.js?archive":
  "https://pilot.parts/programs/relate/task/onpointerdown.a.js",
 "https://pilot.parts/programs/debate/task/onpointerdown.js?minimized":
  "https://pilot.parts/programs/debate/window/minimized.txt",
 "https://pilot.parts/programs/debate/task/onpointerdown.js?task": "https://pilot.parts/programs/debate/task/",
 "https://pilot.parts/programs/debate/task/onpointerdown.js?window": "https://pilot.parts/programs/debate/window/",
 "https://pilot.parts/programs/debate/task/open/fx.uri":
  "https://pilot.parts/programs/debate/task/layout.css https://pilot.parts/taskbar/selected.txt https://pilot.parts/programs/debate/window/layout.css https://pilot.parts/programs/debate/task/onpointerdown.js",
 "https://pilot.parts/programs/debate/window/?layout": "https://pilot.parts/programs/debate/window/layout.css",
 "https://pilot.parts/programs/debate/window/?manifest": "https://pilot.parts/programs/debate/window/manifest.uri",
 "https://pilot.parts/programs/debate/window/?onfocus": "https://pilot.parts/programs/debate/window/onfocus.js",
 "https://pilot.parts/programs/debate/window/active.txt": "1",
 "https://pilot.parts/programs/debate/window/active.txt?archive":
  "https://pilot.parts/programs/relate/window/active.txt.a.js",
 "https://pilot.parts/programs/debate/window/active.txt?fx": "https://pilot.parts/programs/debate/task/open/fx.uri",
 "https://pilot.parts/programs/debate/window/active.txt?index": "https://pilot.parts/programs/debate/task/index.txt",
 "https://pilot.parts/programs/debate/window/active.txt?minimized":
  "https://pilot.parts/programs/debate/window/minimized.txt",
 "https://pilot.parts/programs/debate/window/active.txt?selected": "https://pilot.parts/taskbar/selected.txt",
 "https://pilot.parts/programs/debate/window/controls/?layout":
  "https://pilot.parts/programs/debate/window/controls/layout.css",
 "https://pilot.parts/programs/debate/window/controls/?manifest":
  "https://pilot.parts/programs/debate/window/controls/manifest.uri",
 "https://pilot.parts/programs/debate/window/controls/exit-button/?layout":
  "https://pilot.parts/programs/debate/window/controls/exit-button/layout.css",
 "https://pilot.parts/programs/debate/window/controls/exit-button/?onclick":
  "https://pilot.parts/programs/debate/window/controls/exit-button/onclick.js",
 "https://pilot.parts/programs/debate/window/controls/exit-button/?onpointerdown":
  "https://pilot.parts/programs/debate/window/controls/exit-button/onpointerdown.js",
 "https://pilot.parts/programs/debate/window/controls/exit-button/down-fx.uri":
  "https://pilot.parts/programs/debate/window/controls/exit-button/layout.css",
 "https://pilot.parts/programs/debate/window/controls/exit-button/down.txt": "0",
 "https://pilot.parts/programs/debate/window/controls/exit-button/down.txt?fx":
  "https://pilot.parts/programs/debate/window/controls/exit-button/down-fx.uri",
 "https://pilot.parts/programs/debate/window/controls/exit-button/layout.css?archive":
  "https://pilot.parts/programs/relate/window/controls/exit-button/layout.css.a.js",
 "https://pilot.parts/programs/debate/window/controls/exit-button/layout.css?down":
  "https://pilot.parts/programs/debate/window/controls/exit-button/down.txt",
 "https://pilot.parts/programs/debate/window/controls/exit-button/onclick.js?archive":
  "https://core.parts/behaviors/window-close.a.js",
 "https://pilot.parts/programs/debate/window/controls/exit-button/onclick.js?task":
  "https://pilot.parts/programs/debate/task/",
 "https://pilot.parts/programs/debate/window/controls/exit-button/onclick.js?window":
  "https://pilot.parts/programs/debate/window/",
 "https://pilot.parts/programs/debate/window/controls/exit-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/debate/window/controls/exit-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/debate/window/controls/exit-button/release.js'\n  }",
 "https://pilot.parts/programs/debate/window/controls/exit-button/release.js":
  "e => { CORE['https://pilot.parts/programs/debate/window/controls/exit-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/debate/window/controls/layout.css":
  "\n  :host {\n   display: flex;\n   flex-flow: row nowrap\n  }",
 "https://pilot.parts/programs/debate/window/controls/manifest.uri.a.js":
  "return `https://pilot.parts/programs/debate/window/controls/minimize-button/ https://pilot.parts/programs/debate/window/controls/${(\"\"+maximized) === '1' ? 'restore' : 'maximize'}-button/ https://pilot.parts/programs/debate/window/controls/exit-button/`",
 "https://pilot.parts/programs/debate/window/controls/manifest.uri?archive":
  "https://pilot.parts/programs/debate/window/controls/manifest.uri.a.js",
 "https://pilot.parts/programs/debate/window/controls/manifest.uri?maximized":
  "https://pilot.parts/programs/debate/window/maximized.txt",
 "https://pilot.parts/programs/debate/window/controls/maximize-button/?layout":
  "https://pilot.parts/programs/debate/window/controls/maximize-button/layout.css",
 "https://pilot.parts/programs/debate/window/controls/maximize-button/?onclick":
  "https://pilot.parts/programs/debate/window/controls/maximize-button/onclick.js",
 "https://pilot.parts/programs/debate/window/controls/maximize-button/?onpointerdown":
  "https://pilot.parts/programs/debate/window/controls/maximize-button/onpointerdown.js",
 "https://pilot.parts/programs/debate/window/controls/maximize-button/down-fx.uri":
  "https://pilot.parts/programs/debate/window/controls/maximize-button/layout.css",
 "https://pilot.parts/programs/debate/window/controls/maximize-button/down.txt": "0",
 "https://pilot.parts/programs/debate/window/controls/maximize-button/down.txt?fx":
  "https://pilot.parts/programs/debate/window/controls/maximize-button/down-fx.uri",
 "https://pilot.parts/programs/debate/window/controls/maximize-button/layout.css.a.js":
  "return `:host {\n   position: relative;\n   width: 16px;\n   height: 14px;\n   background: #c3c3c3;\n   box-shadow: ${(\"\"+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'}\n  }\n  :host::before {\n   --color: black;\n   display: block;\n   position: absolute;\n   content: \"\";\n   width: 9px;\n   height: 9px;\n   top: 2px;\n   left: 3px;\n   box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color) }\n  :host(:hover)::before {\n   --color: blue }`",
 "https://pilot.parts/programs/debate/window/controls/maximize-button/layout.css?archive":
  "https://pilot.parts/programs/debate/window/controls/maximize-button/layout.css.a.js",
 "https://pilot.parts/programs/debate/window/controls/maximize-button/layout.css?down":
  "https://pilot.parts/programs/debate/window/controls/maximize-button/down.txt",
 "https://pilot.parts/programs/debate/window/controls/maximize-button/onclick.js":
  "\n  () => {\n   CORE['https://pilot.parts/programs/debate/window/maximized.txt'] = '1'\n  }",
 "https://pilot.parts/programs/debate/window/controls/maximize-button/onpointerdown.js":
  "\n  e => {\n   e.stopPropagation(); CORE['https://pilot.parts/programs/debate/window/controls/maximize-button/down.txt'] = '1'\n   CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/debate/window/controls/maximize-button/release.js'\n  }",
 "https://pilot.parts/programs/debate/window/controls/maximize-button/release.js":
  "\n  e => {\n   CORE['https://pilot.parts/programs/debate/window/controls/maximize-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/debate/window/controls/minimize-button/?layout":
  "https://pilot.parts/programs/debate/window/controls/minimize-button/layout.css",
 "https://pilot.parts/programs/debate/window/controls/minimize-button/?onclick":
  "https://pilot.parts/programs/debate/window/controls/minimize-button/onclick.js",
 "https://pilot.parts/programs/debate/window/controls/minimize-button/?onpointerdown":
  "https://pilot.parts/programs/debate/window/controls/minimize-button/onpointerdown.js",
 "https://pilot.parts/programs/debate/window/controls/minimize-button/down-fx.uri":
  "https://pilot.parts/programs/debate/window/controls/minimize-button/layout.css",
 "https://pilot.parts/programs/debate/window/controls/minimize-button/down.txt": "0",
 "https://pilot.parts/programs/debate/window/controls/minimize-button/down.txt?fx":
  "https://pilot.parts/programs/debate/window/controls/minimize-button/down-fx.uri",
 "https://pilot.parts/programs/debate/window/controls/minimize-button/layout.css?archive":
  "https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css.a.js",
 "https://pilot.parts/programs/debate/window/controls/minimize-button/layout.css?down":
  "https://pilot.parts/programs/debate/window/controls/minimize-button/down.txt",
 "https://pilot.parts/programs/debate/window/controls/minimize-button/onclick.js":
  "()=>{CORE['https://pilot.parts/programs/debate/window/minimized.txt'] = '1'\n  }",
 "https://pilot.parts/programs/debate/window/controls/minimize-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/debate/window/controls/minimize-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/debate/window/controls/minimize-button/release.js'\n  }",
 "https://pilot.parts/programs/debate/window/controls/minimize-button/release.js":
  "e => { CORE['https://pilot.parts/programs/debate/window/controls/minimize-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/debate/window/controls/restore-button/?layout":
  "https://pilot.parts/programs/debate/window/controls/restore-button/layout.css",
 "https://pilot.parts/programs/debate/window/controls/restore-button/?onclick":
  "https://pilot.parts/programs/debate/window/controls/restore-button/onclick.js",
 "https://pilot.parts/programs/debate/window/controls/restore-button/?onpointerdown":
  "https://pilot.parts/programs/debate/window/controls/restore-button/onpointerdown.js",
 "https://pilot.parts/programs/debate/window/controls/restore-button/down-fx.uri":
  "https://pilot.parts/programs/debate/window/controls/restore-button/layout.css",
 "https://pilot.parts/programs/debate/window/controls/restore-button/down.txt": "0",
 "https://pilot.parts/programs/debate/window/controls/restore-button/down.txt?fx":
  "https://pilot.parts/programs/debate/window/controls/restore-button/down-fx.uri",
 "https://pilot.parts/programs/debate/window/controls/restore-button/layout.css?archive":
  "https://pilot.parts/programs/locate/window/controls/restore-button/layout.css.a.js",
 "https://pilot.parts/programs/debate/window/controls/restore-button/layout.css?down":
  "https://pilot.parts/programs/debate/window/controls/restore-button/down.txt",
 "https://pilot.parts/programs/debate/window/controls/restore-button/onclick.js":
  "()=>CORE['https://pilot.parts/programs/debate/window/maximized.txt'] = '0'",
 "https://pilot.parts/programs/debate/window/controls/restore-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/debate/window/controls/restore-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/debate/window/controls/restore-button/release.js'\n  }",
 "https://pilot.parts/programs/debate/window/controls/restore-button/release.js":
  "e => { CORE['https://pilot.parts/programs/debate/window/controls/restore-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/debate/window/layout.css.a.js":
  '\n  const\n   common = `\n    position: absolute;\n    display: flex;\n    flex-flow: column nowrap;\n    gap: 2px;\n    background: #c3c3c3;\n    box-sizing: border-box;`,\n   titlebar = ("" + active) === "1" ? `title-bar {\n    background: rgb(0, 0, 163);\n   }` : ``;\n  if (("" + maximized) === \'1\') {\n   return `\n    :host {\n     position: absolute;\n     top: 0;\n     left: 0;\n     right: 0;\n     bottom: 28px;\n     padding: 2px;\n     ${common}\n    }\n    ${titlebar}`\n  } else {\n   const { x = 0, y = 0, w = 0, h = 0 } = JSON.parse("" + position);\n   return `\n    :host {\n     width: ${w}px;\n     height: ${h}px;\n     left: ${x}px;\n     top: ${y}px;\n     min-height: fit-content;\n     padding: 4px;\n     background: #c3c3c3;\n     box-shadow:\n      inset -1px -1px black,\n      inset 1px 1px #c3c3c3,\n      inset -2px -2px #7a7a7a,\n      inset 2px 2px white,\n      5px 7px 3px #0002;\n     ${common}\n    }\n    ${titlebar}`\n  }',
 "https://pilot.parts/programs/debate/window/layout.css?active":
  "https://pilot.parts/programs/debate/window/active.txt",
 "https://pilot.parts/programs/debate/window/layout.css?archive":
  "https://pilot.parts/programs/debate/window/layout.css.a.js",
 "https://pilot.parts/programs/debate/window/layout.css?maximized":
  "https://pilot.parts/programs/debate/window/maximized.txt",
 "https://pilot.parts/programs/debate/window/layout.css?position":
  "https://pilot.parts/programs/debate/window/position.json",
 "https://pilot.parts/programs/debate/window/manifest.uri.a.js":
  'const  [title_url, panel_url, transform_url, position_url] = [title, panel, transform_path, position].map(x => x.headerOf().href), transform_urls = transform(transform_url, position_url, "nesw", title_url);\nreturn [title_url, panel_url, transform_urls].join(" ")',
 "https://pilot.parts/programs/debate/window/manifest.uri?archive":
  "https://pilot.parts/programs/debate/window/manifest.uri.a.js",
 "https://pilot.parts/programs/debate/window/manifest.uri?panel": "https://pilot.parts/programs/debate/window/panel/",
 "https://pilot.parts/programs/debate/window/manifest.uri?position":
  "https://pilot.parts/programs/debate/window/position.json",
 "https://pilot.parts/programs/debate/window/manifest.uri?title":
  "https://pilot.parts/programs/debate/window/title-bar/",
 "https://pilot.parts/programs/debate/window/manifest.uri?transform":
  "https://core.parts/components/transform/construct.js",
 "https://pilot.parts/programs/debate/window/manifest.uri?transform_path":
  "https://pilot.parts/programs/debate/window/transform/",
 "https://pilot.parts/programs/debate/window/maximized.txt": "0",
 "https://pilot.parts/programs/debate/window/maximized.txt?fx":
  "https://pilot.parts/programs/debate/window/maximized/fx.uri",
 "https://pilot.parts/programs/debate/window/maximized/fx.uri":
  "https://pilot.parts/programs/debate/window/layout.css https://pilot.parts/programs/debate/window/controls/manifest.uri https://pilot.parts/programs/debate/window/title-bar/ondblclick.js",
 "https://pilot.parts/programs/debate/window/minimized.txt": "0",
 "https://pilot.parts/programs/debate/window/minimized.txt?fx":
  "https://pilot.parts/programs/debate/window/minimized/fx.uri",
 "https://pilot.parts/programs/debate/window/minimized/fx.uri":
  "https://pilot.parts/manifest.uri https://pilot.parts/programs/debate/window/active.txt https://pilot.parts/programs/debate/task/onpointerdown.js",
 "https://pilot.parts/programs/debate/window/onfocus.js?active":
  "https://pilot.parts/programs/debate/window/active.txt",
 "https://pilot.parts/programs/debate/window/onfocus.js?archive": "https://core.parts/behaviors/window-focus.a.js",
 "https://pilot.parts/programs/debate/window/onfocus.js?window": "https://pilot.parts/programs/debate/window/",
 "https://pilot.parts/programs/debate/window/panel/?layout":
  "https://pilot.parts/programs/debate/window/panel/layout.css",
 "https://pilot.parts/programs/debate/window/panel/?manifest":
  "https://pilot.parts/programs/debate/window/panel/manifest.uri",
 "https://pilot.parts/programs/debate/window/panel/contacts/?layout":
  "https://pilot.parts/programs/locate/window/explorer-view/layout.css",
 "https://pilot.parts/programs/debate/window/panel/contacts/?manifest":
  "https://pilot.parts/programs/debate/window/panel/contacts/manifest.uri",
 "https://pilot.parts/programs/debate/window/panel/contacts/manifest.uri":
  "https://pilot.parts/programs/debate/window/panel/contacts/online/ https://pilot.parts/programs/debate/window/panel/contacts/offline/",
 "https://pilot.parts/programs/debate/window/panel/contacts/offline/?layout":
  "https://pilot.parts/programs/debate/window/panel/contacts/offline/layout.css",
 "https://pilot.parts/programs/debate/window/panel/contacts/offline/?manifest":
  "https://pilot.parts/programs/debate/window/panel/contacts/offline/manifest.uri",
 "https://pilot.parts/programs/debate/window/panel/contacts/offline/layout.css":
  ':host { display: flex; flex-flow: column nowrap } :host::before { content: "Offline"; font-weight: 700 }',
 "https://pilot.parts/programs/debate/window/panel/contacts/offline/manifest.uri": "",
 "https://pilot.parts/programs/debate/window/panel/contacts/online/?layout":
  "https://pilot.parts/programs/debate/window/panel/contacts/online/layout.css",
 "https://pilot.parts/programs/debate/window/panel/contacts/online/?manifest":
  "https://pilot.parts/programs/debate/window/panel/contacts/online/manifest.uri",
 "https://pilot.parts/programs/debate/window/panel/contacts/online/layout.css":
  ':host { display: flex; flex-flow: column nowrap } :host::before { content: "Online"; font-weight: 700 }',
 "https://pilot.parts/programs/debate/window/panel/contacts/online/manifest.uri": "",
 "https://pilot.parts/programs/debate/window/panel/layout.css":
  ":host { display: flex; flex-flow: column nowrap; flex: 1 1; gap: 2px; }",
 "https://pilot.parts/programs/debate/window/panel/manifest.uri":
  "https://pilot.parts/programs/debate/window/panel/toolbar/ https://pilot.parts/programs/debate/window/panel/contacts/ https://pilot.parts/programs/debate/window/panel/status/",
 "https://pilot.parts/programs/debate/window/panel/status/?layout":
  "https://pilot.parts/programs/debate/window/panel/status/layout.css",
 "https://pilot.parts/programs/debate/window/panel/status/?manifest":
  "https://pilot.parts/programs/debate/window/panel/status/manifest.uri",
 "https://pilot.parts/programs/debate/window/panel/status/layout.css.a.js":
  '\n  return `:host {\n   padding: 0 3px;\n   height: 17px;\n   box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a;\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n  }\n  :host::after {\n   content: "👤 ${"" + status === "1" ? "Online" : "Offline"}"\n  }`',
 "https://pilot.parts/programs/debate/window/panel/status/layout.css?archive":
  "https://pilot.parts/programs/debate/window/panel/status/layout.css.a.js",
 "https://pilot.parts/programs/debate/window/panel/status/layout.css?status":
  "https://pilot.parts/programs/debate/connection/status.txt",
 "https://pilot.parts/programs/debate/window/panel/status/manifest.uri": "",
 "https://pilot.parts/programs/debate/window/panel/toolbar/?layout":
  "https://pilot.parts/programs/debate/window/panel/toolbar/layout.css",
 "https://pilot.parts/programs/debate/window/panel/toolbar/?manifest":
  "https://pilot.parts/programs/debate/window/panel/toolbar/manifest.uri",
 "https://pilot.parts/programs/debate/window/panel/toolbar/layout.css":
  ":host { display: flex; flex-flow: row nowrap; gap: 12px; height: 51px; padding: 6px; box-sizing: border-box; }",
 "https://pilot.parts/programs/debate/window/panel/toolbar/manifest.uri.a.js":
  'return [[\n button_url.headerOf().href + "answer/",\n `:host { text-align: center; display: flex; flex-flow: column nowrap; width: 40px; box-sizing: border-box } :host::before { content: "${answer_icon}"; font-size: 24px; line-height: 24px; } :host::after { content: "Answer" }`,\n "",\n `e => CORE["https://pilot.parts/programs/answer/task/onpointerdown.js"](e)`,\n],[\n button_url.headerOf().href + "invite/",\n `:host { text-align: center; display: flex; flex-flow: column nowrap; width: 40px; box-sizing: border-box } :host::before { content: "${call_icon}"; font-size: 24px; line-height: 24px; } :host::after { content: "Place" }`,\n "",\n `e => CORE["https://pilot.parts/programs/invite/task/onpointerdown.js"](e)`,\n]].map(config => { button(...config); return config[0] }).join(" ")',
 "https://pilot.parts/programs/debate/window/panel/toolbar/manifest.uri?answer_icon":
  "https://pilot.parts/programs/answer/app-icon/character.txt",
 "https://pilot.parts/programs/debate/window/panel/toolbar/manifest.uri?button":
  "https://core.parts/components/button/construct.js",
 "https://pilot.parts/programs/debate/window/panel/toolbar/manifest.uri?button_url":
  "https://pilot.parts/programs/debate/window/panel/toolbar/",
 "https://pilot.parts/programs/debate/window/panel/toolbar/manifest.uri?call_icon":
  "https://pilot.parts/programs/invite/app-icon/character.txt",
 "https://pilot.parts/programs/debate/window/panel/toolbar/manifest.uri?archive":
  "https://pilot.parts/programs/debate/window/panel/toolbar/manifest.uri.a.js",
 "https://pilot.parts/programs/debate/window/position.json":
  '\n  {\n   "x": 64,\n   "y": 128,\n   "w": 300,\n   "h": 450,\n   "range": {\n    "x": [-64, 512],\n    "y": [-2, 256],\n    "w": [96, 256],\n    "h": [64, 128]\n   }\n  }',
 "https://pilot.parts/programs/debate/window/position.json?fx":
  "https://pilot.parts/programs/debate/window/position/fx.uri",
 "https://pilot.parts/programs/debate/window/position/fx.uri": "https://pilot.parts/programs/debate/window/layout.css",
 "https://pilot.parts/programs/debate/window/title-bar/?layout":
  "https://pilot.parts/programs/debate/window/title-bar/layout.css",
 "https://pilot.parts/programs/debate/window/title-bar/?manifest":
  "https://pilot.parts/programs/debate/window/title-bar/manifest.uri",
 "https://pilot.parts/programs/debate/window/title-bar/?ondblclick":
  "https://pilot.parts/programs/debate/window/title-bar/ondblclick.js",
 "https://pilot.parts/programs/debate/window/title-bar/layout.css":
  "\n  :host {\n   background: #7f7f7f;\n   color: white;\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n   gap: 3px;\n   height: 18px;\n   padding: 0px 2px;\n   box-sizing: border-box;\n  }\n  app-icon {\n   width: 16px;\n   height: 16px;\n  }",
 "https://pilot.parts/programs/debate/window/title-bar/manifest.uri":
  "https://pilot.parts/programs/debate/app-icon/ https://pilot.parts/programs/debate/app-label/ https://core.parts/flex-spacer/ https://pilot.parts/programs/debate/window/controls/",
 "https://pilot.parts/programs/debate/window/title-bar/ondblclick.a.js":
  "return `() => { CORE['https://pilot.parts/programs/debate/window/controls/${(\"\"+maximized) === '1' ? 'restore' : 'maximize'}-button/onclick.js']() }`",
 "https://pilot.parts/programs/debate/window/title-bar/ondblclick.js?archive":
  "https://pilot.parts/programs/debate/window/title-bar/ondblclick.a.js",
 "https://pilot.parts/programs/debate/window/title-bar/ondblclick.js?maximized":
  "https://pilot.parts/programs/debate/window/maximized.txt",
 "https://pilot.parts/programs/invite/app-icon/?layout": "https://pilot.parts/programs/invite/app-icon/layout.css",
 "https://pilot.parts/programs/invite/app-icon/character.txt": "☎",
 "https://pilot.parts/programs/invite/app-icon/layout.css?character":
  "https://pilot.parts/programs/invite/app-icon/character.txt",
 "https://pilot.parts/programs/invite/app-icon/layout.css?archive":
  "https://pilot.parts/programs/prototype/app-icon/layout.css.a.js",
 "https://pilot.parts/programs/invite/app-label/?layout": "https://pilot.parts/programs/invite/app-label/layout.css",
 "https://pilot.parts/programs/invite/app-label/label.txt": "Place Call",
 "https://pilot.parts/programs/invite/app-label/layout.css?archive":
  "https://pilot.parts/programs/prototype/app-label/layout.css.a.js",
 "https://pilot.parts/programs/invite/app-label/layout.css?label":
  "https://pilot.parts/programs/invite/app-label/label.txt",
 "https://pilot.parts/programs/invite/connection/answer.txt": "",
 "https://pilot.parts/programs/invite/connection/call.txt": "",
 "https://pilot.parts/programs/invite/connection/call.txt?fx":
  "https://pilot.parts/programs/invite/connection/call.uri",
 "https://pilot.parts/programs/invite/connection/call.uri":
  "https://pilot.parts/programs/invite/window/panel/call/layout.css",
 "https://pilot.parts/programs/invite/task/?layout": "https://pilot.parts/programs/invite/task/layout.css",
 "https://pilot.parts/programs/invite/task/?manifest": "https://pilot.parts/programs/invite/task/manifest.uri",
 "https://pilot.parts/programs/invite/task/?onpointerdown": "https://pilot.parts/programs/invite/task/onpointerdown.js",
 "https://pilot.parts/programs/invite/task/datum.txt": "https://pilot.parts/programs/invite/task/",
 "https://pilot.parts/programs/invite/task/index.txt?archive":
  "https://pilot.parts/programs/locate/task/index.txt.a.js",
 "https://pilot.parts/programs/invite/task/index.txt?datum": "https://pilot.parts/programs/invite/task/datum.txt",
 "https://pilot.parts/programs/invite/task/index.txt?fx": "https://pilot.parts/programs/invite/task/index/fx.uri",
 "https://pilot.parts/programs/invite/task/index.txt?tasks": "https://pilot.parts/tasks.uri",
 "https://pilot.parts/programs/invite/task/index/fx.uri": "https://pilot.parts/programs/invite/window/active.txt",
 "https://pilot.parts/programs/invite/task/layout.css?archive":
  "https://pilot.parts/programs/relate/task/layout.css.a.js",
 "https://pilot.parts/programs/invite/task/layout.css?open": "https://pilot.parts/programs/invite/window/active.txt",
 "https://pilot.parts/programs/invite/task/manifest.uri":
  "https://pilot.parts/programs/invite/app-icon/ https://pilot.parts/programs/invite/app-label/",
 "https://pilot.parts/programs/invite/task/manifest.uri?open": "https://pilot.parts/programs/invite/window/active.txt",
 "https://pilot.parts/programs/invite/task/onpointerdown.js?active":
  "https://pilot.parts/programs/invite/window/active.txt",
 "https://pilot.parts/programs/invite/task/onpointerdown.js?archive":
  "https://pilot.parts/programs/relate/task/onpointerdown.a.js",
 "https://pilot.parts/programs/invite/task/onpointerdown.js?minimized":
  "https://pilot.parts/programs/invite/window/minimized.txt",
 "https://pilot.parts/programs/invite/task/onpointerdown.js?task": "https://pilot.parts/programs/invite/task/",
 "https://pilot.parts/programs/invite/task/onpointerdown.js?window": "https://pilot.parts/programs/invite/window/",
 "https://pilot.parts/programs/invite/task/open/fx.uri":
  "https://pilot.parts/programs/invite/task/layout.css https://pilot.parts/taskbar/selected.txt https://pilot.parts/programs/invite/window/layout.css https://pilot.parts/programs/invite/task/onpointerdown.js",
 "https://pilot.parts/programs/invite/window/?layout": "https://pilot.parts/programs/invite/window/layout.css",
 "https://pilot.parts/programs/invite/window/?manifest": "https://pilot.parts/programs/invite/window/manifest.uri",
 "https://pilot.parts/programs/invite/window/?onfocus": "https://pilot.parts/programs/invite/window/onfocus.js",
 "https://pilot.parts/programs/invite/window/active.txt?archive":
  "https://pilot.parts/programs/relate/window/active.txt.a.js",
 "https://pilot.parts/programs/invite/window/active.txt?fx": "https://pilot.parts/programs/invite/task/open/fx.uri",
 "https://pilot.parts/programs/invite/window/active.txt?index": "https://pilot.parts/programs/invite/task/index.txt",
 "https://pilot.parts/programs/invite/window/active.txt?minimized":
  "https://pilot.parts/programs/invite/window/minimized.txt",
 "https://pilot.parts/programs/invite/window/active.txt?selected": "https://pilot.parts/taskbar/selected.txt",
 "https://pilot.parts/programs/invite/window/controls/?layout":
  "https://pilot.parts/programs/invite/window/controls/layout.css",
 "https://pilot.parts/programs/invite/window/controls/?manifest":
  "https://pilot.parts/programs/invite/window/controls/manifest.uri",
 "https://pilot.parts/programs/invite/window/controls/exit-button/?layout":
  "https://pilot.parts/programs/invite/window/controls/exit-button/layout.css",
 "https://pilot.parts/programs/invite/window/controls/exit-button/?onclick":
  "https://pilot.parts/programs/invite/window/controls/exit-button/onclick.js",
 "https://pilot.parts/programs/invite/window/controls/exit-button/?onpointerdown":
  "https://pilot.parts/programs/invite/window/controls/exit-button/onpointerdown.js",
 "https://pilot.parts/programs/invite/window/controls/exit-button/down-fx.uri":
  "https://pilot.parts/programs/invite/window/controls/exit-button/layout.css",
 "https://pilot.parts/programs/invite/window/controls/exit-button/down.txt": "0",
 "https://pilot.parts/programs/invite/window/controls/exit-button/down.txt?fx":
  "https://pilot.parts/programs/invite/window/controls/exit-button/down-fx.uri",
 "https://pilot.parts/programs/invite/window/controls/exit-button/layout.css?archive":
  "https://pilot.parts/programs/relate/window/controls/exit-button/layout.css.a.js",
 "https://pilot.parts/programs/invite/window/controls/exit-button/layout.css?down":
  "https://pilot.parts/programs/invite/window/controls/exit-button/down.txt",
 "https://pilot.parts/programs/invite/window/controls/exit-button/onclick.js?archive":
  "https://core.parts/behaviors/window-close.a.js",
 "https://pilot.parts/programs/invite/window/controls/exit-button/onclick.js?task":
  "https://pilot.parts/programs/invite/task/",
 "https://pilot.parts/programs/invite/window/controls/exit-button/onclick.js?window":
  "https://pilot.parts/programs/invite/window/",
 "https://pilot.parts/programs/invite/window/controls/exit-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/invite/window/controls/exit-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/invite/window/controls/exit-button/release.js'\n  }",
 "https://pilot.parts/programs/invite/window/controls/exit-button/release.js":
  "e => { CORE['https://pilot.parts/programs/invite/window/controls/exit-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/invite/window/controls/layout.css":
  "\n  :host {\n   display: flex;\n   flex-flow: row nowrap\n  }",
 "https://pilot.parts/programs/invite/window/controls/manifest.uri":
  "https://pilot.parts/programs/invite/window/controls/minimize-button/ https://pilot.parts/programs/invite/window/controls/exit-button/",
 "https://pilot.parts/programs/invite/window/controls/minimize-button/?layout":
  "https://pilot.parts/programs/invite/window/controls/minimize-button/layout.css",
 "https://pilot.parts/programs/invite/window/controls/minimize-button/?onclick":
  "https://pilot.parts/programs/invite/window/controls/minimize-button/onclick.js",
 "https://pilot.parts/programs/invite/window/controls/minimize-button/?onpointerdown":
  "https://pilot.parts/programs/invite/window/controls/minimize-button/onpointerdown.js",
 "https://pilot.parts/programs/invite/window/controls/minimize-button/down-fx.uri":
  "https://pilot.parts/programs/invite/window/controls/minimize-button/layout.css",
 "https://pilot.parts/programs/invite/window/controls/minimize-button/down.txt": "0",
 "https://pilot.parts/programs/invite/window/controls/minimize-button/down.txt?fx":
  "https://pilot.parts/programs/invite/window/controls/minimize-button/down-fx.uri",
 "https://pilot.parts/programs/invite/window/controls/minimize-button/layout.css?archive":
  "https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css.a.js",
 "https://pilot.parts/programs/invite/window/controls/minimize-button/layout.css?down":
  "https://pilot.parts/programs/invite/window/controls/minimize-button/down.txt",
 "https://pilot.parts/programs/invite/window/controls/minimize-button/onclick.js":
  "()=>{CORE['https://pilot.parts/programs/invite/window/minimized.txt'] = '1'\n  }",
 "https://pilot.parts/programs/invite/window/controls/minimize-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/invite/window/controls/minimize-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/invite/window/controls/minimize-button/release.js'\n  }",
 "https://pilot.parts/programs/invite/window/controls/minimize-button/release.js":
  "e => { CORE['https://pilot.parts/programs/invite/window/controls/minimize-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/invite/window/layout.css?active":
  "https://pilot.parts/programs/invite/window/active.txt",
 "https://pilot.parts/programs/invite/window/layout.css?archive":
  "https://pilot.parts/programs/welcome/window/layout.css.a.js",
 "https://pilot.parts/programs/invite/window/layout.css?position":
  "https://pilot.parts/programs/invite/window/position.json",
 "https://pilot.parts/programs/invite/window/manifest.uri.a.js":
  'const [title_url, panel_url, transform_url, position_url] = [title, panel, transform_path, position].map(x => x.headerOf().href)\nconst transform_urls = transform(transform_url, position_url, "", title_url);\nconst urlSet = [title_url, panel_url]\nif (transform_urls) urlSet.push(transform_urls)\nreturn urlSet.join(" ")',
 "https://pilot.parts/programs/invite/window/manifest.uri?archive":
  "https://pilot.parts/programs/invite/window/manifest.uri.a.js",
 "https://pilot.parts/programs/invite/window/manifest.uri?panel": "https://pilot.parts/programs/invite/window/panel/",
 "https://pilot.parts/programs/invite/window/manifest.uri?position":
  "https://pilot.parts/programs/invite/window/position.json",
 "https://pilot.parts/programs/invite/window/manifest.uri?title":
  "https://pilot.parts/programs/invite/window/title-bar/",
 "https://pilot.parts/programs/invite/window/manifest.uri?transform":
  "https://core.parts/components/transform/construct.js",
 "https://pilot.parts/programs/invite/window/manifest.uri?transform_path":
  "https://pilot.parts/programs/invite/window/transform/",
 "https://pilot.parts/programs/invite/window/minimized.txt": "0",
 "https://pilot.parts/programs/invite/window/minimized.txt?fx":
  "https://pilot.parts/programs/invite/window/minimized/fx.uri",
 "https://pilot.parts/programs/invite/window/minimized/fx.uri":
  "https://pilot.parts/manifest.uri https://pilot.parts/programs/invite/window/active.txt https://pilot.parts/programs/invite/task/onpointerdown.js",
 "https://pilot.parts/programs/invite/window/onfocus.js?active":
  "https://pilot.parts/programs/invite/window/active.txt",
 "https://pilot.parts/programs/invite/window/onfocus.js?archive": "https://core.parts/behaviors/window-focus.a.js",
 "https://pilot.parts/programs/invite/window/onfocus.js?window": "https://pilot.parts/programs/invite/window/",
 "https://pilot.parts/programs/invite/window/panel/?layout":
  "https://pilot.parts/programs/invite/window/panel/layout.css",
 "https://pilot.parts/programs/invite/window/panel/?manifest":
  "https://pilot.parts/programs/invite/window/panel/manifest.uri",
 "https://pilot.parts/programs/invite/window/panel/call/?layout":
  "https://pilot.parts/programs/invite/window/panel/call/layout.css",
 "https://pilot.parts/programs/invite/window/panel/call/layout.css?base":
  "https://pilot.parts/programs/answer/window/panel/answer/layout.css",
 "https://pilot.parts/programs/invite/window/panel/call/layout.css?data":
  "https://pilot.parts/programs/invite/connection/call.txt",
 "https://pilot.parts/programs/invite/window/panel/heading/?layout":
  "https://pilot.parts/programs/invite/window/panel/heading/layout.css",
 "https://pilot.parts/programs/invite/window/panel/heading/layout.css":
  ':host { display: flex; flex-flow: row nowrap; font-size: 24px; line-height: 24px; } :host::before { content: "Place Call\\00a0"; font-weight: 300; }',
 "https://pilot.parts/programs/invite/window/panel/layout.css":
  '\n  :host {\n   height: 100%;\n   display: grid;\n   padding: 12px;\n   gap: 12px;\n   grid-template-columns: 1fr 100px;\n   grid-template-rows: 24px 1fr;\n   grid-template-areas:\n    "head head"\n    "call btns";\n  }\n  heading- {\n   grid-area: head;\n  }',
 "https://pilot.parts/programs/invite/window/panel/manifest.uri":
  "https://pilot.parts/programs/invite/window/panel/heading/ https://pilot.parts/programs/invite/window/panel/call/ https://pilot.parts/programs/invite/window/panel/menu/",
 "https://pilot.parts/programs/invite/window/panel/menu/?base": "",
 "https://pilot.parts/programs/invite/window/panel/menu/?layout":
  "https://pilot.parts/programs/invite/window/panel/menu/layout.css",
 "https://pilot.parts/programs/invite/window/panel/menu/?manifest":
  "https://pilot.parts/programs/invite/window/panel/menu/manifest.uri",
 "https://pilot.parts/programs/invite/window/panel/menu/layout.css":
  ":host { display: flex; flex-flow: column nowrap; gap: 7px; } :host > * { height: 23px; padding: 3px; display: flex; flex-flow: row nowrap; text-align: center; }",
 "https://pilot.parts/programs/invite/window/panel/menu/manifest.uri.a.js":
  'console.log("invite manifest")\nconst common_url = "https://pilot.parts/programs/invite/window/panel/menu/";\nconst owner = new RTCPeerConnection()\nowner.onicecandidate = () => CORE[call.headerOf().href] = JSON.stringify(owner.localDescription)\nowner.oniceconnectionstatechange = () => console.log("owner connection", owner.connectionState)\nowner.onicegatheringstatechange = () => console.log("owner ice gathering", owner.iceGatheringState)\nowner.onsignalingstatechange = () => console.log("owner signaling", owner.signalingState)\nconst channel = owner.createDataChannel("overhead")\n\nchannel.onmessage = e => console.log(e.target.label + " message => " + JSON.stringify(e.data))\nchannel.onclose = e => console.log(e.target.label + " closed!", owner.connectionState)\nchannel.onopen = e => {\n close_window()\n CORE["https://pilot.parts/programs/invite/window/panel/menu/manifest.uri"] = ""\n CORE[call.headerOf().href] = ""\n CORE[answer.headerOf().href] = ""\n console.log(e.target.label + " opened!", "TODO: add channel to view, garbage collect more")\n}\n\nowner.createOffer().then(o => owner.setLocalDescription(o))\nglobalThis.ringing = owner\n\nreturn [[\n common_url + "copy/",\n ":host::before { content: \\\'Copy Call\\\'; width: 100%; }",\n "",\n  `() => { const str = ""+CORE["${call.headerOf().href}"]; navigator.clipboard.writeText(str) }`,\n],[\n common_url + "paste/",\n ":host::before { content: \\\'Paste Answer\\\'; width: 100%; }",\n "",\n `() => navigator.clipboard.readText().then(x => { const obj = JSON.parse(x); if (obj.type !== "answer" ) throw TypeError("cannot accept a counter offer from here."); globalThis.ringing.setRemoteDescription(obj) })`,\n]].map(config => { button(...config); return config[0] }).join(" ")',
 "https://pilot.parts/programs/invite/window/panel/menu/manifest.uri?answer":
  "https://pilot.parts/programs/invite/connection/answer.txt",
 "https://pilot.parts/programs/invite/window/panel/menu/manifest.uri?button":
  "https://core.parts/components/button/construct.js",
 "https://pilot.parts/programs/invite/window/panel/menu/manifest.uri?call":
  "https://pilot.parts/programs/invite/connection/call.txt",
 "https://pilot.parts/programs/invite/window/panel/menu/manifest.uri?close_window":
  "https://pilot.parts/programs/invite/window/controls/exit-button/onclick.js",
 "https://pilot.parts/programs/invite/window/panel/menu/manifest.uri?archive":
  "https://pilot.parts/programs/invite/window/panel/menu/manifest.uri.a.js",
 "https://pilot.parts/programs/invite/window/position.json":
  '\n  {\n   "x": 32,\n   "y": 24,\n   "w": 492,\n   "h": 229,\n   "range": {\n    "x": [-64, 512],\n    "y": [-2, 256],\n    "w": [96, 256],\n    "h": [64, 128]\n   }\n  }',
 "https://pilot.parts/programs/invite/window/position.json?fx":
  "https://pilot.parts/programs/invite/window/position/fx.uri",
 "https://pilot.parts/programs/invite/window/position/fx.uri": "https://pilot.parts/programs/invite/window/layout.css",
 "https://pilot.parts/programs/invite/window/title-bar/?layout":
  "https://pilot.parts/programs/invite/window/title-bar/layout.css",
 "https://pilot.parts/programs/invite/window/title-bar/?manifest":
  "https://pilot.parts/programs/invite/window/title-bar/manifest.uri",
 "https://pilot.parts/programs/invite/window/title-bar/layout.css":
  "\n  :host {\n   background: #7f7f7f;\n   color: white;\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n   gap: 3px;\n   height: 18px;\n   flex: 0 0 18px;\n   padding: 0px 2px;\n   box-sizing: border-box;\n  }\n  app-icon {\n   width: 16px;\n   height: 16px;\n  }",
 "https://pilot.parts/programs/invite/window/title-bar/manifest.uri":
  "https://pilot.parts/programs/invite/app-icon/ https://pilot.parts/programs/invite/app-label/ https://core.parts/flex-spacer/ https://pilot.parts/programs/invite/window/controls/",
 "https://pilot.parts/programs/locate/app-label/?layout": "https://pilot.parts/programs/locate/app-label/layout.css",
 "https://pilot.parts/programs/locate/app-label/layout.css.a.js":
  'return `\n  :host {\n   margin: 0;\n   height: 16px;\n   vertical-align: center;\n   text-overflow: ellipsis;\n   overflow: hidden;\n  }\n  :host::after {\n   content: "Locate - ${address}";\n   white-space: nowrap;\n  }`',
 "https://pilot.parts/programs/locate/app-label/layout.css?address":
  "https://pilot.parts/programs/locate/window/address.uri",
 "https://pilot.parts/programs/locate/app-label/layout.css?archive":
  "https://pilot.parts/programs/locate/app-label/layout.css.a.js",
 "https://pilot.parts/programs/locate/start-menu-item/?layout":
  "https://pilot.parts/programs/locate/start-menu-item/layout.css",
 "https://pilot.parts/programs/locate/start-menu-item/?manifest":
  "https://pilot.parts/programs/locate/start-menu-item/manifest.uri",
 "https://pilot.parts/programs/locate/start-menu-item/?onclick":
  "https://pilot.parts/programs/locate/task/onpointerdown.js",
 "https://pilot.parts/programs/locate/start-menu-item/app-label/?layout":
  "https://pilot.parts/programs/locate/start-menu-item/app-label/layout.css",
 "https://pilot.parts/programs/locate/start-menu-item/app-label/layout.css":
  ':host::after {\n    height: 24px;\n    content: "Locate";\n   }',
 "https://pilot.parts/programs/locate/start-menu-item/layout.css":
  "\n   :host {\n    position: relative;\n    display: flex;\n    flex-flow: row nowrap;\n    align-items: center;\n    padding: 4px 0 }\n   :host(:hover) {\n    background: #00007f;\n    color: white }\n   folder-icon {\n    width: 24px;\n    height: 24px;\n    margin: 0 10px;\n    --size: 24px;\n   }",
 "https://pilot.parts/programs/locate/start-menu-item/manifest.uri":
  "https://pilot.parts/icons/folder-icon/ https://pilot.parts/programs/locate/start-menu-item/app-label/",
 "https://pilot.parts/programs/locate/task/?layout": "https://pilot.parts/programs/locate/task/layout.css",
 "https://pilot.parts/programs/locate/task/?manifest": "https://pilot.parts/programs/locate/task/manifest.uri",
 "https://pilot.parts/programs/locate/task/?onpointerdown": "https://pilot.parts/programs/locate/task/onpointerdown.js",
 "https://pilot.parts/programs/locate/task/datum.txt": "https://pilot.parts/programs/locate/task/",
 "https://pilot.parts/programs/locate/task/index.txt.a.js": 'return ""+(""+tasks).split(" ").indexOf(""+datum) + 1',
 "https://pilot.parts/programs/locate/task/index.txt?archive":
  "https://pilot.parts/programs/locate/task/index.txt.a.js",
 "https://pilot.parts/programs/locate/task/index.txt?datum": "https://pilot.parts/programs/locate/task/datum.txt",
 "https://pilot.parts/programs/locate/task/index.txt?fx": "https://pilot.parts/programs/locate/task/index/fx.uri",
 "https://pilot.parts/programs/locate/task/index.txt?tasks": "https://pilot.parts/tasks.uri",
 "https://pilot.parts/programs/locate/task/index/fx.uri": "https://pilot.parts/programs/locate/window/active.txt",
 "https://pilot.parts/programs/locate/task/layout.css.a.js":
  'return `\n  :host {\n   position: relative;\n   height: 100%;\n   margin: 0;\n   width: 160px;\n   display: flex;\n   flex-flow: row nowrap;\n   gap: 3px;\n   border: none;${("" + open) === "1" ? `\n   font: bold 11px sans-serif;` : ""}\n   box-sizing: border-box;\n   padding: ${("" + open) === "0" ? 3 : 4}px 2px 2px;\n   text-align: left;\n   box-shadow: ${("" + open) === "0" ? "inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb" : "inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a"}\n  }\n  :host(:focus)::after {\n   border: 1px dotted black;\n   content: "";\n   position: absolute;\n   margin: 3px;\n   left: 0;\n   right: 0;\n   top: 0;\n   bottom: 0;\n   pointer-events: none;\n  }${("" + open) === "1" ? `\n  :host > * {\n   z-index: 3\n  }\n  :host::before {\n   content: "";\n   position: absolute;\n   margin: 2px;\n   border-top: 1px solid white;\n   left: 0;\n   right: 0;\n   top: 0;\n   bottom: 0;\n   background-image:\n    linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white),\n    linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white);\n   background-size: 2px 2px;background-position: 0 0, 1px 1px;\n  }` : ``}\n  app-icon {\n   width: 16px;\n   height: 16px;\n  }`',
 "https://pilot.parts/programs/locate/task/layout.css?archive":
  "https://pilot.parts/programs/locate/task/layout.css.a.js",
 "https://pilot.parts/programs/locate/task/layout.css?open": "https://pilot.parts/programs/locate/window/active.txt",
 "https://pilot.parts/programs/locate/task/manifest.uri":
  "https://pilot.parts/icons/folder-icon/ https://pilot.parts/programs/locate/app-label/",
 "https://pilot.parts/programs/locate/task/manifest.uri?open": "https://pilot.parts/programs/locate/window/active.txt",
 "https://pilot.parts/programs/locate/task/onpointerdown.js?active":
  "https://pilot.parts/programs/locate/window/active.txt",
 "https://pilot.parts/programs/locate/task/onpointerdown.js?base":
  "https://pilot.parts/programs/relate/task/onpointerdown.js",
 "https://pilot.parts/programs/locate/task/onpointerdown.js?minimized":
  "https://pilot.parts/programs/locate/window/minimized.txt",
 "https://pilot.parts/programs/locate/task/onpointerdown.js?task": "https://pilot.parts/programs/locate/task/",
 "https://pilot.parts/programs/locate/task/onpointerdown.js?window": "https://pilot.parts/programs/locate/window/",
 "https://pilot.parts/programs/locate/task/open/fx.uri":
  "https://pilot.parts/programs/locate/task/layout.css https://pilot.parts/taskbar/selected.txt https://pilot.parts/programs/locate/window/layout.css https://pilot.parts/programs/locate/task/onpointerdown.js",
 "https://pilot.parts/programs/locate/window/?layout": "https://pilot.parts/programs/locate/window/layout.css",
 "https://pilot.parts/programs/locate/window/?manifest": "https://pilot.parts/programs/locate/window/manifest.uri",
 "https://pilot.parts/programs/locate/window/?onfocus": "https://pilot.parts/programs/locate/window/onfocus.js",
 "https://pilot.parts/programs/locate/window/active.txt.a.js":
  'return ("" + minimized) === "1" ? "0" : ("" + selected) === ("" + index) ? "1" : "0"',
 "https://pilot.parts/programs/locate/window/active.txt?archive":
  "https://pilot.parts/programs/locate/window/active.txt.a.js",
 "https://pilot.parts/programs/locate/window/active.txt?fx": "https://pilot.parts/programs/locate/task/open/fx.uri",
 "https://pilot.parts/programs/locate/window/active.txt?index": "https://pilot.parts/programs/locate/task/index.txt",
 "https://pilot.parts/programs/locate/window/active.txt?minimized":
  "https://pilot.parts/programs/locate/window/minimized.txt",
 "https://pilot.parts/programs/locate/window/active.txt?selected": "https://pilot.parts/taskbar/selected.txt",
 "https://pilot.parts/programs/locate/window/address-fx.uri":
  "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri https://pilot.parts/programs/locate/app-label/layout.css",
 "https://pilot.parts/programs/locate/window/address.uri": "https://kireji.app/demo/",
 "https://pilot.parts/programs/locate/window/address.uri?fx":
  "https://pilot.parts/programs/locate/window/address-fx.uri",
 "https://pilot.parts/programs/locate/window/controls/?layout":
  "https://pilot.parts/programs/locate/window/controls/layout.css",
 "https://pilot.parts/programs/locate/window/controls/?manifest":
  "https://pilot.parts/programs/locate/window/controls/manifest.uri",
 "https://pilot.parts/programs/locate/window/controls/exit-button/?layout":
  "https://pilot.parts/programs/locate/window/controls/exit-button/layout.css",
 "https://pilot.parts/programs/locate/window/controls/exit-button/?onclick":
  "https://pilot.parts/programs/locate/window/controls/exit-button/onclick.js",
 "https://pilot.parts/programs/locate/window/controls/exit-button/?onpointerdown":
  "https://pilot.parts/programs/locate/window/controls/exit-button/onpointerdown.js",
 "https://pilot.parts/programs/locate/window/controls/exit-button/down-fx.uri":
  "https://pilot.parts/programs/locate/window/controls/exit-button/layout.css",
 "https://pilot.parts/programs/locate/window/controls/exit-button/down.txt": "0",
 "https://pilot.parts/programs/locate/window/controls/exit-button/down.txt?fx":
  "https://pilot.parts/programs/locate/window/controls/exit-button/down-fx.uri",
 "https://pilot.parts/programs/locate/window/controls/exit-button/layout.css.a.js":
  "return `\n    :host {\n     position: relative;\n     width: 16px;\n     height: 14px;\n     background: #c3c3c3;\n     margin-left: 2px;\n     box-shadow: ${(\"\"+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'}\n    }\n    :host::before, :host::after {\n     --color: black;\n     content: \"\";\n     display: block;\n     position: absolute;\n     width: 8px;\n     height: 7px;\n     left: 4px;\n     top: 3px;\n     background: linear-gradient(to top left, transparent 0%, transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%), linear-gradient(to top right,  transparent 0%,  transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%);\n    }\n    :host(:hover)::before {\n     --color: blue\n    }`",
 "https://pilot.parts/programs/locate/window/controls/exit-button/layout.css?archive":
  "https://pilot.parts/programs/locate/window/controls/exit-button/layout.css.a.js",
 "https://pilot.parts/programs/locate/window/controls/exit-button/layout.css?down":
  "https://pilot.parts/programs/locate/window/controls/exit-button/down.txt",
 "https://pilot.parts/programs/locate/window/controls/exit-button/onclick.js?archive":
  "https://core.parts/behaviors/window-close.a.js",
 "https://pilot.parts/programs/locate/window/controls/exit-button/onclick.js?task":
  "https://pilot.parts/programs/locate/task/",
 "https://pilot.parts/programs/locate/window/controls/exit-button/onclick.js?window":
  "https://pilot.parts/programs/locate/window/",
 "https://pilot.parts/programs/locate/window/controls/exit-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/locate/window/controls/exit-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/locate/window/controls/exit-button/release.js'\n    }",
 "https://pilot.parts/programs/locate/window/controls/exit-button/release.js":
  "e => { CORE['https://pilot.parts/programs/locate/window/controls/exit-button/down.txt'] = '0'\n    }",
 "https://pilot.parts/programs/locate/window/controls/layout.css":
  "\n  :host {\n   display: flex;\n   flex-flow: row nowrap\n  }",
 "https://pilot.parts/programs/locate/window/controls/manifest.uri.a.js":
  "return `https://pilot.parts/programs/locate/window/controls/minimize-button/ https://pilot.parts/programs/locate/window/controls/${(\"\"+maximized) === '1' ? 'restore' : 'maximize'}-button/ https://pilot.parts/programs/locate/window/controls/exit-button/`",
 "https://pilot.parts/programs/locate/window/controls/manifest.uri?archive":
  "https://pilot.parts/programs/locate/window/controls/manifest.uri.a.js",
 "https://pilot.parts/programs/locate/window/controls/manifest.uri?maximized":
  "https://pilot.parts/programs/locate/window/maximized.txt",
 "https://pilot.parts/programs/locate/window/controls/maximize-button/?layout":
  "https://pilot.parts/programs/locate/window/controls/maximize-button/layout.css",
 "https://pilot.parts/programs/locate/window/controls/maximize-button/?manifest":
  "https://pilot.parts/programs/locate/window/controls/maximize-button/manifest.uri",
 "https://pilot.parts/programs/locate/window/controls/maximize-button/?onclick":
  "https://pilot.parts/programs/locate/window/controls/maximize-button/onclick.js",
 "https://pilot.parts/programs/locate/window/controls/maximize-button/?onpointerdown":
  "https://pilot.parts/programs/locate/window/controls/maximize-button/onpointerdown.js",
 "https://pilot.parts/programs/locate/window/controls/maximize-button/down-fx.uri":
  "https://pilot.parts/programs/locate/window/controls/maximize-button/layout.css",
 "https://pilot.parts/programs/locate/window/controls/maximize-button/down.txt": "0",
 "https://pilot.parts/programs/locate/window/controls/maximize-button/down.txt?fx":
  "https://pilot.parts/programs/locate/window/controls/maximize-button/down-fx.uri",
 "https://pilot.parts/programs/locate/window/controls/maximize-button/layout.css.a.js":
  "return `:host {\n    position: relative;\n    width: 16px;\n    height: 14px;\n    background: #c3c3c3;\n    box-shadow: ${(''+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'}\n   }\n   :host::before {\n    --color: black;\n    display: block;\n    position: absolute;\n    content: '';\n    width: 9px;\n    height: 9px;\n    top: 2px;\n    left: 3px;\n    box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color)\n   }\n   :host(:hover)::before {\n    --color: blue }`",
 "https://pilot.parts/programs/locate/window/controls/maximize-button/layout.css?archive":
  "https://pilot.parts/programs/locate/window/controls/maximize-button/layout.css.a.js",
 "https://pilot.parts/programs/locate/window/controls/maximize-button/layout.css?down":
  "https://pilot.parts/programs/locate/window/controls/maximize-button/down.txt",
 "https://pilot.parts/programs/locate/window/controls/maximize-button/manifest.uri": "",
 "https://pilot.parts/programs/locate/window/controls/maximize-button/onclick.js":
  "\n   () => {\n    CORE['https://pilot.parts/programs/locate/window/maximized.txt'] = '1'\n   }",
 "https://pilot.parts/programs/locate/window/controls/maximize-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/locate/window/controls/maximize-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/locate/window/controls/maximize-button/release.js'\n   }",
 "https://pilot.parts/programs/locate/window/controls/maximize-button/release.js":
  "e => { CORE['https://pilot.parts/programs/locate/window/controls/maximize-button/down.txt'] = '0'\n   }",
 "https://pilot.parts/programs/locate/window/controls/minimize-button/?layout":
  "https://pilot.parts/programs/locate/window/controls/minimize-button/layout.css",
 "https://pilot.parts/programs/locate/window/controls/minimize-button/?onclick":
  "https://pilot.parts/programs/locate/window/controls/minimize-button/onclick.js",
 "https://pilot.parts/programs/locate/window/controls/minimize-button/?onpointerdown":
  "https://pilot.parts/programs/locate/window/controls/minimize-button/onpointerdown.js",
 "https://pilot.parts/programs/locate/window/controls/minimize-button/down-fx.uri":
  "https://pilot.parts/programs/locate/window/controls/minimize-button/layout.css",
 "https://pilot.parts/programs/locate/window/controls/minimize-button/down.txt": "0",
 "https://pilot.parts/programs/locate/window/controls/minimize-button/down.txt?fx":
  "https://pilot.parts/programs/locate/window/controls/minimize-button/down-fx.uri",
 "https://pilot.parts/programs/locate/window/controls/minimize-button/layout.css.a.js":
  "return `\n  :host {\n   position: relative;\n   width: 16px;\n   height: 14px;\n   background: #c3c3c3;\n   box-shadow: ${(\"\"+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'}\n  }\n  :host::before {\n   --color: black;\n   display: block;\n   position: absolute;\n   content: \"\";\n   width: 6px;\n   height: 2px;\n   background: var(--color);\n   top: 9px;\n   left: 4px }\n  :host(:hover)::before {\n   --color: blue\n  }`",
 "https://pilot.parts/programs/locate/window/controls/minimize-button/layout.css?archive":
  "https://pilot.parts/programs/locate/window/controls/minimize-button/layout.css.a.js",
 "https://pilot.parts/programs/locate/window/controls/minimize-button/layout.css?down":
  "https://pilot.parts/programs/locate/window/controls/minimize-button/down.txt",
 "https://pilot.parts/programs/locate/window/controls/minimize-button/onclick.js":
  "()=>{CORE['https://pilot.parts/programs/locate/window/minimized.txt'] = '1'\n  }",
 "https://pilot.parts/programs/locate/window/controls/minimize-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/locate/window/controls/minimize-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/locate/window/controls/minimize-button/release.js'\n  }",
 "https://pilot.parts/programs/locate/window/controls/minimize-button/release.js":
  "e => { CORE['https://pilot.parts/programs/locate/window/controls/minimize-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/locate/window/controls/restore-button/?layout":
  "https://pilot.parts/programs/locate/window/controls/restore-button/layout.css",
 "https://pilot.parts/programs/locate/window/controls/restore-button/?onclick":
  "https://pilot.parts/programs/locate/window/controls/restore-button/onclick.js",
 "https://pilot.parts/programs/locate/window/controls/restore-button/?onpointerdown":
  "https://pilot.parts/programs/locate/window/controls/restore-button/onpointerdown.js",
 "https://pilot.parts/programs/locate/window/controls/restore-button/down-fx.uri":
  "https://pilot.parts/programs/locate/window/controls/restore-button/layout.css",
 "https://pilot.parts/programs/locate/window/controls/restore-button/down.txt": "0",
 "https://pilot.parts/programs/locate/window/controls/restore-button/down.txt?fx":
  "https://pilot.parts/programs/locate/window/controls/restore-button/down-fx.uri",
 "https://pilot.parts/programs/locate/window/controls/restore-button/layout.css.a.js":
  "return `:host {\n   position: relative;\n   width: 16px;\n   height: 14px;\n   background: #c3c3c3;\n   box-shadow: ${(\"\"+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'}\n  }\n  :host::before, :host::after {\n   --color: black;\n   display: block;\n   position: absolute;\n   content: \"\";\n   width: 6px;\n   height: 6px;\n   top: 5px;\n   left: 3px;\n   box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color);\n   background: #c3c3c3 }\n  :host::before {\n   top: 2px;\n   left: 5px }\n  :host(:hover)::before, :host(:hover)::after {\n   --color: blue }`",
 "https://pilot.parts/programs/locate/window/controls/restore-button/layout.css?archive":
  "https://pilot.parts/programs/locate/window/controls/restore-button/layout.css.a.js",
 "https://pilot.parts/programs/locate/window/controls/restore-button/layout.css?down":
  "https://pilot.parts/programs/locate/window/controls/restore-button/down.txt",
 "https://pilot.parts/programs/locate/window/controls/restore-button/onclick.js":
  "()=>CORE['https://pilot.parts/programs/locate/window/maximized.txt'] = '0'",
 "https://pilot.parts/programs/locate/window/controls/restore-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/locate/window/controls/restore-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/locate/window/controls/restore-button/release.js'\n  }",
 "https://pilot.parts/programs/locate/window/controls/restore-button/release.js":
  "e => { CORE['https://pilot.parts/programs/locate/window/controls/restore-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/locate/window/explorer-view/?layout":
  "https://pilot.parts/programs/locate/window/explorer-view/layout.css",
 "https://pilot.parts/programs/locate/window/explorer-view/?manifest":
  "https://pilot.parts/programs/locate/window/explorer-view/manifest.uri",
 "https://pilot.parts/programs/locate/window/explorer-view/column-fx.uri":
  "https://pilot.parts/programs/locate/window/explorer-view/header/layout.css https://pilot.parts/programs/locate/window/explorer-view/files/layout.css",
 "https://pilot.parts/programs/locate/window/explorer-view/files/?layout":
  "https://pilot.parts/programs/locate/window/explorer-view/files/layout.css",
 "https://pilot.parts/programs/locate/window/explorer-view/files/?manifest":
  "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri",
 "https://pilot.parts/programs/locate/window/explorer-view/files/layout.css.a.js":
  'return `\n  :host {\n   position: relative;\n   display: grid;\n   grid-template-columns: ${JSON.parse(""+name_width).w}px ${JSON.parse("" + type_width).w}px ${JSON.parse("" + size_width).w}px;\n   grid-auto-rows: 18px;\n   flex: 1 1;\n   overflow: auto;\n  }`',
 "https://pilot.parts/programs/locate/window/explorer-view/files/layout.css?archive":
  "https://pilot.parts/programs/locate/window/explorer-view/files/layout.css.a.js",
 "https://pilot.parts/programs/locate/window/explorer-view/files/layout.css?name_width":
  "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/position.json",
 "https://pilot.parts/programs/locate/window/explorer-view/files/layout.css?size_width":
  "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/position.json",
 "https://pilot.parts/programs/locate/window/explorer-view/files/layout.css?type_width":
  "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/position.json",
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri.a.js": (
  "" +
  (() => {
   const browse_url = "" + address,
    icon_urlbase = "https://pilot.parts/icons/",
    fileurlbase = 𝑥.replace(/\/manifest.uri$/, "/file"),
    file_list = [],
    url_list = [],
    O = JSON.parse(sort_order),
    K = Object.keys(O),
    header = JSON.parse(header_json),
    file_urls = Object.keys(𝑧)
     .filter(url => url !== browse_url && url.startsWith(browse_url))
     .map(x =>
      x.replace(browse_url, "").includes("/")
       ? x.slice(0, browse_url.length + x.replace(browse_url, "").indexOf("/") + 1)
       : x
     )
   file_urls.push(...file_urls.filter(x => x.includes("?") && x.split("?")[0] !== browse_url).map(x => x.split("?")[0]))
   const filenames = [...new Set(file_urls)].map(url => [url, url.replace(browse_url, "")])
   let kireji_count = 0,
    folder_count = 0,
    file_count = 0
   for (const [url, name, i] of filenames) {
    if (name.includes("?") && "" + show_kireji === "0") continue
    const proxy = CORE[url],
     groups = proxy.headerOf().groups,
     row_type = url.match(/\?[\w\d_$]+$/)
      ? (kireji_count++, "kireji")
      : url.endsWith("/")
      ? (folder_count++,
        url.match(/[^:]\/$/) ? (url.match(/^https:\/\/[\w\d]+\.[\w\d]{2,}\/$/) ? "domain" : "folder") : "protocol")
      : (file_count++, groups.type),
     is_index = ["folder", "domain", "protocol"].includes(row_type),
     row_data = {
      ...groups,
      size: groups.size,
      entry_size: groups.entry_size,
      name,
      url,
      manifest: [],
      type: row_type,
      size_label: is_index ? "--" : groups.size + " byte" + (groups.size === 1 ? "" : "s")
     },
     item_url = fileurlbase + hash(url) + "-",
     label_url = item_url + "app-label/",
     icontag = row_data.type.replace(/[^a-zA-Z0-9]+/g, "-") + "-icon",
     icon_url = icon_urlbase + icontag + "/",
     item_manifest = icon_url + " " + label_url,
     focus_item_url = item_url + "onfocus.js",
     open_item_url = item_url + "open.js"

    CORE[focus_item_url] = `() => { [...nodePool["${item_url + "name/"}"]].find(x => x.isConnected).focus() }`
    CORE[open_item_url] = `() => { ${
     is_index
      ? `CORE["https://pilot.parts/programs/locate/window/address.uri"] = "${
         url + (row_data.type === "protocol" ? "/" : "")
        }"`
      : `
  CORE["https://pilot.parts/programs/relate/window/selection.uri"] = "${
   url + (row_data.type === "protocol" ? "/" : "")
  }";
  CORE["https://pilot.parts/programs/relate/task/onpointerdown.js"]();
  [...nodePool["https://pilot.parts/programs/relate/window/"]].find(x => x.isConnected).focus()
 `
    } }`
    for (const key in header) {
     const keyurl = item_url + key + "/"
     CORE[keyurl + "?onfocus"] = focus_item_url
     row_data.manifest.push(keyurl)
     if (key === "name") {
      cell(label_url, label_css(["folder", "domain"].includes(row_data.type) ? name.slice(0, -1) : name))
      cell(keyurl, "" + item_layout, item_manifest)
      CORE[keyurl + "?oncontextmenu"] = keyurl + "oncontextmenu.js"
      CORE[
       keyurl + "oncontextmenu.js"
      ] = `({ clientX: x, clientY: y }) =>{ CORE["https://pilot.parts/context-menu/position.json"] = JSON.stringify({ x, y }); CORE["https://pilot.parts/context-menu/open.txt"] = "1"; [...nodePool["https://pilot.parts/context-menu/"]].find(x => x.isConnected).focus() }`
     } else {
      cell(keyurl, label_css(row_data[key + (key === "size" ? "_label" : "")]))
     }
     click(keyurl, undefined, open_item_url)
    }
    file_list.push(row_data)
   }
   CORE["https://pilot.parts/programs/locate/window/status/file_count.txt"] = file_count
   CORE["https://pilot.parts/programs/locate/window/status/folder_count.txt"] = folder_count
   CORE["https://pilot.parts/programs/locate/window/status/kireji_count.txt"] = kireji_count
   file_list.sort((a, b) => {
    const c =
     a[K[0]] > b[K[0]] === O[K[0]]
      ? 1
      : a[K[0]] === b[K[0]]
      ? a[K[1]] > b[K[1]] === O[K[1]]
        ? 1
        : a[K[1]] === b[K[1]]
        ? a[K[2]] > b[K[2]] === O[K[2]]
          ? 1
          : a[K[2]] === b[K[2]]
          ? 0
          : -1
        : -1
      : -1
    return c
   })
   url_list.push(...file_list.map(({ manifest }) => manifest).flat())
   return url_list.join(" ")
  })
 ).slice(7, -1),
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?address":
  "https://pilot.parts/programs/locate/window/address.uri",
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?cell":
  "https://core.parts/components/cell/construct.js",
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?click":
  "https://core.parts/components/click/construct.js",
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?archive":
  "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri.a.js",
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?fx":
  "https://pilot.parts/programs/locate/window/status/fx.uri",
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?header_json":
  "https://pilot.parts/programs/locate/window/explorer-view/header/list.json",
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?item_layout":
  "https://pilot.parts/programs/locate/window/explorer-view/item_layout.css",
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?label_css":
  "https://pilot.parts/programs/locate/window/explorer-view/label_css.js",
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?show_kireji":
  "https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt",
 "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri?sort_order":
  "https://pilot.parts/programs/locate/window/sort_order.json",
 "https://pilot.parts/programs/locate/window/explorer-view/header/?layout":
  "https://pilot.parts/programs/locate/window/explorer-view/header/layout.css",
 "https://pilot.parts/programs/locate/window/explorer-view/header/?manifest":
  "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri",
 "https://pilot.parts/programs/locate/window/explorer-view/header/filler/?layout":
  "https://pilot.parts/programs/locate/window/explorer-view/header/filler/layout.css",
 "https://pilot.parts/programs/locate/window/explorer-view/header/filler/layout.css":
  ":host { background: #c3c3c3; box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb }",
 "https://pilot.parts/programs/locate/window/explorer-view/header/item_layout.css":
  "\n  :host {\n   position: relative;\n   width: 100%;\n   text-overflow: ellipsis;\n   overflow: hidden;\n   white-space: nowrap;\n   line-height: 18px;\n  }\n  :host::before {\n   vertical-align: center;\n   margin-left: 6px;\n   width: calc(100% - 22px);\n  }",
 "https://pilot.parts/programs/locate/window/explorer-view/header/layout.css.a.js":
  'return `:host {\n   display: grid;\n   width: 100%;\n   grid-template-columns: ${JSON.parse(""+name_width).w}px ${JSON.parse("" + type_width).w}px ${JSON.parse("" + size_width).w}px 1fr;\n  }`',
 "https://pilot.parts/programs/locate/window/explorer-view/header/layout.css?archive":
  "https://pilot.parts/programs/locate/window/explorer-view/header/layout.css.a.js",
 "https://pilot.parts/programs/locate/window/explorer-view/header/layout.css?name_width":
  "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/position.json",
 "https://pilot.parts/programs/locate/window/explorer-view/header/layout.css?size_width":
  "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/position.json",
 "https://pilot.parts/programs/locate/window/explorer-view/header/layout.css?type_width":
  "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/position.json",
 "https://pilot.parts/programs/locate/window/explorer-view/header/list.json":
  '{"name":"Name","type":"Type","size":"Size"}',
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest-fx.uri.a.js":
  'return Object.keys(JSON.parse(""+sort_order)).map(key => `https://pilot.parts/programs/locate/window/explorer-view/header/${key}-button/layout.css`).join(" ")',
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest-fx.uri?archive":
  "https://pilot.parts/programs/locate/window/explorer-view/header/manifest-fx.uri.a.js",
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest-fx.uri?sort_order":
  "https://pilot.parts/programs/locate/window/sort_order.json",
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri.a.js":
  '\n  const header_obj = JSON.parse("" + headers), urls = []\n  const string_order = "" + sort_order, my_order = JSON.parse(string_order), first_key = Object.keys(my_order)[0], first_dir = my_order[first_key];\n  Object.keys(header_obj).forEach((key, i, arr) => {\n   button(\n    urls[i] = "https://pilot.parts/programs/locate/window/explorer-view/header/" + key + "-button/",\n    `${item_layout}\n    :host::before {\n     content: "${header_obj[key]}";\n    }${first_key === key ? `\n    :host::after {\n     --size: 8px;\n     position: absolute;\n     right: 5px;\n     top: 5px;\n     width: var(--size);\n     height: var(--size);\n     content: "${ first_dir ? "▼" : "▲" }";\n     font-size: var(--size);\n     line-height: var(--size);\n     text-align: center;\n     vertical-align: center;\n    }`: ``}`,\n    `${urls[i]}resize/`,\n    `() => {\n     let order = ${string_order};\n     const\n      keys = Object.keys(order),\n      key = "${key}",\n      keyplace = keys.indexOf(key);\n     if (keyplace !== 0) {\n      keys.splice(keyplace, 1);\n      keys.unshift(key);\n      order = keys.reduce((o, k) => (o[k]=order[k],o), {})\n     }\n     order[key] = (keyplace !== 0) || !order[key];\n     CORE["${sort_order.headerOf().href}"] = JSON.stringify(order)\n    }`\n   )\n  })\n  urls.push("https://pilot.parts/programs/locate/window/explorer-view/header/filler/")\n  return urls.join(" ")',
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri?button":
  "https://core.parts/components/button/construct.js",
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri?archive":
  "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri.a.js",
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri?fx":
  "https://pilot.parts/programs/locate/window/explorer-view/header/manifest-fx.uri",
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri?headers":
  "https://pilot.parts/programs/locate/window/explorer-view/header/list.json",
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri?item_layout":
  "https://pilot.parts/programs/locate/window/explorer-view/header/item_layout.css",
 "https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri?sort_order":
  "https://pilot.parts/programs/locate/window/sort_order.json",
 "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/position.json":
  '{ "w": 128, "range": { "w": [0] } }',
 "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/position.json?fx":
  "https://pilot.parts/programs/locate/window/explorer-view/column-fx.uri",
 "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/resize/?base":
  "https://pilot.parts/programs/locate/window/explorer-view/header/resize/",
 "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/resize/?onpointerdown":
  "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/resize/onpointerdown.js",
 "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/resize/onpointerdown.js?base":
  "https://pilot.parts/programs/locate/window/explorer-view/header/resize/onpointerdown.js",
 "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/resize/onpointerdown.js?position":
  "https://pilot.parts/programs/locate/window/explorer-view/header/name-button/position.json",
 "https://pilot.parts/programs/locate/window/explorer-view/header/resize/?layout":
  "https://pilot.parts/programs/locate/window/explorer-view/header/resize/layout.css",
 "https://pilot.parts/programs/locate/window/explorer-view/header/resize/?onclick":
  "https://pilot.parts/programs/locate/window/explorer-view/header/resize/onclick.js",
 "https://pilot.parts/programs/locate/window/explorer-view/header/resize/layout.css":
  "\n  :host {\n   z-index: 1;\n   position: absolute;\n   right: -4px;\n   width: 8px;\n   cursor: col-resize;\n   top: 0;\n   bottom: 0;\n  }",
 "https://pilot.parts/programs/locate/window/explorer-view/header/resize/onclick.js": "e => { e.stopPropagation() }",
 "https://pilot.parts/programs/locate/window/explorer-view/header/resize/onpointerdown.js?base":
  "https://core.parts/behaviors/resize/onpointerdown.js",
 "https://pilot.parts/programs/locate/window/explorer-view/header/resize/onpointerdown.js?mode":
  "https://core.parts/behaviors/resize/right-.txt",
 "https://pilot.parts/programs/locate/window/explorer-view/header/resize/onpointerdown.js?stop_propagation":
  "https://core.parts/const/one.txt",
 "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/position.json":
  '{ "w": 96, "range": { "w": [0] } }',
 "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/position.json?fx":
  "https://pilot.parts/programs/locate/window/explorer-view/column-fx.uri",
 "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/resize/?base":
  "https://pilot.parts/programs/locate/window/explorer-view/header/resize/",
 "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/resize/?onpointerdown":
  "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/resize/onpointerdown.js",
 "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/resize/onpointerdown.js?base":
  "https://pilot.parts/programs/locate/window/explorer-view/header/resize/onpointerdown.js",
 "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/resize/onpointerdown.js?position":
  "https://pilot.parts/programs/locate/window/explorer-view/header/size-button/position.json",
 "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/position.json":
  '{ "w": 64, "range": { "w": [0] } }',
 "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/position.json?fx":
  "https://pilot.parts/programs/locate/window/explorer-view/column-fx.uri",
 "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/resize/?base":
  "https://pilot.parts/programs/locate/window/explorer-view/header/resize/",
 "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/resize/?onpointerdown":
  "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/resize/onpointerdown.js",
 "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/resize/onpointerdown.js?base":
  "https://pilot.parts/programs/locate/window/explorer-view/header/resize/onpointerdown.js",
 "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/resize/onpointerdown.js?position":
  "https://pilot.parts/programs/locate/window/explorer-view/header/type-button/position.json",
 "https://pilot.parts/programs/locate/window/explorer-view/item_layout.css":
  "\n  :host {\n   position: relative;\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n   padding: 2px 0;\n   overflow: hidden;\n   box-sizing: border-box;\n   padding-right: 6px;\n  }\n  :host>:first-child {\n   --size: 16px;\n   margin-right: 4px\n  }\n  :host(:focus) {\n   background: silver;\n   width: min-content;\n   background: #00007f;\n   color: white;\n   outline: 1px dotted black;\n  }",
 "https://pilot.parts/programs/locate/window/explorer-view/label_css.js":
  'x => `:host { overflow: hidden; text-overflow: ellipsis; line-height: 18px } :host::before { content: "${x}" }`',
 "https://pilot.parts/programs/locate/window/explorer-view/layout.css":
  "\n  :host {\n   position: relative;\n   flex: 1 1;\n   box-shadow: -0.5px -0.5px 0 0.5px black, 0 0 0 1px #dbdbdb, -0.5px -0.5px 0 1.5px #7a7a7a, 0 0 0 2px white;\n   background: white;\n   margin: 2px;\n   display: grid;\n   grid-template-rows: 18px 1fr;\n   overflow: hidden;\n   height: 100%;\n  }",
 "https://pilot.parts/programs/locate/window/explorer-view/manifest.uri":
  "https://pilot.parts/programs/locate/window/explorer-view/header/ https://pilot.parts/programs/locate/window/explorer-view/files/",
 "https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt": "0",
 "https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt.fx.uri":
  "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri https://pilot.parts/programs/locate/window/status/layout.css https://pilot.parts/programs/locate/window/tool-bar/manifest.uri https://pilot.parts/programs/locate/window/tool-bar/toggle-kireji/layout.css",
 "https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt?fx":
  "https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt.fx.uri",
 "https://pilot.parts/programs/locate/window/layout.css.a.js":
  '\n  const\n   common = `\n    position: absolute;\n    display: flex;\n    flex-flow: column nowrap;\n    gap: 2px;\n    background: #c3c3c3;\n    box-sizing: border-box;`,\n   titlebar = ("" + active) === "1" ? `title-bar {\n    background: rgb(0, 0, 163);\n   }` : ``;     \n  if (("" + maximized) === "1") {\n   return `\n    :host {\n     position: absolute;\n     top: 0;\n     left: 0;\n     right: 0;\n     bottom: 28px;\n     padding: 2px;\n     ${common};\n    }\n    ${titlebar}\n   `\n  } else {\n   const { x = 0, y = 0, w = 0, h = 0 } = JSON.parse("" + position);\n   return `\n    :host {\n     width: ${w}px;\n     height: ${h}px;\n     left: ${x}px;\n     top: ${y}px;\n     min-height: fit-content;\n     padding: 4px;\n     background: #c3c3c3;\n     box-shadow:\n      inset -1px -1px black,\n      inset 1px 1px #c3c3c3,\n      inset -2px -2px #7a7a7a,\n      inset 2px 2px white,\n      5px 7px 3px #0002;\n     ${common};\n    }\n    ${titlebar}\n   `\n  }',
 "https://pilot.parts/programs/locate/window/layout.css?active":
  "https://pilot.parts/programs/locate/window/active.txt",
 "https://pilot.parts/programs/locate/window/layout.css?archive":
  "https://pilot.parts/programs/locate/window/layout.css.a.js",
 "https://pilot.parts/programs/locate/window/layout.css?maximized":
  "https://pilot.parts/programs/locate/window/maximized.txt",
 "https://pilot.parts/programs/locate/window/layout.css?position":
  "https://pilot.parts/programs/locate/window/position.json",
 "https://pilot.parts/programs/locate/window/manifest.uri.a.js":
  'const [title_url, tools_url, explorer_url, status_url, transform_url, position_url] = [title, tools, explorer, status, transform_path, position].map(x => x.headerOf().href)\nconst transform_urls = transform(transform_url, position_url, "nesw", title_url);\nreturn [title_url, tools_url, explorer_url, status_url, transform_urls].join(" ")',
 "https://pilot.parts/programs/locate/window/manifest.uri?archive":
  "https://pilot.parts/programs/locate/window/manifest.uri.a.js",
 "https://pilot.parts/programs/locate/window/manifest.uri?explorer":
  "https://pilot.parts/programs/locate/window/explorer-view/",
 "https://pilot.parts/programs/locate/window/manifest.uri?position":
  "https://pilot.parts/programs/locate/window/position.json",
 "https://pilot.parts/programs/locate/window/manifest.uri?status": "https://pilot.parts/programs/locate/window/status/",
 "https://pilot.parts/programs/locate/window/manifest.uri?title":
  "https://pilot.parts/programs/locate/window/title-bar/",
 "https://pilot.parts/programs/locate/window/manifest.uri?tools":
  "https://pilot.parts/programs/locate/window/tool-bar/",
 "https://pilot.parts/programs/locate/window/manifest.uri?transform":
  "https://core.parts/components/transform/construct.js",
 "https://pilot.parts/programs/locate/window/manifest.uri?transform_path":
  "https://pilot.parts/programs/locate/window/transform/",
 "https://pilot.parts/programs/locate/window/maximized.txt": "0",
 "https://pilot.parts/programs/locate/window/maximized.txt?fx":
  "https://pilot.parts/programs/locate/window/maximized/fx.uri",
 "https://pilot.parts/programs/locate/window/maximized/fx.uri":
  "https://pilot.parts/programs/locate/window/layout.css https://pilot.parts/programs/locate/window/controls/manifest.uri https://pilot.parts/programs/locate/window/title-bar/ondblclick.js",
 "https://pilot.parts/programs/locate/window/minimized.txt": "0",
 "https://pilot.parts/programs/locate/window/minimized.txt?fx":
  "https://pilot.parts/programs/locate/window/minimized/fx.uri",
 "https://pilot.parts/programs/locate/window/minimized/fx.uri":
  "https://pilot.parts/manifest.uri https://pilot.parts/programs/locate/window/active.txt https://pilot.parts/programs/locate/task/onpointerdown.js",
 "https://pilot.parts/programs/locate/window/onfocus.js?active":
  "https://pilot.parts/programs/locate/window/active.txt",
 "https://pilot.parts/programs/locate/window/onfocus.js?base": "https://pilot.parts/programs/relate/window/onfocus.js",
 "https://pilot.parts/programs/locate/window/onfocus.js?window": "https://pilot.parts/programs/locate/window/",
 "https://pilot.parts/programs/locate/window/position.json":
  '\n  {\n   "x": 136, "y": 118, "w": 412, "h": 245,\n   "range": {\n    "x": [-64, 512],\n    "y": [-2, 256],\n    "w": [96, 256],\n    "h": [64, 128]\n   }\n  }',
 "https://pilot.parts/programs/locate/window/position.json?fx":
  "https://pilot.parts/programs/locate/window/position/fx.uri",
 "https://pilot.parts/programs/locate/window/position/fx.uri": "https://pilot.parts/programs/locate/window/layout.css",
 "https://pilot.parts/programs/locate/window/sort-order-fx.uri":
  "https://pilot.parts/programs/locate/window/explorer-view/files/manifest.uri https://pilot.parts/programs/locate/window/explorer-view/header/manifest.uri https://pilot.parts/programs/locate/window/explorer-view/header/manifest-fx.uri",
 "https://pilot.parts/programs/locate/window/sort_order.json":
  '\n  {\n   "size": false,\n   "type": true,\n   "name": false\n  }',
 "https://pilot.parts/programs/locate/window/sort_order.json?fx":
  "https://pilot.parts/programs/locate/window/sort-order-fx.uri",
 "https://pilot.parts/programs/locate/window/status/?layout":
  "https://pilot.parts/programs/locate/window/status/layout.css",
 "https://pilot.parts/programs/locate/window/status/file_count.txt": "0",
 "https://pilot.parts/programs/locate/window/status/file_count.txt?fx":
  "https://pilot.parts/programs/locate/window/status/fx.uri",
 "https://pilot.parts/programs/locate/window/status/folder_count.txt": "5",
 "https://pilot.parts/programs/locate/window/status/folder_count.txt?fx":
  "https://pilot.parts/programs/locate/window/status/fx.uri",
 "https://pilot.parts/programs/locate/window/status/fx.uri":
  "https://pilot.parts/programs/locate/window/status/layout.css",
 "https://pilot.parts/programs/locate/window/status/kireji_count.txt": "0",
 "https://pilot.parts/programs/locate/window/status/kireji_count.txt?fx":
  "https://pilot.parts/programs/locate/window/status/fx.uri",
 "https://pilot.parts/programs/locate/window/status/layout.css.a.js":
  '\n   const\n    num_files = parseInt("" + file_count),\n    has_files = !!num_files,\n    num_folders = parseInt("" + folder_count),\n    has_folders = !!num_folders,\n    do_kireji = ("" + show_kireji) === "1",\n    num_kireji = do_kireji ? parseInt("" + kireji_count) : undefined,\n    has_kireji = do_kireji ? !!num_kireji : undefined,\n    status_items = [];\n   if (has_folders) status_items.push(`${folder_count} folder${num_folders === 1 ? "" : "s"}`)\n   if (has_files) status_items.push(`${file_count} file${num_files === 1 ? "" : "s"}`)\n   if (has_kireji) status_items.push(`${kireji_count} kireji`)\n   return `\n    :host {\n     padding: 0 3px;\n     height: 17px;\n     box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a;\n     display: flex;\n     flex-flow: row nowrap;\n     align-items: center;\n    }\n    :host::after {\n     content: "${status_items.join(", ")}"\n    }\n   `;',
 "https://pilot.parts/programs/locate/window/status/layout.css?archive":
  "https://pilot.parts/programs/locate/window/status/layout.css.a.js",
 "https://pilot.parts/programs/locate/window/status/layout.css?file_count":
  "https://pilot.parts/programs/locate/window/status/file_count.txt",
 "https://pilot.parts/programs/locate/window/status/layout.css?folder_count":
  "https://pilot.parts/programs/locate/window/status/folder_count.txt",
 "https://pilot.parts/programs/locate/window/status/layout.css?kireji_count":
  "https://pilot.parts/programs/locate/window/status/kireji_count.txt",
 "https://pilot.parts/programs/locate/window/status/layout.css?show_kireji":
  "https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt",
 "https://pilot.parts/programs/locate/window/title-bar/?layout":
  "https://pilot.parts/programs/locate/window/title-bar/layout.css",
 "https://pilot.parts/programs/locate/window/title-bar/?manifest":
  "https://pilot.parts/programs/locate/window/title-bar/manifest.uri",
 "https://pilot.parts/programs/locate/window/title-bar/?ondblclick":
  "https://pilot.parts/programs/locate/window/title-bar/ondblclick.js",
 "https://pilot.parts/programs/locate/window/title-bar/layout.css":
  "\n  :host {\n   background: #7f7f7f;\n   color: white;\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n   gap: 3px;\n   height: 18px;\n   padding: 0px 2px;\n   box-sizing: border-box;\n  }\n  app-icon {\n   width: 16px;\n   height: 16px\n  }",
 "https://pilot.parts/programs/locate/window/title-bar/manifest.uri":
  "https://pilot.parts/icons/folder-icon/ https://pilot.parts/programs/locate/app-label/ https://core.parts/flex-spacer/ https://pilot.parts/programs/locate/window/controls/",
 "https://pilot.parts/programs/locate/window/title-bar/ondblclick.a.js":
  "return `() => { CORE['https://pilot.parts/programs/locate/window/controls/${(\"\"+maximized) === '1' ? 'restore' : 'maximize'}-button/onclick.js']() }`",
 "https://pilot.parts/programs/locate/window/title-bar/ondblclick.js?archive":
  "https://pilot.parts/programs/locate/window/title-bar/ondblclick.a.js",
 "https://pilot.parts/programs/locate/window/title-bar/ondblclick.js?maximized":
  "https://pilot.parts/programs/locate/window/maximized.txt",
 "https://pilot.parts/programs/locate/window/tool-bar/?layout":
  "https://pilot.parts/programs/locate/window/tool-bar/layout.css",
 "https://pilot.parts/programs/locate/window/tool-bar/?manifest":
  "https://pilot.parts/programs/locate/window/tool-bar/manifest.uri",
 "https://pilot.parts/programs/locate/window/tool-bar/layout.css":
  "\n  :host {\n   height: 18px;\n   display: flex;\n   flex-flow: row nowrap;\n   gap: 4px;\n   align-items: center;\n   padding: 2px;\n  }\n  :host > * {\n   box-shadow:\n  }",
 "https://pilot.parts/programs/locate/window/tool-bar/manifest.uri.a.js": (
  "" +
  (() => {
   const common_css =
     ":host { cursor: pointer; --size: 16px; min-width: calc(var(--size) + 4px); padding: 2px; height: calc(var(--size) + 4px); font-size: var(--size); line-height: var(--size); display: flex; flex-flow: row nowrap } :host::before { content: '' } :host::after { padding: 0 2px; font-size: 11px }",
    common_url = "https://pilot.parts/programs/locate/window/tool-bar/"
   return [
    [
     common_url + "go-up/",
     common_css + ":host::before { content: '📁' } :host::after { content: 'Enclosing Folder' }",
     "",
     `() => { const url = ("" + CORE["https://pilot.parts/programs/locate/window/address.uri"]).match(${/^.*?(?=[^/]*\/*$)/})[0]; CORE["https://pilot.parts/programs/locate/window/address.uri"] = url }`
    ],
    [
     common_url + "toggle-kireji/",
     common_css +
      `:host::before { content: '🔗' } :host::after { content: '${
       "" + show_kireji === "0" ? "Show" : "Hide"
      } Kireji' }`,
     "",
     `() => { CORE["https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt"] = (CORE["https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt"].toPrimitive() === "1") ? "0" : "1" }`
    ]
   ]
    .map($ => {
     button(...$)
     return $[0]
    })
    .join(" ")
  })
 ).slice(7, -1),
 "https://pilot.parts/programs/locate/window/tool-bar/manifest.uri?button":
  "https://core.parts/components/button/construct.js",
 "https://pilot.parts/programs/locate/window/tool-bar/manifest.uri?archive":
  "https://pilot.parts/programs/locate/window/tool-bar/manifest.uri.a.js",
 "https://pilot.parts/programs/locate/window/tool-bar/manifest.uri?show_kireji":
  "https://pilot.parts/programs/locate/window/explorer-view/show_kireji.txt",
 "https://pilot.parts/programs/prototype/app-icon/layout.css.a.js":
  '\n  return `:host {\n   --size: 16px;\n   width: var(--size);\n   height: var(--size);\n   font-size: var(--size);\n   line-height: var(--size);\n  }\n  :host::before {\n   content: "${character}";\n  }`',
 "https://pilot.parts/programs/prototype/app-label/layout.css.a.js":
  '\n  return `:host {\n   margin: 0;\n   height: 16px;\n   vertical-align: center;\n   text-overflow: ellipsis;\n   overflow: hidden;\n  }\n  :host::after {\n   content: "${label}";\n   white-space: nowrap;\n  }`',

 "https://pilot.parts/programs/relate/app-icon/?layout": "https://pilot.parts/programs/relate/app-icon/layout.css",
 "https://pilot.parts/programs/relate/app-icon/layout.css":
  '\n  :host {\n   --size: 16px;\n   width: var(--size);\n   height: var(--size);\n   font-size: var(--size);\n   line-height: var(--size);\n  }\n  :host::before {\n   content: "🧬";\n  }',

 "https://pilot.parts/programs/relate/app-label/?layout": "https://pilot.parts/programs/relate/app-label/layout.css",
 "https://pilot.parts/programs/relate/app-label/layout.css":
  '\n  return `:host {\n   margin: 0;\n   height: 16px;\n   vertical-align: center;\n   text-overflow: ellipsis;\n   overflow: hidden;\n  }\n  :host::after {\n   content: "Relate";\n   white-space: nowrap;\n  }`',

 "https://pilot.parts/programs/relate/start-menu-item/?layout":
  "https://pilot.parts/programs/relate/start-menu-item/layout.css",
 "https://pilot.parts/programs/relate/start-menu-item/?manifest":
  "https://pilot.parts/programs/relate/start-menu-item/manifest.uri",
 "https://pilot.parts/programs/relate/start-menu-item/?onclick":
  "https://pilot.parts/programs/relate/task/onpointerdown.js",
 "https://pilot.parts/programs/relate/start-menu-item/app-label/?layout":
  "https://pilot.parts/programs/relate/start-menu-item/app-label/layout.css",
 "https://pilot.parts/programs/relate/start-menu-item/app-label/layout.css":
  ':host::after {\n   height: 24px;\n   content: "Relate";\n  }',
 "https://pilot.parts/programs/relate/start-menu-item/layout.css":
  "\n  :host {\n   position: relative;\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n   padding: 4px 0 }\n  :host(:hover) {\n   background: #00007f;\n   color: white }\n  app-icon {\n   width: 24px;\n   height: 24px;\n   margin: 0 10px;\n   --size: 24px;\n  }",
 "https://pilot.parts/programs/relate/start-menu-item/manifest.uri":
  "https://pilot.parts/programs/relate/app-icon/ https://pilot.parts/programs/relate/start-menu-item/app-label/",

 "https://pilot.parts/programs/relate/task/?layout": "https://pilot.parts/programs/relate/task/layout.css",
 "https://pilot.parts/programs/relate/task/?manifest": "https://pilot.parts/programs/relate/task/manifest.uri",
 "https://pilot.parts/programs/relate/task/?onpointerdown": "https://pilot.parts/programs/relate/task/onpointerdown.js",
 "https://pilot.parts/programs/relate/task/datum.txt": "https://pilot.parts/programs/relate/task/",
 "https://pilot.parts/programs/relate/task/index.txt?archive":
  "https://pilot.parts/programs/locate/task/index.txt.a.js",
 "https://pilot.parts/programs/relate/task/index.txt?datum": "https://pilot.parts/programs/relate/task/datum.txt",
 "https://pilot.parts/programs/relate/task/index.txt?fx": "https://pilot.parts/programs/relate/task/index/fx.uri",
 "https://pilot.parts/programs/relate/task/index.txt?tasks": "https://pilot.parts/tasks.uri",
 "https://pilot.parts/programs/relate/task/index/fx.uri": "https://pilot.parts/programs/relate/window/active.txt",
 "https://pilot.parts/programs/relate/task/layout.css.a.js":
  '\n  return `\n   :host {\n    position: relative;\n    height: 100%;\n    margin: 0;\n    width: 160px;\n    display: flex;\n    flex-flow: row nowrap;\n    gap: 3px;\n    border: none;${("" + open) === "1" ? `\n    font: bold 11px sans-serif` : ``};\n    box-sizing: border-box;\n    padding: ${("" + open) === "0" ? 3 : 4}px 2px 2px;\n    text-align: left;\n    box-shadow: ${("" + open) === "0" ? "inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb" : "inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a"}\n   }\n   :host(:focus)::after {\n    border: 1px dotted black;\n    content: "";\n    position: absolute;\n    margin: 3px;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    pointer-events: none;\n   }\n   ${(""+open) === "1" ? `\n   :host > * {\n    z-index: 3\n   }\n   :host::before {\n    content: "";\n    position: absolute;\n    margin: 2px;\n    border-top: 1px solid white;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    background-image:linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white),linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white);background-size: 2px 2px;background-position: 0 0, 1px 1px;\n   }` : ``}\n   app-icon {\n    width: 16px;\n    height: 16px\n   }\n  `;',
 "https://pilot.parts/programs/relate/task/layout.css?archive":
  "https://pilot.parts/programs/relate/task/layout.css.a.js",
 "https://pilot.parts/programs/relate/task/layout.css?open": "https://pilot.parts/programs/relate/window/active.txt",
 "https://pilot.parts/programs/relate/task/manifest.uri":
  "https://pilot.parts/programs/relate/app-icon/ https://pilot.parts/programs/relate/app-label/",
 "https://pilot.parts/programs/relate/task/manifest.uri?open": "https://pilot.parts/programs/relate/window/active.txt",
 "https://pilot.parts/programs/relate/task/onpointerdown.a.js":
  '\n  const\n   is_minimized = ("" + minimized) === "1",\n   is_inactive = ("" + active) === "0",\n   minimized_url = minimized.headerOf().href,\n   active_url = active.headerOf().href,\n   window_url = window.headerOf().href,\n   task_url = task.headerOf().href,\n   put_task = `\n    const\n     tasks_uri = "https://pilot.parts/tasks.uri",\n     tasks_string = CORE[tasks_uri].toPrimitive(),\n     tasks = tasks_string ? tasks_string.split(" ") : [],\n     own_task = "${task_url}";\n    if (!tasks.includes(own_task)) {\n     tasks.push(own_task)\n     CORE[tasks_uri] = tasks.join(" ")\n    }`,\n   put_in_front = `\n    const\n     windows_uri = "https://pilot.parts/windows.uri",\n     windows_string = CORE[windows_uri].toPrimitive(),\n     windows = windows_string ? windows_string.split(" ") : [],\n     own_window = "${window_url}";\n    if (windows.at(-1) !== own_window) {\n     const window_index = windows.indexOf(own_window);\n     if (window_index !== -1) windows.splice(window_index, 1)\n     windows.push(own_window)\n     CORE[windows_uri] = windows.join(" ")\n    }`;\n  return `\n   e => {\n    e?.stopPropagation();\n    ${put_task}\n    ${ is_minimized ? `\n    CORE["${minimized_url}"] = "0";\n    CORE["${active_url}"] = "1";\n    ${put_in_front}` : is_inactive ? `\n    CORE["${active_url}"] = "1";\n    ${put_in_front}` : `\n    CORE["${active_url}"] = "0";\n    CORE["${minimized_url}"] = "1";`}\n   }\n  `',
 "https://pilot.parts/programs/relate/task/onpointerdown.js?active":
  "https://pilot.parts/programs/relate/window/active.txt",
 "https://pilot.parts/programs/relate/task/onpointerdown.js?archive":
  "https://pilot.parts/programs/relate/task/onpointerdown.a.js",
 "https://pilot.parts/programs/relate/task/onpointerdown.js?minimized":
  "https://pilot.parts/programs/relate/window/minimized.txt",
 "https://pilot.parts/programs/relate/task/onpointerdown.js?task": "https://pilot.parts/programs/relate/task/",
 "https://pilot.parts/programs/relate/task/onpointerdown.js?window": "https://pilot.parts/programs/relate/window/",
 "https://pilot.parts/programs/relate/task/open/fx.uri":
  "https://pilot.parts/programs/relate/task/layout.css https://pilot.parts/taskbar/selected.txt https://pilot.parts/programs/relate/window/layout.css https://pilot.parts/programs/relate/task/onpointerdown.js",

 "https://pilot.parts/programs/relate/window/?layout": "https://pilot.parts/programs/relate/window/layout.css",
 "https://pilot.parts/programs/relate/window/?manifest": "https://pilot.parts/programs/relate/window/manifest.uri",
 "https://pilot.parts/programs/relate/window/?onfocus": "https://pilot.parts/programs/relate/window/onfocus.js",
 "https://pilot.parts/programs/relate/window/active.txt": "1",
 "https://pilot.parts/programs/relate/window/active.txt.a.js":
  "const active = (\"\" + minimized) === '1' ? '0' : (\"\" + selected) === (\"\" + index) ? '1' : '0'; return active;",
 "https://pilot.parts/programs/relate/window/active.txt?archive":
  "https://pilot.parts/programs/relate/window/active.txt.a.js",
 "https://pilot.parts/programs/relate/window/active.txt?fx": "https://pilot.parts/programs/relate/task/open/fx.uri",
 "https://pilot.parts/programs/relate/window/active.txt?index": "https://pilot.parts/programs/relate/task/index.txt",
 "https://pilot.parts/programs/relate/window/active.txt?minimized":
  "https://pilot.parts/programs/relate/window/minimized.txt",
 "https://pilot.parts/programs/relate/window/active.txt?selected": "https://pilot.parts/taskbar/selected.txt",
 "https://pilot.parts/programs/relate/window/anode?base": "https://pilot.parts/programs/relate/window/electrode/",
 "https://pilot.parts/programs/relate/window/cathode/?base": "https://pilot.parts/programs/relate/window/electrode/",

 "https://pilot.parts/programs/relate/window/controls/?layout":
  "https://pilot.parts/programs/relate/window/controls/layout.css",
 "https://pilot.parts/programs/relate/window/controls/?manifest":
  "https://pilot.parts/programs/relate/window/controls/manifest.uri",
 "https://pilot.parts/programs/relate/window/controls/exit-button/?layout":
  "https://pilot.parts/programs/relate/window/controls/exit-button/layout.css",
 "https://pilot.parts/programs/relate/window/controls/exit-button/?onclick":
  "https://pilot.parts/programs/relate/window/controls/exit-button/onclick.js",
 "https://pilot.parts/programs/relate/window/controls/exit-button/?onpointerdown":
  "https://pilot.parts/programs/relate/window/controls/exit-button/onpointerdown.js",
 "https://pilot.parts/programs/relate/window/controls/exit-button/down-fx.uri":
  "https://pilot.parts/programs/relate/window/controls/exit-button/layout.css",
 "https://pilot.parts/programs/relate/window/controls/exit-button/down.txt": "0",
 "https://pilot.parts/programs/relate/window/controls/exit-button/down.txt?fx":
  "https://pilot.parts/programs/relate/window/controls/exit-button/down-fx.uri",
 "https://pilot.parts/programs/relate/window/controls/exit-button/layout.css.a.js":
  "return `\n  :host {\n   position: relative;\n   width: 16px;\n   height: 14px;\n   background: #c3c3c3;\n   margin-left: 2px;\n   box-shadow: ${(\"\"+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'}\n  }\n  :host::before, :host::after {\n   --color: black;\n   content: \"\";\n   display: block;\n   position: absolute;\n   width: 8px;\n   height: 7px;\n   left: 4px;\n   top: 3px;\n   background: linear-gradient(to top left, transparent 0%, transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%), linear-gradient(to top right,  transparent 0%,  transparent calc(50% - 1px), var(--color) calc(50% - 1px), var(--color) calc(50% + 1px),  transparent calc(50% + 1px),  transparent 100%);\n  }\n  :host(:hover)::before {\n   --color: blue\n  }`",
 "https://pilot.parts/programs/relate/window/controls/exit-button/layout.css?archive":
  "https://pilot.parts/programs/relate/window/controls/exit-button/layout.css.a.js",
 "https://pilot.parts/programs/relate/window/controls/exit-button/layout.css?down":
  "https://pilot.parts/programs/relate/window/controls/exit-button/down.txt",
 "https://pilot.parts/programs/relate/window/controls/exit-button/onclick.js?archive":
  "https://core.parts/behaviors/window-close.a.js",
 "https://pilot.parts/programs/relate/window/controls/exit-button/onclick.js?task":
  "https://pilot.parts/programs/relate/task/",
 "https://pilot.parts/programs/relate/window/controls/exit-button/onclick.js?window":
  "https://pilot.parts/programs/relate/window/",
 "https://pilot.parts/programs/relate/window/controls/exit-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/relate/window/controls/exit-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/relate/window/controls/exit-button/release.js'\n  }",
 "https://pilot.parts/programs/relate/window/controls/exit-button/release.js":
  "e => { CORE['https://pilot.parts/programs/relate/window/controls/exit-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/relate/window/controls/layout.css":
  "\n  :host {\n   display: flex;\n   flex-flow: row nowrap\n  }",
 "https://pilot.parts/programs/relate/window/controls/manifest.uri.a.js":
  "return `https://pilot.parts/programs/relate/window/controls/minimize-button/ https://pilot.parts/programs/relate/window/controls/${(\"\"+maximized) === '1' ? 'restore' : 'maximize'}-button/ https://pilot.parts/programs/relate/window/controls/exit-button/`",
 "https://pilot.parts/programs/relate/window/controls/manifest.uri?archive":
  "https://pilot.parts/programs/relate/window/controls/manifest.uri.a.js",
 "https://pilot.parts/programs/relate/window/controls/manifest.uri?maximized":
  "https://pilot.parts/programs/relate/window/maximized.txt",
 "https://pilot.parts/programs/relate/window/controls/maximize-button/?layout":
  "https://pilot.parts/programs/relate/window/controls/maximize-button/layout.css",
 "https://pilot.parts/programs/relate/window/controls/maximize-button/?onclick":
  "https://pilot.parts/programs/relate/window/controls/maximize-button/onclick.js",
 "https://pilot.parts/programs/relate/window/controls/maximize-button/?onpointerdown":
  "https://pilot.parts/programs/relate/window/controls/maximize-button/onpointerdown.js",
 "https://pilot.parts/programs/relate/window/controls/maximize-button/down-fx.uri":
  "https://pilot.parts/programs/relate/window/controls/maximize-button/layout.css",
 "https://pilot.parts/programs/relate/window/controls/maximize-button/down.txt": "0",
 "https://pilot.parts/programs/relate/window/controls/maximize-button/down.txt?fx":
  "https://pilot.parts/programs/relate/window/controls/maximize-button/down-fx.uri",
 "https://pilot.parts/programs/relate/window/controls/maximize-button/layout.css.a.js":
  "return `:host {\n   position: relative;\n   width: 16px;\n   height: 14px;\n   background: #c3c3c3;\n   box-shadow: ${(\"\"+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'}\n  }\n  :host::before {\n   --color: black;\n   display: block;\n   position: absolute;\n   content: \"\";\n   width: 9px;\n   height: 9px;\n   top: 2px;\n   left: 3px;\n   box-shadow: inset 0 2px var(--color), inset 0 0 0 1px var(--color) }\n  :host(:hover)::before {\n   --color: blue }`",
 "https://pilot.parts/programs/relate/window/controls/maximize-button/layout.css?archive":
  "https://pilot.parts/programs/relate/window/controls/maximize-button/layout.css.a.js",
 "https://pilot.parts/programs/relate/window/controls/maximize-button/layout.css?down":
  "https://pilot.parts/programs/relate/window/controls/maximize-button/down.txt",
 "https://pilot.parts/programs/relate/window/controls/maximize-button/onclick.js":
  "\n  () => {\n   CORE['https://pilot.parts/programs/relate/window/maximized.txt'] = '1'\n  }",
 "https://pilot.parts/programs/relate/window/controls/maximize-button/onpointerdown.js":
  "\n  e => {\n   e.stopPropagation(); CORE['https://pilot.parts/programs/relate/window/controls/maximize-button/down.txt'] = '1'\n   CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/relate/window/controls/maximize-button/release.js'\n  }",
 "https://pilot.parts/programs/relate/window/controls/maximize-button/release.js":
  "\n  e => {\n   CORE['https://pilot.parts/programs/relate/window/controls/maximize-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/relate/window/controls/minimize-button/?layout":
  "https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css",
 "https://pilot.parts/programs/relate/window/controls/minimize-button/?onclick":
  "https://pilot.parts/programs/relate/window/controls/minimize-button/onclick.js",
 "https://pilot.parts/programs/relate/window/controls/minimize-button/?onpointerdown":
  "https://pilot.parts/programs/relate/window/controls/minimize-button/onpointerdown.js",
 "https://pilot.parts/programs/relate/window/controls/minimize-button/down-fx.uri":
  "https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css",
 "https://pilot.parts/programs/relate/window/controls/minimize-button/down.txt": "0",
 "https://pilot.parts/programs/relate/window/controls/minimize-button/down.txt?fx":
  "https://pilot.parts/programs/relate/window/controls/minimize-button/down-fx.uri",
 "https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css.a.js":
  "return `:host {\n   position: relative;\n   width: 16px;\n   height: 14px;\n   background: #c3c3c3;\n   box-shadow: ${(\"\"+down) === '1' ? 'inset -1px -1px white, inset 1px 1px black, inset -2px -2px #dbdbdb, inset 2px 2px #7a7a7a' : 'inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb'}\n  }\n  :host::before {\n   --color: black;\n   display: block;\n   position: absolute;\n   content: \"\";\n   width: 6px;\n   height: 2px;\n   background: var(--color);\n   top: 9px;\n   left: 4px }\n  :host(:hover)::before {\n   --color: blue }`",
 "https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css?archive":
  "https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css.a.js",
 "https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css?down":
  "https://pilot.parts/programs/relate/window/controls/minimize-button/down.txt",
 "https://pilot.parts/programs/relate/window/controls/minimize-button/onclick.js":
  "()=>{CORE['https://pilot.parts/programs/relate/window/minimized.txt'] = '1'\n  }",
 "https://pilot.parts/programs/relate/window/controls/minimize-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/relate/window/controls/minimize-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/relate/window/controls/minimize-button/release.js'\n  }",
 "https://pilot.parts/programs/relate/window/controls/minimize-button/release.js":
  "e => { CORE['https://pilot.parts/programs/relate/window/controls/minimize-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/relate/window/controls/restore-button/?layout":
  "https://pilot.parts/programs/relate/window/controls/restore-button/layout.css",
 "https://pilot.parts/programs/relate/window/controls/restore-button/?onclick":
  "https://pilot.parts/programs/relate/window/controls/restore-button/onclick.js",
 "https://pilot.parts/programs/relate/window/controls/restore-button/?onpointerdown":
  "https://pilot.parts/programs/relate/window/controls/restore-button/onpointerdown.js",
 "https://pilot.parts/programs/relate/window/controls/restore-button/down-fx.uri":
  "https://pilot.parts/programs/relate/window/controls/restore-button/layout.css",
 "https://pilot.parts/programs/relate/window/controls/restore-button/down.txt": "0",
 "https://pilot.parts/programs/relate/window/controls/restore-button/down.txt?fx":
  "https://pilot.parts/programs/relate/window/controls/restore-button/down-fx.uri",
 "https://pilot.parts/programs/relate/window/controls/restore-button/layout.css?archive":
  "https://pilot.parts/programs/locate/window/controls/restore-button/layout.css.a.js",
 "https://pilot.parts/programs/relate/window/controls/restore-button/layout.css?down":
  "https://pilot.parts/programs/relate/window/controls/restore-button/down.txt",
 "https://pilot.parts/programs/relate/window/controls/restore-button/onclick.js":
  "()=>CORE['https://pilot.parts/programs/relate/window/maximized.txt'] = '0'",
 "https://pilot.parts/programs/relate/window/controls/restore-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/relate/window/controls/restore-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/relate/window/controls/restore-button/release.js'\n  }",
 "https://pilot.parts/programs/relate/window/controls/restore-button/release.js":
  "e => { CORE['https://pilot.parts/programs/relate/window/controls/restore-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/relate/window/core-node/layout.css.a.js": (
  "" +
  (() => {
   const { x = 0, y = 0, w = 0 } = JSON.parse("" + position),
    selected_bool = "" + selected === "1"
   return `
  :host {
   position: absolute;
   top: calc(50% + ${y}px + var(--graph-y));
   left: calc(50% + ${x}px + var(--graph-x));
   width: ${w}px;
   display: flex;
   flex-flow: column nowrap;
   background: #c3c3c3;
   padding-bottom: calc(var(--size) / 2);
   border-radius: calc(var(--size) / 8);
   box-shadow:
    0.5px 0,
    0 0.5px,
    0 -0.5px,
    -0.5px 0,
    inset 0.5px 0,
    inset 0 0.5px,
    inset 0 -0.5px,
    inset -0.5px 0;
  }
  anode- {
   position: absolute;
   right: calc(var(--size) / 2);
   /* top: 0; */
   top: calc(var(--size) / 2);
  }
  horizontal-line {
   margin: calc((var(--size) / 2) - 1px) 0;
  }
  ${
   selected_bool
    ? `:host {
   outline: none;
   background-image: linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white), linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white);
   background-size: 2px 2px;
   background-position: 0 0, 1px 1px;
  }`
    : ""
  }
  :host > title-bar {
   --bg: #7f7f7f;
  }
  :host(:focus) > title-bar {
   --bg: var(--focus-color);
  }
 `
  })
 ).slice(7, -1),
 "https://pilot.parts/programs/relate/window/core-node/layout.css?archive":
  "https://pilot.parts/programs/relate/window/core-node/layout.css.a.js",
 "https://pilot.parts/programs/relate/window/core-node/manifest.uri?cell":
  "https://core.parts/components/cell/construct.js",
 "https://pilot.parts/programs/relate/window/core-node/manifest.uri?click":
  "https://core.parts/components/click/construct.js",
 "https://pilot.parts/programs/relate/window/core-node/manifest.uri?archive":
  "https://pilot.parts/programs/relate/window/core-node/manifest.a.js",
 "https://pilot.parts/programs/relate/window/core-node/manifest.uri?item_layout":
  "https://pilot.parts/programs/locate/window/explorer-view/header/item_layout.css",
 "https://pilot.parts/programs/relate/window/core-node/manifest.uri?label_css":
  "https://pilot.parts/programs/locate/window/explorer-view/label_css.js",
 "https://pilot.parts/programs/relate/window/core-node/position.json.a.js":
  "return JSON.stringify({ w: 9 * 18, range: { w: [5 * 18] }, snap: { x: 9, y: 9 } })",
 "https://pilot.parts/programs/relate/window/core-node/position.json?archive":
  "https://pilot.parts/programs/relate/window/core-node/position.json.a.js",
 "https://pilot.parts/programs/relate/window/electrode/?layout":
  "https://pilot.parts/programs/relate/window/electrode/layout.css",
 "https://pilot.parts/programs/relate/window/electrode/layout.css":
  '\n   :host {\n    --overlay: transparent;\n    display: inline-block;\n    width: var(--size);\n    height: var(--size);\n    background-image:\n     linear-gradient(45deg, var(--overlay) 25%, transparent 25%, transparent 75%, var(--overlay) 75%, var(--overlay)),\n     linear-gradient(45deg, var(--overlay) 25%, transparent 25%, transparent 75%, var(--overlay) 75%, var(--overlay));\n    background-size: 2px 2px;\n    background-position: 0 0, 1px 1px;\n   }\n   :host(:hover) {\n    --overlay: yellow;\n    cursor: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" style="font-size: 32px; line-height: 32px"><text y="32">✍</text></svg>\') 1 30, pointer;\n   }',

 "https://pilot.parts/programs/relate/window/graph/?layout":
  "https://pilot.parts/programs/relate/window/graph/layout.css",
 "https://pilot.parts/programs/relate/window/graph/?manifest":
  "https://pilot.parts/programs/relate/window/graph/manifest.uri",
 "https://pilot.parts/programs/relate/window/graph/?onpointerdown":
  "https://pilot.parts/programs/relate/window/graph/onpointerdown.js",
 "https://pilot.parts/programs/relate/window/graph/?onwheel":
  "https://pilot.parts/programs/relate/window/graph/onwheel.js",
 "https://pilot.parts/programs/relate/window/graph/layout.css.a.js":
  '\n   const { x = 0, y = 0 } = JSON.parse("" + position)\n   return `\n    :host {\n     --size: 18px;\n     --paper-color: #c3c3c3;;\n     --focus-color: rgb(0, 0, 163);\n     --graph-x: ${x}px;\n     --graph-y: ${y}px;\n     --white-grid: url("data:image/png;base64,${white_grid}");\n     --blue-grid: url("data:image/png;base64,${blue_grid}");\n     --halftone-a: black;\n     --halftone-b: transparent;\n     --halftone-size: 2px;\n     --halftone:\n      linear-gradient(\n       45deg,\n       var(--halftone-a) 25%,\n       var(--halftone-b) 25%,\n       var(--halftone-b) 75%,\n       var(--halftone-a) 75%,\n       var(--halftone-a)\n      ) calc(50% + ${x}px) calc(50% + ${y}px) / var(--halftone-size) var(--halftone-size),\n      linear-gradient(\n       45deg,\n       var(--halftone-a) 25%,\n       var(--halftone-b) 25%,\n       var(--halftone-b) 75%,\n       var(--halftone-a) 75%,\n       var(--halftone-a)\n      ) calc(var(--halftone-size) / 2 + 50% + ${x}px) calc(var(--halftone-size) / 2 + 50% + ${y}px) / var(--halftone-size) var(--halftone-size);\n     position: relative;\n     flex: 1 1;\n     box-shadow:\n      -0.5px -0.5px 0 0.5px black,\n      0 0 0 1px #dbdbdb,\n      -0.5px -0.5px 0 1.5px #7a7a7a,\n      0 0 0 2px white;\n     background: var(--paper-color);\n     margin: 2px;\n     display: grid;\n     overflow: hidden;\n     height: 100%;\n     /* cursor: all-scroll */;\n     background: var(--halftone);\n     --halftone-size: calc(var(--size) / 8);\n     --halftone-a: #334246ff;\n     --halftone-b: #3342467f;\n     cursor: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" style="font-size: 32px; line-height: 32px"><text y="28">🥢</text></svg>\') 2 30, pointer;\n    }\n    :host > * {\n     --size: inherit;\n     --paper-color: inherit;\n    }\n   `',
 "https://pilot.parts/programs/relate/window/graph/layout.css?blue_grid": "https://core.parts/img/blue-grid.png",
 "https://pilot.parts/programs/relate/window/graph/layout.css?archive":
  "https://pilot.parts/programs/relate/window/graph/layout.css.a.js",
 "https://pilot.parts/programs/relate/window/graph/layout.css?position":
  "https://pilot.parts/programs/relate/window/graph/position.json",
 "https://pilot.parts/programs/relate/window/graph/layout.css?zoom":
  "https://pilot.parts/programs/relate/window/graph/zoom.txt",
 "https://pilot.parts/programs/relate/window/graph/layout.css?white_grid": "https://core.parts/img/white-grid.png",

 "https://pilot.parts/programs/relate/window/graph/manifest.uri?source":
  "https://pilot.parts/programs/relate/graphs/source.uri",
 "https://pilot.parts/programs/relate/window/graph/manifest.uri?node_list":
  "https://pilot.parts/programs/relate/window/graph/nodes.uri",
 "https://pilot.parts/programs/relate/window/graph/manifest.uri?archive":
  "https://pilot.parts/programs/relate/window/graph/manifest.uri.a.js",
 "https://pilot.parts/programs/relate/window/graph/manifest.uri?transform":
  "https://core.parts/components/transform/construct.js",

 "https://pilot.parts/programs/relate/window/graph/onwheel.js":
  "" +
  (e => {
   if (e.ctrlKey) return
   if (globalThis.dampen_wheel) {
    console.warn("dampened wheel")
    return
   }
   globalThis.dampen_wheel = true
   e.preventDefault()
   const speed_factor = 1 / 1000,
    folder_url = Ψ.protocol + Ψ.host + "/" + Ψ.path,
    zoom_url = folder_url + "zoom.txt",
    source_uri = "https://pilot.parts/programs/relate/graphs/" + "zoom.txt"
   CORE["https://pilot.parts/programs/relate/window/graph/zoom.txt"] = Math.min(
    Math.max(
     parseFloat("" + CORE["https://pilot.parts/programs/relate/window/graph/zoom.txt"]) * (1 + e.deltaY * speed_factor),
     0.01
    ),
    100
   )
   console.log("wheeling", e.deltaY, "" + CORE["https://pilot.parts/programs/relate/window/graph/zoom.txt"])
   globalThis.dampen_wheel = false
  }),
 "https://pilot.parts/programs/relate/window/graph/onpointerdown.js?archive":
  "https://pilot.parts/programs/relate/window/graph/move_graph.js",
 "https://pilot.parts/programs/relate/window/graph/onpointerdown.js?source":
  "https://pilot.parts/programs/relate/graphs/source.uri",
 "https://pilot.parts/programs/relate/window/graph/onpointerdown.js?mode": "https://core.parts/behaviors/move.txt",
 "https://pilot.parts/programs/relate/window/graph/onpointerdown.js?should_focus": "https://core.parts/const/zero.txt",
 "https://pilot.parts/programs/relate/window/graph/onpointerdown.js?stop_propagation":
  "https://core.parts/const/zero.txt",
 "https://pilot.parts/programs/relate/window/graph/onpointerdown.js?position":
  "https://pilot.parts/programs/relate/window/graph/position.json",

 "https://pilot.parts/programs/relate/window/graph/move_graph.js": (
  "" +
  (() => {
   const input_url = position.headerOf().href,
    source_url = source + "position.json",
    transformer_url = "https://core.parts/behaviors/resize/transformer.js",
    output_properties = {
     move: "[north_south_pan, east_west_pan]",
     "n-resize": "north_resize",
     "s-resize": "south_resize",
     "e-resize": "east_resize",
     "w-resize": "west_resize",
     "ne-resize": "[north_resize, east_resize]",
     "se-resize": "[south_resize, east_resize]",
     "nw-resize": "[north_resize, west_resize]",
     "sw-resize": "[south_resize, west_resize]"
    }[mode],
    stop = "" + stop_propagation === "1" ? `event.stopPropagation(); event.preventDefault()` : ``,
    focus = "" + should_focus === "1" ? `event.target.focus();` : ``
   if (!output_properties) throw "bad mode: " + mode
   return `event => {
 console.log('box selection here?')
 const hash = CORE["https://core.parts/base-part/hash.js"];
 const selection_url = "https://pilot.parts/programs/relate/window/graph/selection.uri", selection_string = '' + CORE[selection_url], selection_list = selection_string ? selection_string.split(' ') : []
 CORE[selection_url] = ''
 for (const selection_url of selection_list) {
  const node_url = \`https://pilot.parts/programs/relate/window/graph/\${hash("${source} " + selection_url + " node")}/node/\`
  CORE[node_url + 'selected.txt'] = '0'
 }
 const
  { clientX: x, clientY: y } = event,
  { x: X = 0, y: Y = 0, w: W = 0, h: H = 0, range = { }, snap = { } } = JSON.parse(CORE["${input_url}"].toPrimitive()),
  { x: rx = [], y: ry = [], w: rw = [], h: rh = [] } = range,
  { x: sx = 1, y: sy = 1 } = snap,
  [min_x = -Infinity, max_x = Infinity] = rx,
  [min_y = -Infinity, max_y = Infinity] = ry,
  [min_w = -Infinity, max_w = Infinity] = rw,
  [min_h = -Infinity, max_h = Infinity] = rh,
  original_properties = ${"`x: ${X}, y: ${Y}, w: ${W}, h: ${H}, range: { x: [${rx}], y: [${ry}], w: [${rw}], h: [${rh}] }, snap: { x: ${sx} , y: ${sy} }`"},
  north_south_pan = ${"`y: Math.max(${min_y}, ${Y} - ${y} + y)`"},
  east_west_pan = ${"`x: Math.max(${min_x}, ${X} - ${x} + x)`"},
  north_resize = [north_south_pan,${"`h: Math.max(${min_h}, ${H} + (${y} - y))`"}].join(", "),
  south_resize = ${"`h: Math.max(${min_h}, ${H} - (${y} - y))`"},
  east_resize = ${"`w: Math.max(${min_w}, ${W} - (${x} - x))`"},
  west_resize = [east_west_pan, ${"`w: Math.max(${min_w}, ${W} + (${x} - x))`"}].join(", "),
  properties = [original_properties, ${output_properties}].join(", ");
 ${stop}
 ${focus}
 CORE["${transformer_url}"] = \`({ clientX: x, clientY: y }) => {
  const object = {\${properties}};
  if (!object.x) delete object.x
  if (!object.y) delete object.y
  if (!object.h) delete object.h
  if (!object.w) delete object.w
  if (!object.snap.x) delete object.snap.x
  else {
   if ("x" in object) object.x = Math.round(object.x / object.snap.x) * object.snap.x
   if ("w" in object) object.w = Math.round(object.w / object.snap.x) * object.snap.x
  }
  if (!object.snap.y) delete object.snap.y
  else {
   if ("y" in object) object.y = Math.round(object.y / object.snap.y) * object.snap.y
   if ("h" in object) object.h = Math.round(object.h / object.snap.y) * object.snap.y
  }
  if (!Object.keys(object.snap).length) delete object.snap
  if (!object.range.x.length) delete object.range.x
  if (!object.range.y.length) delete object.range.y
  if (!object.range.w.length) delete object.range.w
  if (!object.range.h.length) delete object.range.h
  if (!Object.keys(object.range).length) delete object.range
  CORE["${input_url}"] = CORE["${source_url}"] = JSON.stringify(object)
 }\`
 CORE["https://core.parts/behaviors/grab/src.uri"] = "${transformer_url}";
}`
  })
 ).slice(7, -1),
 "https://pilot.parts/programs/relate/graphs/?archive": "https://core.parts/behaviors/copy-from-source.js",
 "https://pilot.parts/programs/relate/graphs/?destination":
  "https://pilot.parts/programs/relate/graphs/destination.uri",
 "https://pilot.parts/programs/relate/graphs/destination.uri": "https://pilot.parts/programs/relate/window/graph/",
 "https://pilot.parts/programs/relate/graphs/?source": "https://pilot.parts/programs/relate/graphs/source.uri",
 "https://pilot.parts/programs/relate/graphs/source.uri": "https://pilot.parts/programs/relate/graphs/default/",
 "https://pilot.parts/programs/relate/graphs/source.uri?fx":
  "https://pilot.parts/programs/relate/window/graph/regraph.uri",
 "https://pilot.parts/programs/relate/window/graph/regraph.uri":
  "https://pilot.parts/programs/relate/window/graph/nodes.uri https://pilot.parts/programs/relate/window/graph/position.json https://pilot.parts/programs/relate/window/graph/manifest.uri https://pilot.parts/programs/relate/window/graph/onpointerdown.js",

 "https://pilot.parts/programs/relate/window/graph/manifest.uri.a.js": (
  "" +
  (() => {
   const node_base_url = "https://pilot.parts/programs/relate/window/core-node/",
    subjects_string = "" + node_list,
    kireji_urls = new Set(subjects_string ? subjects_string.split(" ") : undefined),
    kireji_node_urls = new Set(),
    graph_url = "https://pilot.parts/programs/relate/window/graph/",
    result_urls = [...kireji_urls].map(address => {
     const node_url = `${graph_url}${hash(source + " " + address + " node")}/node/`,
      transform_url = node_url + "transform/",
      position_url = `${node_url}position.json`,
      selected_url = `${node_url}selected.txt`,
      reposition_url = `${node_url}reposition.uri`,
      layout_url = `${node_url}layout.css`
     kireji_node_urls.add(node_url)
     if ("" + CORE[`${node_url}?base`] === node_base_url) return node_url
     CORE[`${node_url}?base`] = node_base_url
     CORE[`${node_url}?layout`] = layout_url
     CORE[`${node_url}?onpointerdown`] = `${node_url}onpointerdown.js`
     CORE[`${node_url}?manifest`] = `${node_url}manifest.uri`
     CORE[`${node_url}layout.css?base`] = `${node_base_url}layout.css`
     CORE[`${node_url}layout.css?position`] = position_url
     CORE[`${node_url}layout.css?selected`] = selected_url
     CORE[selected_url] = "0"
     CORE[reposition_url] = layout_url
     CORE[`${node_url}onpointerdown.js?base`] = `${node_base_url}onpointerdown.js`
     CORE[`${node_url}onpointerdown.js?position`] = position_url
     CORE[`${node_url}manifest.uri?base`] = `${node_base_url}manifest.uri`
     CORE[`${node_url}manifest.uri?expand`] = `${node_url}expand.txt`
     CORE[`${node_url}expand.txt`] = "0"
     CORE[`${node_url}expand.txt?fx`] = `${node_url}onexpand.uri`
     CORE[`${node_url}onexpand.uri`] = `${node_url}manifest.uri`
     CORE[`${node_url}manifest.uri?node`] = node_url
     CORE[`${node_url}manifest.uri?proxy`] = address
     CORE[`${node_url}manifest.uri?word`] = address
     CORE[`${node_url}position.json?base`] = `${node_base_url}position.json`
     CORE[reposition_url] = `${node_url}layout.css`
     CORE[`${node_url}position.json?fx`] = CORE[`${selected_url}?fx`] = reposition_url
     transform(transform_url, position_url, "ew")
     return node_url
    })
   return result_urls.join(" ")
  })
 ).slice(7, -1),
 "https://pilot.parts/programs/relate/window/core-node/manifest.a.js": (
  "" +
  (() => {
   const {
     href,
     groups: { type }
    } = proxy.headerOf(),
    is_index = href.endsWith("/"),
    crumbs = href.replace(/^https:\/\//, "").split("/"),
    path_length = crumbs.length,
    file_crumb_index = path_length - (1 + is_index),
    path = crumbs.slice(0, file_crumb_index + is_index).join("/") + "/",
    is_expanded = "" + expand === "1",
    filename = crumbs[file_crumb_index],
    common_label = `:host {
   margin: 0 calc(var(--size) / 8);
   line-height: inherit;
  }`,
    common_item = `:host {
   display: flex;
   flex-flow: row nowrap;
   height: var(--size);
   align-items: center;
   line-height: var(--size);
  }`,
    cathode_url = "https://pilot.parts/programs/relate/window/cathode/",
    anode_url = "https://pilot.parts/programs/relate/window/anode",
    node_url = node.headerOf().href,
    title_url = node_url + "title-bar/",
    icon_url = "https://pilot.parts/icons/" + type.replace(/[^a-zA-Z0-9]+/g, "-") + "-icon/",
    label_url = node_url + "title-bar/label/",
    path_url = node_url + "title-bar/path/",
    resize_left_url = node_url + "transform/left-/",
    resize_right_url = node_url + "transform/right-/",
    toggle_url = node_url + "collapse-button/",
    toggle_open_url = toggle_url + "expand.js",
    toggle_css_url = toggle_url + "layout.css"
   cell(
    label_url,
    `
 ${label_css(filename)}
 ${common_label}
 :host {
  margin-left: 0;
 }`
   )
   cell(toggle_url, toggle_css_url, undefined, true)
   CORE[toggle_css_url] = `:host::before {
  content: "${"" + expand === "1" ? "－" : "＋"}";
  cursor: pointer;
  width: var(--size);
  height: var(--size);
 }`
   CORE[toggle_open_url] = `()=>{
  CORE["${expand.headerOf().href}"] = "${"" + expand === "1" ? 0 : 1}"
 }`
   click(toggle_url, toggle_open_url)
   cell(
    path_url,
    `
 ${label_css(path)}
 ${common_label}
 :host {
  font-weight: normal;
  flex: 1 1;
  margin-right: 0;
 }`
   )
   const parts = [toggle_url]
   if ("" + expand === "1") {
    parts.push(path_url)
   } else {
    parts.push("https://core.parts/flex-spacer/")
   }
   parts.push(label_url, icon_url)
   cell(
    title_url,
    `
 ${item_layout}
 ${common_item}
 :host {
  text-align: right;
  position: relative;
  box-sizing: border-box;
  justify-content: end;
  height: calc(1.5 * var(--size));
  padding: calc(var(--size) / 2);
  padding-bottom: 0;
  align-items: stretch;
  font-weight: bold;
 }
 :host > :nth-child(2) {
  --size: inherit;
 }`,
    parts.join(" ")
   )
   const keys = new Set()
   if (!is_expanded) return [title_url, anode_url, resize_left_url, resize_right_url].join(" ")

   for (const url in 𝑧) {
    if (!url.match(/^[^?]*\?\w*$/)) continue
    const [base, π] = url.split("?")
    if (keys.has(π)) continue
    if (href === base) {
     keys.add(π)
    }
   }

   return [
    title_url,
    "https://pilot.parts/horizontal-line/",
    ...[...keys].map(kireji => {
     const cell_url = node_url + hash(`${href}?${kireji}`) + "/kireji/",
      label_url = cell_url + "label/"
     cell(
      label_url,
      `
   ${label_css(kireji)}
   ${common_label}
   :host {
    margin-left: 0;
    box-sizing: border-box;
    flex: 1 1;
   }`
     )
     cell(
      cell_url,
      `
   ${item_layout}
   ${common_item}`,
      cathode_url + " " + label_url
     )
     return cell_url
    }),
    anode_url,
    resize_left_url,
    resize_right_url
   ].join(" ")
  })
 ).slice(7, -1),
 "https://pilot.parts/programs/relate/window/core-node/onpointerdown.js":
  "" +
  (event => {
   event.stopPropagation()
   event.preventDefault()
   if (event.button === 2) {
    console.warn("right click here")
    return
   }
   const properties = {},
    transformer_url = "https://core.parts/behaviors/resize/transformer.js",
    selection_url = "https://pilot.parts/programs/relate/window/graph/selection.uri",
    source_url = "" + CORE["https://pilot.parts/programs/relate/graphs/source.uri"],
    { clientX: x, clientY: y } = event,
    shift_url = "https://core.parts/behaviors/shift.txt",
    selection_string = "" + CORE[selection_url],
    actual_node_url = 𝑥.slice(0, -16),
    hash = CORE["https://core.parts/base-part/hash.js"],
    target_node_url = CORE[actual_node_url + "manifest.uri"].word.headerOf().href
   let selection_list = selection_string ? selection_string.split(" ") : []
   const target_index = selection_list.indexOf(target_node_url)
   if ("" + CORE[shift_url] === "1") {
    if (target_index === -1) {
     selection_list.push(target_node_url)
     CORE[actual_node_url + "selected.txt"] = "1"
     console.log("add target")
    } else {
     selection_list.splice(target_index, 1)
     CORE[actual_node_url + "selected.txt"] = "0"
     console.log("remove target")
    }
    CORE[selection_url] = CORE[source_url + "selection.uri"] = selection_list.join(" ")
   } else if (target_index === -1 && selection_string !== target_node_url) {
    CORE[selection_url] = CORE[source_url + "selection.uri"] = target_node_url
    for (const selection_url of selection_list) {
     const node_url = `https://pilot.parts/programs/relate/window/graph/${hash(
      source_url + " " + selection_url + " node"
     )}/node/`
     CORE[node_url + "selected.txt"] = "0"
    }
    selection_list = [target_node_url]
    CORE[actual_node_url + "selected.txt"] = "1"
   }

   for (const selection_url of selection_list) {
    const node_url = `https://pilot.parts/programs/relate/window/graph/${hash(
     source_url + " " + selection_url + " node"
    )}/node/`
    const position_url = node_url + "position.json"
    const {
      x: X = 0,
      y: Y = 0,
      w: W = 0,
      h: H = 0,
      range = {},
      snap = {}
     } = JSON.parse(CORE[position_url].toPrimitive()),
     { x: rx = [], y: ry = [], w: rw = [], h: rh = [] } = range,
     { x: sx = 1, y: sy = 1 } = snap,
     [min_x = -Infinity, max_x = Infinity] = rx,
     [min_y = -Infinity, max_y = Infinity] = ry,
     [min_w = -Infinity, max_w = Infinity] = rw,
     [min_h = -Infinity, max_h = Infinity] = rh

    properties[position_url] = `{
   x: Math.max(${min_x}, ${X} - ${x} + x),
   y: Math.max(${min_y}, ${Y} - ${y} + y),
   w: ${W},
   h: ${H},
   range: {
    x: [${rx}],
    y: [${ry}],
    w: [${rw}],
    h: [${rh}]
   },
   snap: {
    x: ${sx},
    y: ${sy}
   }
  }`
   }
   event.target.focus()
   CORE[transformer_url] = `({ clientX: x, clientY: y }) => {
  const object_list = {
   ${Object.entries(properties)
    .map(([key, json]) => `"${key}":${json}`)
    .join(",")}
  }
  for (const url in object_list) {
   const object = object_list[url]
   if (!object.x) delete object.x
   if (!object.y) delete object.y
   if (!object.h) delete object.h
   if (!object.w) delete object.w
   if (!object.snap.x) delete object.snap.x
   else {
    if ("x" in object) object.x = Math.round(object.x / object.snap.x) * object.snap.x
    if ("w" in object) object.w = Math.round(object.w / object.snap.x) * object.snap.x
   }
   if (!object.snap.y) delete object.snap.y
   else {
    if ("y" in object) object.y = Math.round(object.y / object.snap.y) * object.snap.y
    if ("h" in object) object.h = Math.round(object.h / object.snap.y) * object.snap.y
   }
   if (!Object.keys(object.snap).length) delete object.snap
   if (!object.range.x.length) delete object.range.x
   if (!object.range.y.length) delete object.range.y
   if (!object.range.w.length) delete object.range.w
   if (!object.range.h.length) delete object.range.h
   if (!Object.keys(object.range).length) delete object.range
   CORE[url] = JSON.stringify(object)
  }
 }`
   CORE["https://core.parts/behaviors/grab/src.uri"] = transformer_url
  }),
 "https://pilot.parts/programs/relate/window/graph/selection.uri?base": "https://pilot.parts/programs/relate/graphs/",

 "https://pilot.parts/programs/relate/window/graph/nodes.uri?base": "https://pilot.parts/programs/relate/graphs/",
 "https://pilot.parts/programs/relate/window/graph/nodes.uri?fx":
  "https://pilot.parts/programs/relate/window/graph/renode.uri",
 "https://pilot.parts/programs/relate/window/graph/renode.uri":
  "https://pilot.parts/programs/relate/window/graph/manifest.uri",

 "https://pilot.parts/programs/relate/window/graph/position.json?base": "https://pilot.parts/programs/relate/graphs/",
 "https://pilot.parts/programs/relate/window/graph/position.json?fx":
  "https://pilot.parts/programs/relate/window/graph/reposition.uri",
 "https://pilot.parts/programs/relate/window/graph/reposition.uri":
  "https://pilot.parts/programs/relate/window/graph/layout.css",

 "https://pilot.parts/programs/relate/window/graph/zoom.txt?base": "https://pilot.parts/programs/relate/graphs/",
 "https://pilot.parts/programs/relate/window/graph/zoom.txt?fx":
  "https://pilot.parts/programs/relate/window/graph/rezoom.uri",
 "https://pilot.parts/programs/relate/window/graph/rezoom.uri":
  "https://pilot.parts/programs/relate/window/graph/layout.css",

 "https://pilot.parts/programs/relate/graphs/default/position.json": '{ "x": -82, "y": -91 }',
 "https://pilot.parts/programs/relate/graphs/default/zoom.txt": "2",
 "https://pilot.parts/programs/relate/graphs/default/nodes.uri":
  "https://kireji.app/demo/hello.txt https://pilot.parts/programs/relate/window/layout.css",
 "https://pilot.parts/programs/relate/graphs/default/selection.uri": "",

 "https://pilot.parts/programs/relate/graphs/graph-1/position.json": '{ "x": -79, "y": -182 }',
 "https://pilot.parts/programs/relate/graphs/graph-1/zoom.txt": "1",
 "https://pilot.parts/programs/relate/graphs/graph-1/nodes.uri":
  "https://pilot.parts/programs/relate/window/manifest.uri https://pilot.parts/",
 "https://pilot.parts/programs/relate/graphs/graph-1/selection.uri": "",

 "https://pilot.parts/programs/relate/window/layout.css.a.js":
  '\n  const\n   common = `\n    position: absolute;\n    display: flex;\n    flex-flow: column nowrap;\n    gap: 2px;\n    background: #c3c3c3;\n    box-sizing: border-box;`,\n   titlebar = ("" + active) === "1" ? `title-bar {\n    background: rgb(0, 0, 163);\n   }` : ``;\n  if (("" + maximized) === \'1\') {\n   return `\n    :host {\n     position: absolute;\n     top: 0;\n     left: 0;\n     right: 0;\n     bottom: 28px;\n     padding: 2px;\n     ${common}\n    }\n    ${titlebar}`\n  } else {\n   const { x = 0, y = 0, w = 0, h = 0 } = JSON.parse("" + position);\n   return `\n    :host {\n     width: ${w}px;\n     height: ${h}px;\n     left: ${x}px;\n     top: ${y}px;\n     min-height: fit-content;\n     padding: 4px;\n     background: #c3c3c3;\n     box-shadow:\n      inset -1px -1px black,\n      inset 1px 1px #c3c3c3,\n      inset -2px -2px #7a7a7a,\n      inset 2px 2px white,\n      5px 7px 3px #0002;\n     ${common}\n    }\n    ${titlebar}`\n  }',
 "https://pilot.parts/programs/relate/window/layout.css?active":
  "https://pilot.parts/programs/relate/window/active.txt",
 "https://pilot.parts/programs/relate/window/layout.css?archive":
  "https://pilot.parts/programs/relate/window/layout.css.a.js",
 "https://pilot.parts/programs/relate/window/layout.css?maximized":
  "https://pilot.parts/programs/relate/window/maximized.txt",
 "https://pilot.parts/programs/relate/window/layout.css?position":
  "https://pilot.parts/programs/relate/window/position.json",
 "https://pilot.parts/programs/relate/window/manifest.uri.a.js":
  'const [title_url, graph_url, tools_url, transform_url, position_url] = [title, graph, tools, transform_path, position].map(x => x.headerOf().href)\nconst transform_urls = transform(transform_url, position_url, "nesw", title_url);\nreturn [title_url, tools_url, graph_url, transform_urls].join(" ")',
 "https://pilot.parts/programs/relate/window/manifest.uri?archive":
  "https://pilot.parts/programs/relate/window/manifest.uri.a.js",
 "https://pilot.parts/programs/relate/window/manifest.uri?graph": "https://pilot.parts/programs/relate/window/graph/",
 "https://pilot.parts/programs/relate/window/manifest.uri?tools":
  "https://pilot.parts/programs/relate/window/tool-bar/",
 "https://pilot.parts/programs/relate/window/manifest.uri?position":
  "https://pilot.parts/programs/relate/window/position.json",
 "https://pilot.parts/programs/relate/window/manifest.uri?title":
  "https://pilot.parts/programs/relate/window/title-bar/",
 "https://pilot.parts/programs/relate/window/manifest.uri?transform":
  "https://core.parts/components/transform/construct.js",
 "https://pilot.parts/programs/relate/window/manifest.uri?transform_path":
  "https://pilot.parts/programs/relate/window/transform/",
 "https://pilot.parts/programs/relate/window/maximized.txt": "1",
 "https://pilot.parts/programs/relate/window/maximized.txt?fx":
  "https://pilot.parts/programs/relate/window/maximized/fx.uri",
 "https://pilot.parts/programs/relate/window/maximized/fx.uri":
  "https://pilot.parts/programs/relate/window/layout.css https://pilot.parts/programs/relate/window/controls/manifest.uri https://pilot.parts/programs/relate/window/title-bar/ondblclick.js",
 "https://pilot.parts/programs/relate/window/minimized.txt": "0",
 "https://pilot.parts/programs/relate/window/minimized.txt?fx":
  "https://pilot.parts/programs/relate/window/minimized/fx.uri",
 "https://pilot.parts/programs/relate/window/minimized/fx.uri":
  "https://pilot.parts/manifest.uri https://pilot.parts/programs/relate/window/active.txt https://pilot.parts/programs/relate/task/onpointerdown.js",
 "https://pilot.parts/programs/relate/window/onfocus.js?active":
  "https://pilot.parts/programs/relate/window/active.txt",
 "https://pilot.parts/programs/relate/window/onfocus.js?archive": "https://core.parts/behaviors/window-focus.a.js",
 "https://pilot.parts/programs/relate/window/onfocus.js?window": "https://pilot.parts/programs/relate/window/",
 "https://pilot.parts/programs/relate/window/position.json":
  '\n  {\n   "x": 128,\n   "y": 128,\n   "w": 256,\n   "h": 256,\n   "range": {\n    "x": [-64, 512],\n    "y": [-2, 256],\n    "w": [96, 256],\n    "h": [64, 128]\n   }\n  }',
 "https://pilot.parts/programs/relate/window/position.json?fx":
  "https://pilot.parts/programs/relate/window/position/fx.uri",
 "https://pilot.parts/programs/relate/window/position/fx.uri": "https://pilot.parts/programs/relate/window/layout.css",
 "https://pilot.parts/programs/relate/window/title-bar/?layout":
  "https://pilot.parts/programs/relate/window/title-bar/layout.css",
 "https://pilot.parts/programs/relate/window/title-bar/?manifest":
  "https://pilot.parts/programs/relate/window/title-bar/manifest.uri",
 "https://pilot.parts/programs/relate/window/title-bar/?ondblclick":
  "https://pilot.parts/programs/relate/window/title-bar/ondblclick.js",
 "https://pilot.parts/programs/relate/window/title-bar/layout.css":
  "\n  :host {\n   background: #7f7f7f;\n   color: white;\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n   gap: 3px;\n   height: 18px;\n   padding: 0px 2px;\n   box-sizing: border-box;\n  }\n  app-icon {\n   width: 16px;\n   height: 16px;\n  }",
 "https://pilot.parts/programs/relate/window/title-bar/manifest.uri":
  "https://pilot.parts/programs/relate/app-icon/ https://pilot.parts/programs/relate/app-label/ https://core.parts/flex-spacer/ https://pilot.parts/programs/relate/window/controls/",
 "https://pilot.parts/programs/relate/window/title-bar/ondblclick.a.js":
  "return `() => { CORE['https://pilot.parts/programs/relate/window/controls/${(\"\"+maximized) === '1' ? 'restore' : 'maximize'}-button/onclick.js']() }`",
 "https://pilot.parts/programs/relate/window/title-bar/ondblclick.js?archive":
  "https://pilot.parts/programs/relate/window/title-bar/ondblclick.a.js",
 "https://pilot.parts/programs/relate/window/title-bar/ondblclick.js?maximized":
  "https://pilot.parts/programs/relate/window/maximized.txt",
 "https://pilot.parts/programs/locate/window/tool-bar/?layout":
  "https://pilot.parts/programs/locate/window/tool-bar/layout.css",
 "https://pilot.parts/programs/relate/window/tool-bar/?layout":
  "https://pilot.parts/programs/relate/window/tool-bar/layout.css",
 "https://pilot.parts/programs/relate/window/tool-bar/?manifest":
  "https://pilot.parts/programs/relate/window/tool-bar/manifest.uri",
 "https://pilot.parts/programs/relate/window/tool-bar/layout.css":
  "\n  :host {\n   height: 18px;\n   display: flex;\n   flex-flow: row nowrap;\n   gap: 4px;\n   align-items: center;\n   padding: 2px;\n  }\n  :host > * {\n   box-shadow:\n  }",
 "https://pilot.parts/programs/relate/window/graph/layout.js":
  "" +
  (node_position_urls => {
   const node_positions = {},
    gravity = -0.1,
    energy = 5,
    last_i = node_position_urls.length - 1

   for (let i = 0; i <= last_i; i++) {
    const node_position_url = node_position_urls[i],
     node_position = JSON.parse("" + CORE[node_position_url]),
     node_force = (node_position.force = { x: node_position.x * gravity, y: node_position.y * gravity })

    if (!("x" in node_position)) node_position.x = 0
    if (!("y" in node_position)) node_position.y = 0
    if (i)
     for (const previous_node_position_url in node_positions) {
      const previous_node_position = node_positions[previous_node_position_url],
       previous_node_force = previous_node_position.force,
       { x: xx, y: xy, w: xw, h: xh = 100 } = node_position,
       { x: yx, y: yy, w: yw, h: yh = 100 } = previous_node_position,
       dir_x = yx + yw / 2 - (xx + xw / 2),
       dir_y = yy + yh / 2 - (xy + xh / 2),
       dir_mag = (dir_x ** 8 + dir_y ** 8) ** 0.25,
       force_x = ((dir_mag === 0 ? Math.random() : (energy * dir_x) / dir_mag) * (xw + yw)) / 2,
       force_y = ((dir_mag === 0 ? Math.random() : (energy * dir_y) / dir_mag) * (xh + yh)) / 2

      node_force.x -= force_x
      node_force.y -= force_y
      previous_node_force.x += force_x
      previous_node_force.y += force_y
     }

    node_positions[node_position_url] = node_position
   }

   for (const [url, position] of Object.entries(node_positions)) {
    position.x += position.force.x
    position.y += position.force.y
    delete position.force
    CORE[url] = JSON.stringify(position)
   }

   //console.warn('grab the connection list here')

   /*
 node_positions = Object.fromEntries(subject_urls.map(url => {
  const
   node_url = `${node_path}${hash(source_url + " " + url + " node")}/node/`,
   node_position_url = node_url + 'position.json',
   node_position = JSON.parse('' + CORE[node_position_url]);
  if (!('x' in node_position)) node_position.x = 0
  if (!('y' in node_position)) node_position.y = 0
  node_position.force = { x: node_position.x * gravity, y: node_position.y * gravity }
  return [node_position_url, node_position]
 }));
for (const x_url in node_positions) {
 for (const y_url in node_positions) {
  if (x_url === y_url) continue
  const
   { x: xx, y: xy, w: xw, h: xh = 100 } = node_positions[x_url],
   { x: yx, y: yy, w: yw, h: yh = 100 } = node_positions[y_url];
  let
   dir_x = (yx + yw / 2) - (xx + xw / 2),
   dir_y = (yy + yh / 2) - (xy + xh / 2),
   dir_mag = (dir_x ** 8 + dir_y ** 8) ** 0.25,
   force_x = (dir_mag === 0 ? Math.random() : energy * dir_x / dir_mag) * (xw + yw) / 2,
   force_y = (dir_mag === 0 ? Math.random() : energy * dir_y / dir_mag) * (xh + yh) / 2;
  node_positions[x_url].force.x -= force_x
  node_positions[x_url].force.y -= force_y
  node_positions[y_url].force.x += force_x
  node_positions[y_url].force.y += force_y
 }
}
for (const url in node_positions) {
 const { x, y } = node_positions[url].force
 delete node_positions[url].force
 node_positions[url].x += x
 node_positions[url].y += y
 CORE[url] = JSON.stringify(node_positions[url])
}
/*
// apply force towards center
nodes.forEach(node => {
 node.force = node.pos.copy().mult(-1).mult(gravityConstant)
})
// apply repulsive force between nodes
for (let x = 0; x < nodes.length; x++) {
 for (let y = x + 1; y < nodes.length; y++) {
  dir = nodes[y].pos.copy().sub(nodes[x].pos)
  force = dir.div(dir.mag() * dir.mag())
  force.mult(forceConstant)
  nodes[x].force.add(force.copy().mult(-1))
  nodes[y].force.add(force)
 }
}
// apply forces applied by connections
nodeCon.forEach(con => {
 let node1 = nodes[con[0]]
 let node2 = nodes[con[1]]
 let dis = node1.pos.copy().sub(node2.pos)
 diff = dis.mag() - con[2]
 node1.force.sub(dis)
 node2.force.add(dis)
})
*/
  }),
 "https://pilot.parts/programs/relate/window/playing.txt": "0",
 "https://pilot.parts/programs/relate/window/playing.txt?fx": "https://pilot.parts/programs/relate/window/onplay.uri",
 "https://pilot.parts/programs/relate/window/onplay.uri":
  "https://pilot.parts/programs/relate/window/tool-bar/manifest.uri https://pilot.parts/programs/relate/window/tool-bar/arrange-graph/layout.css",

 "https://pilot.parts/programs/relate/window/tool-bar/manifest.uri.a.js": (
  "" +
  (() => {
   const common_css =
     ":host { cursor: pointer; --size: 16px; min-width: calc(var(--size) + 4px); padding: 2px; height: calc(var(--size) + 4px); font-size: var(--size); line-height: var(--size); display: flex; flex-flow: row nowrap } :host::before { content: '' } :host::after { padding: 0 2px; font-size: 11px }",
    common_url = "https://pilot.parts/programs/relate/window/tool-bar/",
    playing_url = "https://pilot.parts/programs/relate/window/playing.txt",
    playing_graph = "" + CORE[playing_url] === "1"
   return [
    [
     common_url + "arrange-graph/",
     common_css + `:host { width: calc(2 * var(--size)) } :host::before { content: '⧉ ${playing_graph ? "⏸" : "⏵"}' }`,
     "",
     "" +
      (() => {
       const playing_url = "https://pilot.parts/programs/relate/window/playing.txt"
       if (globalThis.loopFreq) {
        cancelAnimationFrame(globalThis.loopFreq)
        delete globalThis.loopFreq
        CORE[playing_url] = "0"
        return
       }
       const node_path = "https://pilot.parts/programs/relate/window/graph/",
        layout = CORE[`${node_path}layout.js`],
        manifest_proxy = CORE[`${node_path}manifest.uri`],
        loop = () => {
         const manifest_string = manifest_proxy.toPrimitive()
         if (manifest_string) layout(manifest_string.split(" ").map(url => url + "position.json"))
         globalThis.loopFreq = requestAnimationFrame(loop)
        }
       CORE[playing_url] = "1"
       loop()
      })
    ],
    [
     common_url + "clear-graph/",
     common_css + `:host::before { content: '*' }`,
     "",
     "" +
      (() => {
       const source_uri = "" + CORE["https://pilot.parts/programs/relate/graphs/source.uri"]
       CORE["https://pilot.parts/programs/relate/window/graph/selection.uri"] = CORE[source_uri + "selection.uri"] = ""
       CORE["https://pilot.parts/programs/relate/window/graph/nodes.uri"] = CORE[source_uri + "nodes.uri"] = ""
       console.warn("garbage cleanup node selection states")
      })
    ],
    [
     common_url + "graph-using/",
     common_css + ":host::before { content: '⭅' }",
     "",
     "" +
      (() => {
       const node_path = "https://pilot.parts/programs/relate/window/graph/",
        selection_string = "" + CORE[`${node_path}selection.uri`],
        selection_list = selection_string ? selection_string.split(" ") : [],
        source_uri = "" + CORE["https://pilot.parts/programs/relate/graphs/source.uri"],
        node_list_uri = `${node_path}nodes.uri`,
        node_list_string = "" + CORE[node_list_uri],
        //layout = CORE[`${node_path}layout.js`],
        node_list = node_list_string ? node_list_string.split(" ") : [],
        node_set = new Set(node_list),
        new_node_list = []
       for (const selection_url of selection_list)
        CORE[selection_url]
         .query(l => (l.root === selection_url ? l.href : undefined))
         .forEach(v => {
          if (node_set.has(v)) return
          node_set.add(v)
          new_node_list.push(v)
         })
       CORE[node_list_uri] = CORE[source_uri + "nodes.uri"] = [...node_set].join(" ")
       /* layout(new_node_list, source_uri, node_path)
   layout(new_node_list, source_uri, node_path)
   layout(new_node_list, source_uri, node_path)
   layout(new_node_list, source_uri, node_path)
   layout(new_node_list, source_uri, node_path)
   layout(new_node_list, source_uri, node_path)
   layout(new_node_list, source_uri, node_path)
   layout(new_node_list, source_uri, node_path) */
      })
    ],
    [
     common_url + "graph-connections/",
     common_css + `:host::before { content: '⮂' }`,
     "",
     "" +
      (() => {
       console.warn("not implimented")
      })
    ],
    [
     common_url + "graph-users/",
     common_css + `:host::before { content: '⭆' }`,
     "",
     "" +
      (() => {
       console.warn("not implimented")
      })
    ],
    [
     common_url + "test-graph-switch/",
     common_css + ":host::before { content: 'swap' }",
     "",
     "" +
      (() => {
       const src_url = "https://pilot.parts/programs/relate/graphs/source.uri",
        old_graph = "" + CORE[src_url],
        url_a = "https://pilot.parts/programs/relate/graphs/graph-1/",
        url_b = "https://pilot.parts/programs/relate/graphs/default/"
       CORE[src_url] = old_graph === url_a ? url_b : url_a
      })
    ]
   ]
    .map($ => {
     button(...$)
     return $[0]
    })
    .join(" ")
  })
 ).slice(7, -1),
 "https://pilot.parts/programs/relate/window/tool-bar/manifest.uri?button":
  "https://core.parts/components/button/construct.js",
 "https://pilot.parts/programs/relate/window/tool-bar/manifest.uri?archive":
  "https://pilot.parts/programs/relate/window/tool-bar/manifest.uri.a.js",
 "https://pilot.parts/programs/relate/window/tool-bar/manifest.uri?show_kireji":
  "https://pilot.parts/programs/relate/window/explorer-view/show_kireji.txt",

 "https://pilot.parts/programs/welcome/app-icon/?layout": "https://pilot.parts/programs/welcome/app-icon/layout.css",
 "https://pilot.parts/programs/welcome/app-icon/layout.css":
  '\n  :host {\n   --size: 16px;\n   width: var(--size);\n   height: var(--size);\n   font-size: var(--size);\n   line-height: var(--size);\n  }\n  :host::before {\n   content: "👋";\n  }',
 "https://pilot.parts/programs/welcome/app-label/?layout": "https://pilot.parts/programs/welcome/app-label/layout.css",
 "https://pilot.parts/programs/welcome/app-label/layout.css":
  '\n  return `:host {\n   margin: 0;\n   height: 16px;\n   vertical-align: center;\n   text-overflow: ellipsis;\n   overflow: hidden;\n  }\n  :host::after {\n   content: "Welcome";\n   white-space: nowrap;\n  }`',
 "https://pilot.parts/programs/welcome/start-menu-item/?layout":
  "https://pilot.parts/programs/welcome/start-menu-item/layout.css",
 "https://pilot.parts/programs/welcome/start-menu-item/?manifest":
  "https://pilot.parts/programs/welcome/start-menu-item/manifest.uri",
 "https://pilot.parts/programs/welcome/start-menu-item/?onclick":
  "https://pilot.parts/programs/welcome/task/onpointerdown.js",
 "https://pilot.parts/programs/welcome/start-menu-item/app-label/?layout":
  "https://pilot.parts/programs/welcome/start-menu-item/app-label/layout.css",
 "https://pilot.parts/programs/welcome/start-menu-item/app-label/layout.css":
  ':host::after {\n   height: 24px;\n   content: "Welcome";\n  }',
 "https://pilot.parts/programs/welcome/start-menu-item/layout.css":
  "\n  :host {\n   position: relative;\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n   padding: 4px 0 }\n  :host(:hover) {\n   background: #00007f;\n   color: white }\n  app-icon {\n   width: 24px;\n   height: 24px;\n   margin: 0 10px;\n   --size: 24px;\n  }",
 "https://pilot.parts/programs/welcome/start-menu-item/manifest.uri":
  "https://pilot.parts/programs/welcome/app-icon/ https://pilot.parts/programs/welcome/start-menu-item/app-label/",
 "https://pilot.parts/programs/welcome/task/?layout": "https://pilot.parts/programs/welcome/task/layout.css",
 "https://pilot.parts/programs/welcome/task/?manifest": "https://pilot.parts/programs/welcome/task/manifest.uri",
 "https://pilot.parts/programs/welcome/task/?onpointerdown":
  "https://pilot.parts/programs/welcome/task/onpointerdown.js",
 "https://pilot.parts/programs/welcome/task/datum.txt": "https://pilot.parts/programs/welcome/task/",
 "https://pilot.parts/programs/welcome/task/index.txt?archive":
  "https://pilot.parts/programs/locate/task/index.txt.a.js",
 "https://pilot.parts/programs/welcome/task/index.txt?datum": "https://pilot.parts/programs/welcome/task/datum.txt",
 "https://pilot.parts/programs/welcome/task/index.txt?fx": "https://pilot.parts/programs/welcome/task/index/fx.uri",
 "https://pilot.parts/programs/welcome/task/index.txt?tasks": "https://pilot.parts/tasks.uri",
 "https://pilot.parts/programs/welcome/task/index/fx.uri": "https://pilot.parts/programs/welcome/window/active.txt",
 "https://pilot.parts/programs/welcome/task/layout.css?archive":
  "https://pilot.parts/programs/relate/task/layout.css.a.js",
 "https://pilot.parts/programs/welcome/task/layout.css?open": "https://pilot.parts/programs/welcome/window/active.txt",
 "https://pilot.parts/programs/welcome/task/manifest.uri":
  "https://pilot.parts/programs/welcome/app-icon/ https://pilot.parts/programs/welcome/app-label/",
 "https://pilot.parts/programs/welcome/task/manifest.uri?open":
  "https://pilot.parts/programs/welcome/window/active.txt",
 "https://pilot.parts/programs/welcome/task/onpointerdown.js?active":
  "https://pilot.parts/programs/welcome/window/active.txt",
 "https://pilot.parts/programs/welcome/task/onpointerdown.js?archive":
  "https://pilot.parts/programs/relate/task/onpointerdown.a.js",
 "https://pilot.parts/programs/welcome/task/onpointerdown.js?minimized":
  "https://pilot.parts/programs/welcome/window/minimized.txt",
 "https://pilot.parts/programs/welcome/task/onpointerdown.js?task": "https://pilot.parts/programs/welcome/task/",
 "https://pilot.parts/programs/welcome/task/onpointerdown.js?window": "https://pilot.parts/programs/welcome/window/",
 "https://pilot.parts/programs/welcome/task/open/fx.uri":
  "https://pilot.parts/programs/welcome/task/layout.css https://pilot.parts/taskbar/selected.txt https://pilot.parts/programs/welcome/window/layout.css https://pilot.parts/programs/welcome/task/onpointerdown.js",
 "https://pilot.parts/programs/welcome/window/?layout": "https://pilot.parts/programs/welcome/window/layout.css",
 "https://pilot.parts/programs/welcome/window/?manifest": "https://pilot.parts/programs/welcome/window/manifest.uri",
 "https://pilot.parts/programs/welcome/window/?onfocus": "https://pilot.parts/programs/welcome/window/onfocus.js",
 "https://pilot.parts/programs/welcome/window/active.txt?archive":
  "https://pilot.parts/programs/relate/window/active.txt.a.js",
 "https://pilot.parts/programs/welcome/window/active.txt?fx": "https://pilot.parts/programs/welcome/task/open/fx.uri",
 "https://pilot.parts/programs/welcome/window/active.txt?index": "https://pilot.parts/programs/welcome/task/index.txt",
 "https://pilot.parts/programs/welcome/window/active.txt?minimized":
  "https://pilot.parts/programs/welcome/window/minimized.txt",
 "https://pilot.parts/programs/welcome/window/active.txt?selected": "https://pilot.parts/taskbar/selected.txt",
 "https://pilot.parts/programs/welcome/window/controls/?layout":
  "https://pilot.parts/programs/welcome/window/controls/layout.css",
 "https://pilot.parts/programs/welcome/window/controls/?manifest":
  "https://pilot.parts/programs/welcome/window/controls/manifest.uri",
 "https://pilot.parts/programs/welcome/window/controls/exit-button/?layout":
  "https://pilot.parts/programs/welcome/window/controls/exit-button/layout.css",
 "https://pilot.parts/programs/welcome/window/controls/exit-button/?onclick":
  "https://pilot.parts/programs/welcome/window/controls/exit-button/onclick.js",
 "https://pilot.parts/programs/welcome/window/controls/exit-button/?onpointerdown":
  "https://pilot.parts/programs/welcome/window/controls/exit-button/onpointerdown.js",
 "https://pilot.parts/programs/welcome/window/controls/exit-button/down-fx.uri":
  "https://pilot.parts/programs/welcome/window/controls/exit-button/layout.css",
 "https://pilot.parts/programs/welcome/window/controls/exit-button/down.txt": "0",
 "https://pilot.parts/programs/welcome/window/controls/exit-button/down.txt?fx":
  "https://pilot.parts/programs/welcome/window/controls/exit-button/down-fx.uri",
 "https://pilot.parts/programs/welcome/window/controls/exit-button/layout.css?archive":
  "https://pilot.parts/programs/relate/window/controls/exit-button/layout.css.a.js",
 "https://pilot.parts/programs/welcome/window/controls/exit-button/layout.css?down":
  "https://pilot.parts/programs/welcome/window/controls/exit-button/down.txt",
 "https://pilot.parts/programs/welcome/window/controls/exit-button/onclick.js?archive":
  "https://core.parts/behaviors/window-close.a.js",
 "https://pilot.parts/programs/welcome/window/controls/exit-button/onclick.js?task":
  "https://pilot.parts/programs/welcome/task/",
 "https://pilot.parts/programs/welcome/window/controls/exit-button/onclick.js?window":
  "https://pilot.parts/programs/welcome/window/",
 "https://pilot.parts/programs/welcome/window/controls/exit-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/welcome/window/controls/exit-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/welcome/window/controls/exit-button/release.js'\n  }",
 "https://pilot.parts/programs/welcome/window/controls/exit-button/release.js":
  "e => { CORE['https://pilot.parts/programs/welcome/window/controls/exit-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/welcome/window/controls/layout.css":
  "\n  :host {\n   display: flex;\n   flex-flow: row nowrap\n  }",
 "https://pilot.parts/programs/welcome/window/controls/manifest.uri":
  "https://pilot.parts/programs/welcome/window/controls/minimize-button/ https://pilot.parts/programs/welcome/window/controls/exit-button/",
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/?layout":
  "https://pilot.parts/programs/welcome/window/controls/minimize-button/layout.css",
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/?onclick":
  "https://pilot.parts/programs/welcome/window/controls/minimize-button/onclick.js",
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/?onpointerdown":
  "https://pilot.parts/programs/welcome/window/controls/minimize-button/onpointerdown.js",
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/down-fx.uri":
  "https://pilot.parts/programs/welcome/window/controls/minimize-button/layout.css",
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/down.txt": "0",
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/down.txt?fx":
  "https://pilot.parts/programs/welcome/window/controls/minimize-button/down-fx.uri",
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/layout.css?archive":
  "https://pilot.parts/programs/relate/window/controls/minimize-button/layout.css.a.js",
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/layout.css?down":
  "https://pilot.parts/programs/welcome/window/controls/minimize-button/down.txt",
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/onclick.js":
  "()=>{CORE['https://pilot.parts/programs/welcome/window/minimized.txt'] = '1'\n  }",
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/onpointerdown.js":
  "e => { e.stopPropagation(); CORE['https://pilot.parts/programs/welcome/window/controls/minimize-button/down.txt'] = '1'; CORE['https://core.parts/behaviors/release/src.uri'] = 'https://pilot.parts/programs/welcome/window/controls/minimize-button/release.js'\n  }",
 "https://pilot.parts/programs/welcome/window/controls/minimize-button/release.js":
  "e => { CORE['https://pilot.parts/programs/welcome/window/controls/minimize-button/down.txt'] = '0'\n  }",
 "https://pilot.parts/programs/welcome/window/layout.css.a.js":
  '\n  const\n   common = `\n    position: absolute;\n    display: flex;\n    flex-flow: column nowrap;\n    gap: 2px;\n    background: #c3c3c3;\n    box-sizing: border-box;`,\n   titlebar = ("" + active) === "1" ? `title-bar {\n    background: rgb(0, 0, 163);\n   }` : ``;\n  const { x = 0, y = 0, w = 0, h = 0 } = JSON.parse("" + position);\n  return `\n   :host {\n    width: ${w}px;\n    height: ${h}px;\n    left: ${x}px;\n    top: ${y}px;\n    min-height: fit-content;\n    padding: 4px;\n    background: #c3c3c3;\n    box-shadow:\n     inset -1px -1px black,\n     inset 1px 1px #c3c3c3,\n     inset -2px -2px #7a7a7a,\n     inset 2px 2px white,\n     5px 7px 3px #0002;\n    ${common}\n   }\n   ${titlebar}`',
 "https://pilot.parts/programs/welcome/window/layout.css?active":
  "https://pilot.parts/programs/welcome/window/active.txt",
 "https://pilot.parts/programs/welcome/window/layout.css?archive":
  "https://pilot.parts/programs/welcome/window/layout.css.a.js",
 "https://pilot.parts/programs/welcome/window/layout.css?position":
  "https://pilot.parts/programs/welcome/window/position.json",
 "https://pilot.parts/programs/welcome/window/manifest.uri.a.js":
  'const [title_url, panel_url, transform_url, position_url] = [title, panel, transform_path, position].map(x => x.headerOf().href)\nconst transform_urls = transform(transform_url, position_url, "", title_url);\nconst urlSet = [title_url, panel_url]\nif (transform_urls) urlSet.push(transform_urls)\nreturn urlSet.join(" ")',
 "https://pilot.parts/programs/welcome/window/manifest.uri?archive":
  "https://pilot.parts/programs/welcome/window/manifest.uri.a.js",
 "https://pilot.parts/programs/welcome/window/manifest.uri?panel": "https://pilot.parts/programs/welcome/window/panel/",
 "https://pilot.parts/programs/welcome/window/manifest.uri?position":
  "https://pilot.parts/programs/welcome/window/position.json",
 "https://pilot.parts/programs/welcome/window/manifest.uri?title":
  "https://pilot.parts/programs/welcome/window/title-bar/",
 "https://pilot.parts/programs/welcome/window/manifest.uri?transform":
  "https://core.parts/components/transform/construct.js",
 "https://pilot.parts/programs/welcome/window/manifest.uri?transform_path":
  "https://pilot.parts/programs/welcome/window/transform/",
 "https://pilot.parts/programs/welcome/window/minimized.txt": "0",
 "https://pilot.parts/programs/welcome/window/minimized.txt?fx":
  "https://pilot.parts/programs/welcome/window/minimized/fx.uri",
 "https://pilot.parts/programs/welcome/window/minimized/fx.uri":
  "https://pilot.parts/manifest.uri https://pilot.parts/programs/welcome/window/active.txt https://pilot.parts/programs/welcome/task/onpointerdown.js",
 "https://pilot.parts/programs/welcome/window/onfocus.js?active":
  "https://pilot.parts/programs/welcome/window/active.txt",
 "https://pilot.parts/programs/welcome/window/onfocus.js?archive": "https://core.parts/behaviors/window-focus.a.js",
 "https://pilot.parts/programs/welcome/window/onfocus.js?window": "https://pilot.parts/programs/welcome/window/",
 "https://pilot.parts/programs/welcome/window/panel/?layout":
  "https://pilot.parts/programs/welcome/window/panel/layout.css",
 "https://pilot.parts/programs/welcome/window/panel/?manifest":
  "https://pilot.parts/programs/welcome/window/panel/manifest.uri",
 "https://pilot.parts/programs/welcome/window/panel/heading/?layout":
  "https://pilot.parts/programs/welcome/window/panel/heading/layout.css",
 "https://pilot.parts/programs/welcome/window/panel/heading/layout.css":
  ':host { display: flex; flex-flow: row nowrap; font-size: 24px; line-height: 24px; } :host::before { content: "Welcome to\\00a0"; font-weight: 300; } :host::after { content: "Pilot"; font-weight: 700; }',
 "https://pilot.parts/programs/welcome/window/panel/layout.css":
  '\n  :host {\n   height: 100%;\n   display: grid;\n   padding: 12px;\n   gap: 12px;\n   grid-template-columns: 1fr 100px;\n   grid-template-rows: 24px 1fr;\n   grid-template-areas:\n    "head head"\n    "tips btns";\n  }\n  heading- {\n   grid-area: head;\n  }',
 "https://pilot.parts/programs/welcome/window/panel/manifest.uri":
  "https://pilot.parts/programs/welcome/window/panel/heading/ https://pilot.parts/programs/welcome/window/panel/tip/ https://pilot.parts/programs/welcome/window/panel/menu/",
 "https://pilot.parts/programs/welcome/window/panel/menu/?base": "",
 "https://pilot.parts/programs/welcome/window/panel/menu/?layout":
  "https://pilot.parts/programs/invite/window/panel/menu/layout.css",
 "https://pilot.parts/programs/welcome/window/panel/menu/?manifest":
  "https://pilot.parts/programs/welcome/window/panel/menu/manifest.uri",
 "https://pilot.parts/programs/welcome/window/panel/menu/manifest.uri.a.js":
  ' const common_url = "https://pilot.parts/programs/locate/window/panel/menu/";\n return [[\n  common_url + "next-tip/",\n  ":host::before { content: \\\'Next Tip\\\'; width: 100%; }",\n  "",\n  `() => { CORE["https://pilot.parts/programs/welcome/window/panel/tip/index.txt"] = (parseInt("" + CORE["https://pilot.parts/programs/welcome/window/panel/tip/index.txt"]) + 1) % parseInt("" + CORE["https://pilot.parts/programs/welcome/window/panel/tip/count.txt"]) }`,\n ]].map(config => { button(...config); return config[0] }).join(" ")',
 "https://pilot.parts/programs/welcome/window/panel/menu/manifest.uri?button":
  "https://core.parts/components/button/construct.js",
 "https://pilot.parts/programs/welcome/window/panel/menu/manifest.uri?archive":
  "https://pilot.parts/programs/welcome/window/panel/menu/manifest.uri.a.js",
 "https://pilot.parts/programs/welcome/window/panel/tip/?layout":
  "https://pilot.parts/programs/welcome/window/panel/tip/layout.css",
 "https://pilot.parts/programs/welcome/window/panel/tip/change.uri":
  "https://pilot.parts/programs/welcome/window/panel/tip/layout.css",
 "https://pilot.parts/programs/welcome/window/panel/tip/count.txt": "22",
 "https://pilot.parts/programs/welcome/window/panel/tip/index.txt": "13",
 "https://pilot.parts/programs/welcome/window/panel/tip/index.txt?fx":
  "https://pilot.parts/programs/welcome/window/panel/tip/change.uri",
 "https://pilot.parts/programs/welcome/window/panel/tip/layout.css.a.js":
  '\n  return `:host {\n   display: grid;\n   grid-template-rows: 32px 1fr;\n   grid-template-columns: 1fr;\n   overflow: hidden;\n   box-sizing: border-box;\n   padding: 12px;\n   background:\n    radial-gradient(circle at center, rgb(255, 255, 65) 1px, transparent 0),\n    radial-gradient(circle at center, rgb(255, 255, 65) 1px, transparent 0),\n    white;\n   background-size: 6px 6px;\n   background-position: 0 0, 3px 3px;\n   box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a;\n  }\n  :host::before {\n   display: grid;\n   content: "Did you know?";\n   font-weight: 700;\n  }\n  :host::after {\n   display: grid;\n   content: "${CORE[`https://pilot.parts/programs/welcome/window/panel/tip/tip-${tip_index}.txt`]}";\n   min-width: 0;\n   white-space: wrap;\n   overflow-y: auto;\n  }`',
 "https://pilot.parts/programs/welcome/window/panel/tip/layout.css?archive":
  "https://pilot.parts/programs/welcome/window/panel/tip/layout.css.a.js",
 "https://pilot.parts/programs/welcome/window/panel/tip/layout.css?tip_index":
  "https://pilot.parts/programs/welcome/window/panel/tip/index.txt",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-0.txt":
  "No matter how much space a file takes up, an exact copy of that file takes up almost no space.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-1.txt": "🔗 Kireji are files that describe other files.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-10.txt":
  "If you immediately know the candle light is fire, the meal was cooked long ago.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-11.txt":
  "To discard a client without saving, simply close the tab it is running in.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-13.txt":
  "This website doesn't have a privacy policy, because it doesn't collect any information.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-14.txt":
  "You can establish your own peer-to-peer connections to socialize, stream multimedia, play multiplayer games, and keep files in sync across tabs, browsers, and devices.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-15.txt":
  "All in-network websites work offline after you visit any one of them just once.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-16.txt":
  "Pilot is bigger on the inside than it is on the outside. You downloaded about 200kb of code from the server.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-17.txt":
  "Lightning flashes, sparks shower, in one blink of your eyes you have missed seeing.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-18.txt":
  "You must complete the journey you began at Kheb. Only then will you be able to find your way to the Great Path.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-19.txt":
  "🔗 Kireji are used to link files to files, such as linking 'archive' constructors to the files that they are archival versions of.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-2.txt":
  "To change which programs open on start up, set the base how you want it and save. Pilot always boots into the last saved state.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-20.txt":
  "In 📁 Locate, right click any file to download it.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-21.txt":
  "A 'archive' is a file used to generate another file.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-3.txt":
  "🧬 Relate is a program that lets you modify any Pilot file using a node editor interface.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-4.txt":
  "Use 📁 Locate to browse all files on this virtual computer.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-5.txt": "Pilot is a website. 📁 Locate is the site map.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-6.txt":
  "This computer is a client. You can open as many different clients as you want.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-7.txt":
  "When the mind is enlightened, the spirit is freed and the body matters not.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-8.txt":
  "There is always a virtual computer running in the background called the server.",
 "https://pilot.parts/programs/welcome/window/panel/tip/tip-9.txt":
  "On your device, there is one virtual computer running per website in the network.",
 "https://pilot.parts/programs/welcome/window/position.json":
  '\n  {\n   "x": 32,\n   "y": 24,\n   "w": 492,\n   "h": 229,\n   "range": {\n    "x": [-64, 512],\n    "y": [-2, 256],\n    "w": [96, 256],\n    "h": [64, 128]\n   }\n  }',
 "https://pilot.parts/programs/welcome/window/position.json?fx":
  "https://pilot.parts/programs/welcome/window/position/fx.uri",
 "https://pilot.parts/programs/welcome/window/position/fx.uri":
  "https://pilot.parts/programs/welcome/window/layout.css",
 "https://pilot.parts/programs/welcome/window/title-bar/?layout":
  "https://pilot.parts/programs/invite/window/title-bar/layout.css",
 "https://pilot.parts/programs/welcome/window/title-bar/?manifest":
  "https://pilot.parts/programs/welcome/window/title-bar/manifest.uri",
 "https://pilot.parts/programs/welcome/window/title-bar/manifest.uri":
  "https://pilot.parts/programs/welcome/app-icon/ https://pilot.parts/programs/welcome/app-label/ https://core.parts/flex-spacer/ https://pilot.parts/programs/welcome/window/controls/",
 "https://pilot.parts/start-menu/open-fx.uri":
  "https://pilot.parts/taskbar/start-button/layout.css https://pilot.parts/taskbar/selected.txt https://pilot.parts/manifest.uri https://pilot.parts/taskbar/start-button/onpointerdown.js",
 "https://pilot.parts/start-menu/open.txt": "0",
 "https://pilot.parts/start-menu/open.txt.a.js": 'return ("" + selected) ==="0" ? "1" : "0"',
 "https://pilot.parts/start-menu/open.txt?archive": "https://pilot.parts/start-menu/open.txt.a.js",
 "https://pilot.parts/start-menu/open.txt?fx": "https://pilot.parts/start-menu/open-fx.uri",
 "https://pilot.parts/start-menu/open.txt?selected": "https://pilot.parts/taskbar/selected.txt",
 "https://pilot.parts/taskbar/?layout": "https://pilot.parts/taskbar/layout.css",
 "https://pilot.parts/taskbar/?manifest": "https://pilot.parts/taskbar/manifest.uri",
 "https://pilot.parts/taskbar/?onpointerdown": "https://pilot.parts/taskbar/onpointerdown.js",
 "https://pilot.parts/taskbar/css-height.txt": "28px",
 "https://pilot.parts/taskbar/css-height/fx.uri":
  "https://core.parts/layout.css https://pilot.parts/taskbar/start-menu/layout.css",
 "https://pilot.parts/taskbar/layout.css":
  "\n  :host {\n   position: relative;\n   width: 100%;\n   box-sizing: border-box;\n   height: 100%;\n   margin: 0;\n   display: flex;\n   flex-flow: row nowrap;\n   gap: 3px;\n   height: 100%;\n   padding: 4px 2px 2px;\n   background: #c3c3c3;\n   box-shadow: inset 0 1px #c3c3c3, inset 0 2px white;\n  }",
 "https://pilot.parts/taskbar/manifest.uri.a.js": (
  "" +
  (() => {
   return `https://pilot.parts/taskbar/start-button/ ${
    "" + running_apps ? running_apps + " " : ""
   }https://core.parts/flex-spacer/ https://pilot.parts/taskbar/tray/`
  })
 ).slice(7, -1),
 "https://pilot.parts/taskbar/manifest.uri?archive": "https://pilot.parts/taskbar/manifest.uri.a.js",
 "https://pilot.parts/taskbar/manifest.uri?running_apps": "https://pilot.parts/tasks.uri",
 "https://pilot.parts/taskbar/onpointerdown.a.js":
  '\n  return `e => {\n   ${"" + selected !== "-1" ? `CORE["${selected.headerOf().href}"] = "-1"` : ``}\n  }`',
 "https://pilot.parts/taskbar/onpointerdown.js?archive": "https://pilot.parts/taskbar/onpointerdown.a.js",
 "https://pilot.parts/taskbar/onpointerdown.js?selected": "https://pilot.parts/taskbar/selected.txt",
 "https://pilot.parts/taskbar/reselect.uri":
  "https://pilot.parts/start-menu/open.txt https://pilot.parts/programs/locate/window/active.txt https://pilot.parts/programs/locate/window/onfocus.js https://pilot.parts/programs/relate/window/active.txt https://pilot.parts/programs/debate/window/active.txt https://pilot.parts/programs/answer/window/active.txt https://pilot.parts/programs/invite/window/active.txt https://pilot.parts/programs/welcome/window/active.txt https://pilot.parts/desktop/onfocus.js https://pilot.parts/taskbar/onpointerdown.js",
 "https://pilot.parts/taskbar/selected.txt": "-1",
 "https://pilot.parts/taskbar/selected.txt.a.js":
  '\n  let wasOn;\n  const result = ""+(""+fx).split(" ").findIndex(x => {\n   const\n    src = caller,\n    isX = x === src;\n   wasOn = 𝑧[src] === "1";\n   return (src && wasOn) ? isX : ("" + CORE[x] === "1");\n  });\n  return result;',
 "https://pilot.parts/taskbar/selected.txt?archive": "https://pilot.parts/taskbar/selected.txt.a.js",
 "https://pilot.parts/taskbar/selected.txt?fx": "https://pilot.parts/taskbar/reselect.uri",
 "https://pilot.parts/taskbar/start-button/?layout": "https://pilot.parts/taskbar/start-button/layout.css",
 "https://pilot.parts/taskbar/start-button/?manifest": "https://pilot.parts/taskbar/start-button/manifest.uri",
 "https://pilot.parts/taskbar/start-button/?onpointerdown": "https://pilot.parts/taskbar/start-button/onpointerdown.js",
 "https://pilot.parts/taskbar/start-button/icon/?layout": "https://pilot.parts/taskbar/start-button/icon/layout.css",
 "https://pilot.parts/taskbar/start-button/icon/layout.css.a.js":
  "return `:host {\n   position: relative;\n   box-sizing: border-box;\n   height: 100%;\n   margin: 0;\n   background: url(data:image/png;base64,${icon});\n   background-size: 16px;\n   width: 16px;\n   height: 16px }`",
 "https://pilot.parts/taskbar/start-button/icon/layout.css?archive":
  "https://pilot.parts/taskbar/start-button/icon/layout.css.a.js",
 "https://pilot.parts/taskbar/start-button/icon/layout.css?icon": "https://core.parts/apple-touch-icon.png",
 "https://pilot.parts/taskbar/start-button/label/?layout": "https://pilot.parts/taskbar/start-button/label/layout.css",
 "https://pilot.parts/taskbar/start-button/label/layout.css":
  '\n  :host {\n   position: relative;\n   box-sizing: border-box;\n   margin: 0;\n   height: 16px }\n  :host::before {\n   content: "Start";\n  }',
 "https://pilot.parts/taskbar/start-button/layout.css.a.js":
  '\n  return `\n   :host {\n    flex: 0 0 max-content;\n    position: relative;\n    height: 100%;\n    display: flex;\n    flex-flow: row nowrap;\n    gap: 3px;\n    border: none;\n    font: bold 11px / 16px sans-serif;\n    box-sizing: border-box;\n    padding: ${("" + open) === "0" ? 3 : 4}px 4px 2px;\n    text-align: left;\n    background: #c3c3c3;\n    box-shadow: ${("" + open) === "0" ? `\n     inset -1px -1px black,\n     inset 1px 1px white,\n     inset -2px -2px #7a7a7a,\n     inset 2px 2px #dbdbdb`\n     : `\n     inset -1px -1px white,\n     inset 1px 1px black,\n     inset -2px -2px #dbdbdb,\n     inset 2px 2px #7a7a7a`};\n   }\n   :host(:focus)::after {\n    border: 1px dotted black;\n    content: "";\n    position: absolute;\n    margin: 3px;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    pointer-events: none;\n   }\n  `',
 "https://pilot.parts/taskbar/start-button/layout.css?archive":
  "https://pilot.parts/taskbar/start-button/layout.css.a.js",
 "https://pilot.parts/taskbar/start-button/layout.css?open": "https://pilot.parts/start-menu/open.txt",
 "https://pilot.parts/taskbar/start-button/manifest.uri":
  "https://pilot.parts/taskbar/start-button/icon/ https://pilot.parts/taskbar/start-button/label/",
 "https://pilot.parts/taskbar/start-button/manifest.uri?open": "https://pilot.parts/start-menu/open.txt",
 "https://pilot.parts/taskbar/start-button/onpointerdown.a.js":
  '\n  return `e => {\n   e.stopPropagation()\n   CORE["${open.headerOf().href}"] = "${"" + open === "0" ? `1` : `0`}";\n  }`',
 "https://pilot.parts/taskbar/start-button/onpointerdown.js?archive":
  "https://pilot.parts/taskbar/start-button/onpointerdown.a.js",
 "https://pilot.parts/taskbar/start-button/onpointerdown.js?open": "https://pilot.parts/start-menu/open.txt",
 "https://pilot.parts/taskbar/start-menu/?layout": "https://pilot.parts/taskbar/start-menu/layout.css",
 "https://pilot.parts/taskbar/start-menu/?manifest": "https://pilot.parts/taskbar/start-menu/manifest.uri",
 "https://pilot.parts/taskbar/start-menu/layout.css.a.js":
  'return `\n  :host {\n   position: relative;\n   min-width: 164px;\n   display: flex;\n   flex-flow: column nowrap;\n   position: absolute;\n   left: 2px;\n   bottom: calc(${height} - 4px);\n   user-select: none;\n   line-height: 18px;\n   text-align: left;\n   background: #c3c3c3;\n   box-sizing: border-box;\n   padding: 3px 3px 3px 24px;\n   text-align: left;\n   background: #c3c3c3;\n   box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb\n  }\n  :host::after {\n   pointer-events: none;\n   display: block;\n   content: "Pilot";\n   writing-mode: tb-rl;\n   transform: rotate(-180deg);\n   line-height: 21px;\n   font-size: 18px;\n   font-weight: 900;\n   color: #c3c3c3;\n   padding-top: 4px;\n   box-sizing: border-box;\n   position: absolute;\n   left: 3px;\n   top: 3px;\n   bottom: 3px;\n   background: #7f7f7f;\n   width: 21px\n  }`',
 "https://pilot.parts/taskbar/start-menu/layout.css?archive": "https://pilot.parts/taskbar/start-menu/layout.css.a.js",
 "https://pilot.parts/taskbar/start-menu/layout.css?height": "https://pilot.parts/taskbar/css-height.txt",
 "https://pilot.parts/taskbar/start-menu/manifest.uri":
  "https://pilot.parts/programs/locate/start-menu-item/ https://pilot.parts/programs/relate/start-menu-item/ https://pilot.parts/programs/debate/start-menu-item/ https://pilot.parts/horizontal-line/ https://pilot.parts/programs/welcome/start-menu-item/ https://pilot.parts/horizontal-line/ https://pilot.parts/taskbar/start-menu/save-computer/ https://pilot.parts/taskbar/start-menu/restart-computer/ https://pilot.parts/taskbar/start-menu/restart-server/",
 "https://pilot.parts/taskbar/start-menu/network-folder/?layout":
  "https://pilot.parts/taskbar/start-menu/network-folder/layout.css",
 "https://pilot.parts/taskbar/start-menu/network-folder/?manifest":
  "https://pilot.parts/taskbar/start-menu/network-folder/manifest.uri",
 "https://pilot.parts/taskbar/start-menu/network-folder/app-icon/?layout":
  "https://pilot.parts/taskbar/start-menu/network-folder/app-icon/layout.css",
 "https://pilot.parts/taskbar/start-menu/network-folder/app-icon/layout.css":
  '\n  :host {\n   --size: 16px;\n  }\n  :host::before {\n   content: "🔭";\n   font-size: var(--size);\n   line-height: var(--size);\n  }',
 "https://pilot.parts/taskbar/start-menu/network-folder/app-label/?layout":
  "https://pilot.parts/taskbar/start-menu/network-folder/app-label/layout.css",
 "https://pilot.parts/taskbar/start-menu/network-folder/app-label/layout.css":
  ':host::after {\n   height: 24px;\n   content: "Network";\n  }',
 "https://pilot.parts/taskbar/start-menu/network-folder/layout.css":
  "\n  :host {\n   position: relative;\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n   padding: 4px 0 }\n  :host(:hover) {\n   background: #00007f;\n   color: white }\n  app-icon {\n   width: 24px;\n   height: 24px;\n   margin: 0 10px;\n   --size: 24px;\n  }",
 "https://pilot.parts/taskbar/start-menu/network-folder/manifest.uri":
  "https://pilot.parts/taskbar/start-menu/network-folder/app-icon/ https://pilot.parts/taskbar/start-menu/network-folder/app-label/",
 "https://pilot.parts/taskbar/start-menu/restart-computer/?layout":
  "https://pilot.parts/taskbar/start-menu/restart-computer/layout.css",
 "https://pilot.parts/taskbar/start-menu/restart-computer/?manifest":
  "https://pilot.parts/taskbar/start-menu/restart-computer/manifest.uri",
 "https://pilot.parts/taskbar/start-menu/restart-computer/?onclick":
  "https://pilot.parts/taskbar/start-menu/restart-computer/onclick.js",
 "https://pilot.parts/taskbar/start-menu/restart-computer/app-icon/?layout":
  "https://pilot.parts/taskbar/start-menu/restart-computer/app-icon/layout.css",
 "https://pilot.parts/taskbar/start-menu/restart-computer/app-icon/layout.css":
  '\n  :host {\n   --size: 16px;\n   width: var(--size);\n   height: var(--size);\n   font-size: var(--size);\n   line-height: var(--size);\n  }\n  :host::after {\n   content: "🖥";\n  }',
 "https://pilot.parts/taskbar/start-menu/restart-computer/app-label/?layout":
  "https://pilot.parts/taskbar/start-menu/restart-computer/app-label/layout.css",
 "https://pilot.parts/taskbar/start-menu/restart-computer/app-label/layout.css":
  ':host::after {\n   height: 24px;\n   content: "Load Last Save";\n  }',
 "https://pilot.parts/taskbar/start-menu/restart-computer/layout.css":
  "\n  :host {\n   position: relative;\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n   padding: 4px 0;\n   padding-right: 6px }\n  :host(:hover) {\n   background: #00007f;\n   color: white }\n  app-icon {\n   width: 24px;\n   height: 24px;\n   margin: 0 10px;\n   --size: 24px;\n  }",
 "https://pilot.parts/taskbar/start-menu/restart-computer/manifest.uri":
  "https://pilot.parts/taskbar/start-menu/restart-computer/app-icon/ https://pilot.parts/taskbar/start-menu/restart-computer/app-label/",
 "https://pilot.parts/taskbar/start-menu/restart-computer/onclick.js": "\n  () => {\n   location.reload();\n  }",
 "https://pilot.parts/taskbar/start-menu/restart-server/?layout":
  "https://pilot.parts/taskbar/start-menu/restart-server/layout.css",
 "https://pilot.parts/taskbar/start-menu/restart-server/?manifest":
  "https://pilot.parts/taskbar/start-menu/restart-server/manifest.uri",
 "https://pilot.parts/taskbar/start-menu/restart-server/?onclick":
  "https://pilot.parts/taskbar/start-menu/restart-server/onclick.js",
 "https://pilot.parts/taskbar/start-menu/restart-server/app-icon/?layout":
  "https://pilot.parts/taskbar/start-menu/restart-server/app-icon/layout.css",
 "https://pilot.parts/taskbar/start-menu/restart-server/app-icon/layout.css":
  '\n  :host {\n   --size: 16px;\n   width: var(--size);\n   height: var(--size);\n   font-size: var(--size);\n   line-height: var(--size);\n  }\n  :host::after {\n   content: "🧼";\n  }',
 "https://pilot.parts/taskbar/start-menu/restart-server/app-label/?layout":
  "https://pilot.parts/taskbar/start-menu/restart-server/app-label/layout.css",
 "https://pilot.parts/taskbar/start-menu/restart-server/app-label/layout.css":
  ':host::after {\n   height: 24px;\n   content: "Factory Reset";\n  }',
 "https://pilot.parts/taskbar/start-menu/restart-server/layout.css":
  "\n  :host {\n   position: relative;\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n   padding: 4px 0 }\n  :host(:hover) {\n   background: #00007f;\n   color: white }\n  app-icon {\n   width: 24px;\n   height: 24px;\n   margin: 0 10px;\n   --size: 24px;\n  }",
 "https://pilot.parts/taskbar/start-menu/restart-server/manifest.uri":
  "https://pilot.parts/taskbar/start-menu/restart-server/app-icon/ https://pilot.parts/taskbar/start-menu/restart-server/app-label/",
 "https://pilot.parts/taskbar/start-menu/restart-server/onclick.js":
  '\n  () => {\n   navigator.serviceWorker.controller.postMessage({ type: "restart" });\n  }',
 "https://pilot.parts/taskbar/start-menu/save-computer-as/?layout":
  "https://pilot.parts/taskbar/start-menu/save-computer-as/layout.css",
 "https://pilot.parts/taskbar/start-menu/save-computer-as/?manifest":
  "https://pilot.parts/taskbar/start-menu/save-computer-as/manifest.uri",
 "https://pilot.parts/taskbar/start-menu/save-computer-as/?onclick":
  "https://pilot.parts/taskbar/start-menu/save-computer-as/onclick.js",
 "https://pilot.parts/taskbar/start-menu/save-computer-as/app-icon/?layout":
  "https://pilot.parts/taskbar/start-menu/save-computer/app-icon/layout.css",
 "https://pilot.parts/taskbar/start-menu/save-computer-as/app-label/?layout":
  "https://pilot.parts/taskbar/start-menu/save-computer-as/app-label/layout.css",
 "https://pilot.parts/taskbar/start-menu/save-computer-as/app-label/layout.css":
  ':host::after {\n    height: 24px;\n    content: "Save as ServiceWorker source";\n   }',
 "https://pilot.parts/taskbar/start-menu/save-computer-as/layout.css":
  "\n   :host {\n    position: relative;\n    display: flex;\n    flex-flow: row nowrap;\n    align-items: center;\n    padding: 4px 0;\n    padding-right: 6px }\n   :host(:hover) {\n    background: #00007f;\n    color: white }\n   app-icon {\n    width: 24px;\n    height: 24px;\n    margin: 0 10px;\n    --size: 24px;\n   }",
 "https://pilot.parts/taskbar/start-menu/save-computer-as/manifest.uri":
  "https://pilot.parts/taskbar/start-menu/save-computer-as/app-icon/ https://pilot.parts/taskbar/start-menu/save-computer-as/app-label/",
 "https://pilot.parts/taskbar/start-menu/save-computer-as/onclick.js":
  '\n /* TODO: update this! */   () => {\n    CORE["https://pilot.parts/start-menu/open.txt"] = "0"\n    delete 𝑧["https://pilot.parts/taskbar/tray/clock/date.txt"]\n    delete 𝑧["https://pilot.parts/taskbar/tray/clock/layout.css"]\n    const\n     a = document.createElement("a"),\n     json = JSON.stringify(Object.keys(𝑧).sort().reduce((temp_obj, key) => { temp_obj[key] = 𝑧[key]; return temp_obj }, {})).replace(/","/g,"\\",\\n  \\"").replace(/^{/s, "{\\n  ").replace(/}$/s, "\\n}"),\n     js = 𝑧["https://core.parts/boot.js"].replace("$1", json),\n     ourl = URL.createObjectURL(new Blob([js], { type: "text/javascript" }));\n     a.href = ourl\n     a.download = "boot.js"\n     document.body.appendChild(a)\n    a.click();\n     a.remove()\n     URL.revokeObjectURL(ourl);\n   }',
 "https://pilot.parts/taskbar/start-menu/save-computer/?layout":
  "https://pilot.parts/taskbar/start-menu/save-computer/layout.css",
 "https://pilot.parts/taskbar/start-menu/save-computer/?manifest":
  "https://pilot.parts/taskbar/start-menu/save-computer/manifest.uri",
 "https://pilot.parts/taskbar/start-menu/save-computer/?onclick":
  "https://pilot.parts/taskbar/start-menu/save-computer/onclick.js",
 "https://pilot.parts/taskbar/start-menu/save-computer/app-icon/?layout":
  "https://pilot.parts/taskbar/start-menu/save-computer/app-icon/layout.css",
 "https://pilot.parts/taskbar/start-menu/save-computer/app-icon/layout.css":
  '\n  :host {\n   --size: 16px;\n   width: var(--size);\n   height: var(--size);\n   font-size: var(--size);\n   line-height: var(--size);\n  }\n  :host::after {\n   content: "💽";\n  }',
 "https://pilot.parts/taskbar/start-menu/save-computer/app-label/?layout":
  "https://pilot.parts/taskbar/start-menu/save-computer/app-label/layout.css",
 "https://pilot.parts/taskbar/start-menu/save-computer/app-label/layout.css":
  ':host::after {\n   height: 24px;\n   content: "Quick Save";\n  }',
 "https://pilot.parts/taskbar/start-menu/save-computer/layout.css":
  "\n  :host {\n   position: relative;\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n   padding: 4px 0;\n   padding-right: 6px }\n  :host(:hover) {\n   background: #00007f;\n   color: white }\n  app-icon {\n   width: 24px;\n   height: 24px;\n   margin: 0 10px;\n   --size: 24px;\n  }",
 "https://pilot.parts/taskbar/start-menu/save-computer/manifest.uri":
  "https://pilot.parts/taskbar/start-menu/save-computer/app-icon/ https://pilot.parts/taskbar/start-menu/save-computer/app-label/",
 "https://pilot.parts/taskbar/start-menu/save-computer/onclick.js":
  "" +
  (() => {
   CORE["https://pilot.parts/start-menu/open.txt"] = "0"
   const clone = { ...𝑧 }
   delete clone["https://pilot.parts/taskbar/tray/clock/date.txt"]
   delete clone["https://pilot.parts/taskbar/tray/clock/layout.css"]
   navigator.serviceWorker.controller.postMessage({ type: "save", 𝑧: clone })
  }),
 "https://pilot.parts/taskbar/tray/?layout": "https://pilot.parts/taskbar/tray/layout.css",
 "https://pilot.parts/taskbar/tray/?manifest": "https://pilot.parts/taskbar/tray/manifest.uri",
 "https://pilot.parts/taskbar/tray/clock/?layout": "https://pilot.parts/taskbar/tray/clock/layout.css",
 "https://pilot.parts/taskbar/tray/clock/date.txt.a.js":
  'return new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hourCycle: "h12" })',
 "https://pilot.parts/taskbar/tray/clock/date.txt?archive": "https://pilot.parts/taskbar/tray/clock/date.txt.a.js",
 "https://pilot.parts/taskbar/tray/clock/date.txt?fx": "https://pilot.parts/taskbar/tray/clock/date/fx.uri",
 "https://pilot.parts/taskbar/tray/clock/date/fx.uri": "https://pilot.parts/taskbar/tray/clock/layout.css",
 "https://pilot.parts/taskbar/tray/clock/layout.css.a.js":
  '\n  const minute = 1000 * 60, delay = minute - (Date.now() % minute);\n  setTimeout(()=>{\n   CORE[date.headerOf().href] = new Date().toLocaleString("en-US", {\n    hour: "numeric",\n    minute: "numeric",\n    hourCycle: "h12"\n   })\n  }, delay + 5);\n  return `:host::after {\n   content: "${date}";\n   white-space: nowrap;\n  }`',
 "https://pilot.parts/taskbar/tray/clock/layout.css?archive": "https://pilot.parts/taskbar/tray/clock/layout.css.a.js",
 "https://pilot.parts/taskbar/tray/clock/layout.css?date": "https://pilot.parts/taskbar/tray/clock/date.txt",

 "https://pilot.parts/taskbar/tray/factory-reset/?layout": "https://pilot.parts/taskbar/tray/factory-reset/layout.css",
 "https://pilot.parts/taskbar/tray/factory-reset/?onclick":
  "https://pilot.parts/taskbar/start-menu/restart-server/onclick.js",
 "https://pilot.parts/taskbar/tray/factory-reset/layout.css":
  '\n  :host {\n   width: 16px;\n   height: 16px;\n   cursor: pointer;\n  }\n  :host::before {\n   content: "🧼";\n   font-size: 16px;\n   line-height: 16px;\n  }',
 "https://pilot.parts/taskbar/tray/fullscreen/?layout": "https://pilot.parts/taskbar/tray/fullscreen/layout.css",
 "https://pilot.parts/taskbar/tray/fullscreen/?onclick": "https://pilot.parts/taskbar/tray/fullscreen/onclick.js",
 "https://pilot.parts/taskbar/tray/fullscreen/layout.css":
  '\n  :host {\n   width: 16px;\n   height: 16px;\n   cursor: pointer;\n  }\n  :host::before {\n   content: "⛶";\n   font-size: 16px;\n   line-height: 16px;\n  }',
 "https://pilot.parts/taskbar/tray/fullscreen/onclick.js": "",
 "https://pilot.parts/taskbar/tray/fullscreen/onclick.js":
  "" +
  (() => {
   if (document.fullscreenElement) {
    if ("exitFullscreen" in document) document.exitFullscreen()
    else location.reload()
   }
   document.documentElement.requestFullscreen()
  }),
 "https://pilot.parts/taskbar/tray/layout.css":
  ":host {\n   position: relative;\n   display: flex;\n   flex-flow: row nowrap;\n   gap: 3px;\n   box-sizing: border-box;\n   height: 100%;\n   margin: 0;\n   user-select: none;\n   padding: 3px 4px 3px;\n   text-align: left;\n   background: #c3c3c3;\n   box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a;\n  }",
 "https://pilot.parts/taskbar/tray/manifest.uri":
  "https://pilot.parts/taskbar/tray/factory-reset/ https://pilot.parts/taskbar/tray/fullscreen/ https://pilot.parts/taskbar/tray/clock/",
 "https://pilot.parts/tasks.fx.uri":
  "https://pilot.parts/taskbar/manifest.uri https://pilot.parts/programs/locate/task/index.txt https://pilot.parts/programs/relate/task/index.txt https://pilot.parts/programs/debate/task/index.txt https://pilot.parts/programs/welcome/task/index.txt https://pilot.parts/programs/answer/task/index.txt https://pilot.parts/programs/invite/task/index.txt",
 "https://pilot.parts/tasks.uri": "https://pilot.parts/programs/relate/task/",
 "https://pilot.parts/tasks.uri?fx": "https://pilot.parts/tasks.fx.uri",
 "https://pilot.parts/windows-fx.uri": "https://pilot.parts/manifest.uri",
 "https://pilot.parts/windows.uri": "https://pilot.parts/programs/relate/window/",
 "https://pilot.parts/windows.uri?fx": "https://pilot.parts/windows-fx.uri",
 "https://stargate.design/favicon.ico?base": "https://core.parts/apple-touch-icon.png"
})
