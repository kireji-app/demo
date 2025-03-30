const id = Date.now().toString(32).slice(-3)
const controller = {
 claim() {
  globe.clients.claim()
 },
 impart(host) {
  BUILD.host = host
  globe.skipWaiting()
 },
 resign() {
  if (interval) clearInterval(interval)
  const replacement = registration.installing
  replacement.postMessage({
   code: 'impart',
   payload: BUILD.host
  })
 },
 setDebugHost: host => {
  BUILD.host = host
  const locationHREF = (BUILD.tags.includes("local") ? "http://" : "https://") + location.host + "/"
  delete Framework.responses[locationHREF]
  delete Framework.responses[locationHREF + "endpoint.js?raw"]
  const channel = new BroadcastChannel("debug-reload")
  channel.postMessage(1)
  channel.close()
 }
}

Object.assign(globe, {
 server: part,
 onfetch: e => e.respondWith(Framework.fetchSync(e.request)),
 onactivate: e => globe.clients.claim(),
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

part.routeID = 0n