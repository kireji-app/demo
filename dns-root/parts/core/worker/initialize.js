Object.assign(globalThis, {
 server: part,
 cache: {},
 onfetch: e => {
  const { pathname, host: requestedHost } = new URL(e.request.url),
   host = requestedHost.startsWith("localhost:") ? root.debugHost : requestedHost,
   cacheKey = host + pathname,
   filename = pathname.split("/").pop(),
   framework = new Framework(host)

  /*
   if (pathname.split("/").length > 2) {
    console.log('redirected!', pathname)
    e.respondWith(
     new Response('', {
      status: 302,
      headers: {
       'Location': requestedHost + "?path=" + pathname.split("/").slice(0, -1).join("/")
      }
     }))
    return
   }
  */

  if (!(cacheKey in cache)) {
   let body, type, base64Encoded
   switch (pathname) {
    case "/" + Framework.clientScriptURL:
     body = Framework.compile()
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
    case "/icon.svg":
     type = "image/svg+xml"
     body = `<svg width="144px" height="144px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<style>
svg { background: white }
text { fill: ${framework.read("theme.color") ?? "#222334"} }
@media (prefers-color-scheme = dark) {
svg { background: ${framework.read("theme.color") ?? "#222334"} }
text { fill: white }
}
</style>
<text x="12" y="12" dominant-baseline="central" text-anchor="middle">${host[0]}</text>
</svg>`
     break
    default:
     if (filename.endsWith(".png")) {
      base64Encoded = true
      type = "image/png"
      body = framework.resolve(filename)
      if (!body) console.warn('404 ' + e.request.url)
     } else {
      body = Framework.indexHTML
      type = "text/html; charset=UTF-8"
     }
     break
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