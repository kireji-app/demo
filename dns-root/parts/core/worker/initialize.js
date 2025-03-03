Object.assign(globalThis, {
 server: part,
 cache: {},
 onfetch: e => e.respondWith((async () => {
  const { pathname, host: requestedHost } = new URL(e.request.url)
  const host = requestedHost.startsWith("localhost:") || requestedHost.endsWith(".vercel.app") ? root.debugHost : requestedHost
  const filename = pathname.split("/").pop() || "index.html"
  if (filename === "debug.host") return await root.createResponse(filename, host)
  return (cache[host + pathname] ??= await root.createResponse(filename, host)).clone()
 })()),
 oninstall: e => {
  globalThis.skipWaiting()
 },
 onactivate: e => globalThis.clients.claim(),
 onmessage: e => ({
  claim: onactivate,
  "debug-host"() {
   root.debugHost = e.data.host
  },
  reinstall() {
   registration.unregister().then(() => {
    const channel = new BroadcastChannel("debug-reload")
    channel.postMessage(1)
    channel.close()
   })
  },
  setDebugHost: () => {
   console.log("settingDebugHost", e.data)
   root.debugHost = e.data.host
   const channel = new BroadcastChannel("debug-reload")
   channel.postMessage(1)
   channel.close()
  }
 })[e.data.code]()
})
registration.onupdatefound = () => {
 if (registration.installing === serviceWorker) return
 const data = {
  code: 'debug-host',
  host: root.debugHost
 }
 registration.installing?.postMessage(data)
}
server.state[root.primaryLayer] = 0n