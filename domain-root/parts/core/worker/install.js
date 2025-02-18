const cache = {}
globalThis.onfetch = e => {
 const { pathname, host: uid } = new URL(e.request.url),
  cacheKey = uid + pathname,
  filename = pathname.split("/").pop()
 if (!(cacheKey in cache)) {
  let body, type, base64Encoded
  switch (pathname) {
   case "/" + Build.src:
    body = Build.script()
    type = "text/javascript; charset=UTF-8"
    break
   case "/manifest.json":
    const manifest = {
     name: uid,
     short_name: uid,
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
    body = Build.archive[uid][filename]
    break
   case "/icon.svg":
    type = "image/svg+xml"
    body = `<svg width="144px" height="144px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<style>
svg { background: white }
text { fill: ${Build.archive[uid]?.["theme.color"] ?? "#222334"} }
@media (prefers-color-scheme = dark) {
svg { background: ${Build.archive[uid]?.["theme.color"] ?? "#222334"} }
text { fill: white }
}
</style>
<text x="12" y="12" dominant-baseline="central" text-anchor="middle">${uid[0]}</text>
</svg>`
    break
   default:
    body = Build.indexHTML
    type = "text/html; charset=UTF-8"
  }

  if (base64Encoded) {
   const B = atob(body), k = B.length, A = new ArrayBuffer(k), I = new Uint8Array(A);
   for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i);
   body = new Blob([I], { type });
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