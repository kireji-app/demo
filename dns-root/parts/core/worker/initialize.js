const id = Date.now().toString(32).slice(-3)

Object.assign(globalThis, {
 server: part,
 cache: {},
 onfetch: e => e.respondWith((async () => {
  const { pathname, host: requestedHost } = new URL(e.request.url)
  const host = requestedHost.startsWith("localhost:") || requestedHost.endsWith(".vercel.app") ? root.debugHost : requestedHost
  const filename = pathname.split("/").pop() || "index.html"
  if (filename === "debug.host") return new Response(root.debugHost, { headers: { "content-type": "text/plain" } })
  const cacheKey = host + pathname

  if (!(cacheKey in cache)) {
   const part = await Framework.getPartFromRoot(host)
   if (part) cache[cacheKey] = await part.createResponse(filename)
   else console.warn("404 @ " + host)
  }

  return cache[cacheKey]?.clone()
 })()),
 onactivate: e => globalThis.clients.claim(),
 onmessage: e => ({
  claim() {
   globalThis.clients.claim()
  },
  handOff() {
   root.debugHost = e.data.host
   globalThis.skipWaiting()
  },
  setDebugHost: () => {
   root.debugHost = e.data.host
   const channel = new BroadcastChannel("debug-reload")
   channel.postMessage(1)
   channel.close()
  }
 })[e.data.code]()
})

registration.onupdatefound = () => {
 if (registration.installing !== serviceWorker)
  registration.installing?.postMessage({
   code: 'handOff',
   host: root.debugHost
  })
}
server.state[root.primaryLayer] = 0n