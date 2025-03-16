const id = Date.now().toString(32).slice(-3)

Object.assign(globalThis, {
 server: part,
 cache: {},
 onfetch: e => e.respondWith((async () => {
  const { pathname, search, hash, host, href } = new URL(e.request.url)
  const isLocal = host.startsWith("localhost:")
  const typeName = isLocal ? Framework.debugHost : host
  const myVersion = Framework.version
  const [version = myVersion, requestedFilename] = pathname.length > 1 ? pathname.slice(1).split('/') : []
  const filename = requestedFilename?.includes(".") ? requestedFilename : "index.html"
  const path = "/" + version + "/" + filename

  if (filename === "debug.host")
   return new Response(Framework.debugHost, { headers: { "content-type": "text/plain" } })

  const cacheKey = typeName + path

  if (!(cacheKey in cache)) {
   const part = await Framework.getPartFromRoot(typeName)
   if (part) cache[cacheKey] = await part.createResponse(filename)
   else console.warn("404 @ " + typeName)
  }

  return cache[cacheKey]?.clone()
 })()),
 onactivate: e => globalThis.clients.claim(),
 onmessage: e => ({
  claim() {
   globalThis.clients.claim()
  },
  handOff() {
   Framework.debugHost = e.data.host
   globalThis.skipWaiting()
  },
  setDebugHost: () => {
   Framework.debugHost = e.data.host
   const channel = new BroadcastChannel("debug-reload")
   channel.postMessage(1)
   channel.close()
  }
 })[e.data.code]()
})

registration.onupdatefound = () => {
 console.log(id, "onupdatefound")
 if (registration.installing !== serviceWorker)
  registration.installing?.postMessage({
   code: 'handOff',
   host: Framework.debugHost
  })
}
server.state[root.primaryLayer] = 0n