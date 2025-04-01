const id = Date.now().toString(32).slice(-3)
const controller = {
 claim() {
  globe.clients.claim()
 },
 impart(host) {
  DEVELOPMENT_HOST = host
  globe.skipWaiting()
 },
 resign() {
  if (interval) clearInterval(interval)
  const replacement = registration.installing
  replacement.postMessage({
   code: 'impart',
   payload: DEVELOPMENT_HOST
  })
 },
 setDebugHost: host => {
  DEVELOPMENT_HOST = host
  delete Framework.responses[location.origin + "/"]
  delete Framework.responses[location.origin + "/portable.js!"]
  const channel = new BroadcastChannel("debug-reload")
  channel.postMessage(1)
  channel.close()
 }
}

Object.assign(globe, {
 server: part,
 // TODO: Large files won't be inlined soon. Fetch or stream them into the cache first, them provide them.
 onfetch: e => e.respondWith(root.fetchSync(e.request)),
 onactivate: e => globe.clients.claim(),
 onmessage: ({ data: { code, payload } }) => controller[code](payload)
})

var interval
registration.onupdatefound = () => {
 if (serviceWorker !== registration.installing) {
  if (registration.installing) {
   log(0, 'I am the old service worker, and I see the installing one. I\'ll resign.', globe)
   controller.resign()
  } else {
   log(0, 'I am the old service worker, but I don\'t see the installing one. I\'ll ... wait?', globe)

   if (interval)
    throw 'double interval set'

   interval = setInterval(() => {
    debug('polling')
    if (registration.installing) controller.resign()
   }, 25)
  }
 } else {
  log(0, 'I am the installing service worker', globe)
 }
}

part.routeID = 0n