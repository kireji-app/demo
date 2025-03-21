const id = Date.now().toString(32).slice(-3)
const controller = {
 claim() {
  globalThis.clients.claim()
 },
 impart(payload) {
  Framework.debugHost = payload
  globalThis.skipWaiting()
 },
 resign() {
  if (interval) clearInterval(interval)
  const replacement = registration.installing
  replacement.postMessage({
   code: 'impart',
   payload: Framework.debugHost
  })
 },
 setDebugHost: () => {
  Framework.debugHost = e.data.host
  const channel = new BroadcastChannel("debug-reload")
  channel.postMessage(1)
  channel.close()
 }
}

Object.assign(globalThis, {
 server: part,
 cache: {},
 onfetch: e => e.respondWith((async () => {
  const { pathname, search, hash, host, href } = new URL(e.request.url)
  const isLocal = host.startsWith("localhost:")
  const typeName = isLocal ? Framework.debugHost : host
  const myVersion = Framework.version.slice(1, -1)
  const [version = myVersion, requestedFilename] = pathname.length > 1 ? pathname.slice(1).split('/') : []
  const filename = requestedFilename?.includes(".") ? requestedFilename : "index.html"
  const path = "/" + version + "/" + filename

  if (filename === "debug.host")
   return new Response(Framework.debugHost, { headers: { "content-type": "text/plain" } })

  const cacheKey = typeName + path

  if (!(cacheKey in cache)) {
   const part = await Framework.createPart(typeName, undefined, server)
   if (part) cache[cacheKey] = await part.createResponse(filename)
   else console.warn("404 @ " + typeName)
  }

  return cache[cacheKey]?.clone()
 })()),
 onactivate: e => globalThis.clients.claim(),
 onmessage: ({ data: { code, payload } }) => controller[code](payload)
})

var interval
registration.onupdatefound = () => {
 if (serviceWorker !== registration.installing) {
  if (registration.installing) controller.resign()
  else {
   if (interval) throw 'double interval set'
   interval = setInterval(() => {
    console.log('polling')
    if (registration.installing) controller.resign()
   }, 25)
  }
 }
}

part.state[root.primaryLayer] = 0n