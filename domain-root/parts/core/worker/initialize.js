Object.assign(globalThis, {
 server: part,
 cache: {},
 onfetch: e => {
  const { pathname, host: requestedHost } = new URL(e.request.url),
   host = requestedHost.startsWith("localhost:") ? "glowstick.click" : requestedHost,
   cacheKey = host + pathname,
   filename = pathname.split("/").pop(),
   { Type } = new Core(host)

  if (!(cacheKey in cache)) {
   let body, type, base64Encoded
   switch (pathname) {
    case "/" + Core.clientScriptURL:
     body = Core.compile()
     type = "text/javascript; charset=UTF-8"
     break
    case "/manifest.json":
     const manifest = {
      name: host,
      short_name: host,
      start_url: ".",
      display: "standalone",
      theme_color: "#1f2023",
      background_color: "#1f2023",
      description: "This app is under development.",
      display_override: ["window-controls-overlay"],
      categories: ["entertainment", "games", "utilities"],
     }
     body = JSON.stringify(manifest, null, 1)
     type = "application/json; charset=UTf-8"
     break
     type = "image/svg+xml"
     break
    case "/tile.png":
    case "/still.png":
    case "/promo.png":
     type = "image/png"
     base64Encoded = true
     body = Type.read(filename)
     break
    case "/icon.svg":
     type = "image/svg+xml"
     body = `<svg width="144px" height="144px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<style>
svg { background: white }
text { fill: ${Type.read("theme.color") ?? "#222334"} }
@media (prefers-color-scheme = dark) {
svg { background: ${Type.read("theme.color") ?? "#222334"} }
text { fill: white }
}
</style>
<text x="12" y="12" dominant-baseline="central" text-anchor="middle">${host[0]}</text>
</svg>`
     break
    default:
     body = Core.indexHTML
     type = "text/html; charset=UTF-8"
   }

   if (base64Encoded) {
    if (!body) body = new Blob([], { type })
    else {
     const B = atob(body), k = B.length, A = new ArrayBuffer(k), I = new Uint8Array(A)
     for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i)
     body = new Blob([I], { type })
    }
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
 },
 oninstall: e => globalThis.skipWaiting(),
 onactivate: e => globalThis.clients.claim(),
 onmessage: e => [onactivate, () => registration.unregister().then(() => e.source.postMessage({ code: 0 }))][e.data.code]()
})

server.state[root.primaryLayer] = 0n