worker.controller = {
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

// TODO: Large files won't be inlined soon. Fetch or stream them into the cache first, them provide them.
globe.onfetch = e => e.respondWith((() => {
 const { pathname, host, search, href } = new URL(e.request.url)
 throw "is the state set correctly? NO!!! Try again! Unless you wanted it this way: " + href
 desktop.render(e.request)
})())

globe.onactivate = e => globe.clients.claim()

globe.onmessage = ({ data: { code, payload } }) => worker.controller[code](payload)

var interval
registration.onupdatefound = () => {
 if (serviceWorker !== registration.installing) {
  if (registration.installing) {
   log(0, 'I am the old service worker, and I see the installing one. I\'ll resign.')
   worker.controller.resign()
  } else {
   log(0, 'I am the old service worker, but I don\'t see the installing one. I\'ll ... wait?')

   if (interval)
    throw 'double interval set'

   interval = setInterval(() => {
    debug('polling')
    if (registration.installing) worker.controller.resign()
   }, 25)
  }
 } else {
  log(0, 'I am the installing service worker')
 }
}