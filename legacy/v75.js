function f() {
 const composer = {
   "core.parts#parts": "parts.uri",
   "core.parts#eval": "eval.js",
   "core.parts/parts.uri": "parts eval",
   "core.parts/eval.js": "console.warn('eval', this)"
  },
  CACHE = {},
  GET = x => (CACHE[x] ??= NEW(x)),
  RESOLVE = (x, base) => {
   const part_url = new URL(x, base).href.slice(8)
   if (part_url in composer) return composer[part_url]
   throw `RESOLVE error: ${part_url} not in composer (from ${x} and ${base})`
  },
  ACCESS = (hash, base) => {
   const reference_url = `${base}#${hash}`
   if (reference_url in composer) return composer[reference_url]
   throw `ACCESS error: ${reference_url} not in composer`
  },
  NEW = x => {
   console.log("creating " + x)
   const url = new URL("https://" + x)
   class T extends (`${x}#base` in composer
    ? GET(composer[`${x}#base`])
    : x === "core.parts"
    ? null
    : GET("core.parts")) {
    x
   }
   if (`${x}#parts` in composer) {
    for (const identifier of RESOLVE(composer[`${x}#parts`], url).split(" ")) {
     Object.defineProperty(T, identifier, {
      get() {
       console.warn("handle this ask", identifier, x, url)
      }
     })
    }
   }
   return T
  }
 LIVE_NODES = {}
 if (self instanceof (self.Window ?? class {})) {
  GET("core.parts/window").eval(true)
 } else {
  onfetch = e => GET("core.parts/serviceWorker/fetch").eval(e)
  onmessage = e => GET("core.parts/serviceWorker/message").eval(e)
  oninstall = () => globalThis.skipWaiting()
  onactivate = () => globalThis.clients.claim()
 }
}
f()
