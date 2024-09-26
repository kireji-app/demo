z = () => {
 const isClient = self instanceof (self.Window ?? class {}),
  logEnvironment = isClient ? "Client" : "ServiceWorker"
 // PARSER ====================================================
 console.log(
  `z = ${z}\nz()`.matchAll(
   /\/\/.*(?=\n))|(\/\*[\s\S]*?\*\/)|("(?:(?<!\\)\\"|[^"\n])*?")|('(?:(?<!\\)\\"|[^"\n])*?')|(;)|(\s+)|(\w[\w\d_]*)|./g
  )
 )
 if (isClient)
  Promise.all([
   (async () => {
    const e = "controllerchange",
     sw = navigator.serviceWorker,
     registration = await sw.register(location.origin + "/boot.js", { updateViaCache: "none" }),
     { waiting: w, installing: i, active: a } = registration,
     REBUILD_CLIENT = () => (console.log("reloading"), location.reload())
    if (!a) await new Promise(done => ((w ?? i).onstatechange = ({ target: t }) => t.state == "activated" && done(t)))
    if (!sw.controller)
     await new Promise(done => {
      const oncontrollerchange = () => (sw.removeEventListener(e, oncontrollerchange), done())
      sw.addEventListener(e, oncontrollerchange)
      registration.active.postMessage({ type: "claim" })
     })
    sw.addEventListener(e, REBUILD_CLIENT)
    sw.addEventListener("message", REBUILD_CLIENT)
    document.onvisibilitychange = () => document.hidden || registration.update()
    window.onfocus = () => registration.update()
   })(),
   new Promise(done => (onload = done))
  ]).then(() => {
   document.querySelector('[rel="manifest"]').href ??= "manifest.json"
   console.log(`[${logEnvironment}] Successful`)
   /* TODO:
       Populate the document body with a rudimentary IDE which allows choosing between any of the
       parsed substrings of zString or zString itself, modifying the substring, saving it and (automatically upon saving)
       having all dependant substrings modify
       upon making changes to these intervals using the text editor, 
       TODO: Causality. When the */
  })
 else {
  return
  onfetch = event => {
   const direct = typeof event === "string",
    raw_url = direct ? event : event.request.url,
    url = new URL(raw_url).host.startsWith("dev.") ? "https://" + raw_url.slice(12) : raw_url,
    { binary, type } = url.match(
     /^(?<protocol>[a-z+]+:\/\/?)(?:(?<host>[^\/]+?)(?:\/(?<path>(?:[^\s.?\/]+?\/)*)(?:(?<part>[a-z][a-z0-9-]*)\/?|(?<filename>[^\s?\/]*)\.(?<extension>(?<binary>png|ico|woff2|wasm)|[^\s.?\/]+))|\/(?<index>(?:[^\s.?\/]+?\/)*))(?:\?(?<kireji>[a-zA-Z][a-zA-Z0-9_]*)(?:=(?<value>-?[\d]*\.?[\d]*)(?<rest_kireji>&(?:[a-zA-Z][a-zA-Z0-9_]*=-?[\d]*\.?[\d]*)+)?$)?)?)?$/
    )?.groups
   const string = ""
   // TODO: Must generate file here. The result will be generated using functionality from the implicit generator.
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
  }
  onmessage = ({ data, source }) => {
   switch (data.type) {
    case "save":
     console.warn(`[${logEnvironment}] rebuild class here - update all implicit items`)
     break
    case "claim":
     globalThis.clients.claim()
     break
    default:
     throw `[${logEnvironment}] unhandled command: ${data.type}`
   }
  }
  oninstall = () => globalThis.skipWaiting()
  onactivate = () => {
   globalThis.clients.claim()
   console.log(`[${logEnvironment}] Successful`)
  }
 }
}
z()
