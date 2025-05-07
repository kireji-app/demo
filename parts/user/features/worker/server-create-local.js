worker.controller = {
 claim() {
  globe.clients.claim()
 },
 impart(host) {
  if (theme.arm?.key !== host)
   theme.setArm(host)

  globe.skipWaiting()
 },
 resign() {
  if (interval)
   clearInterval(interval)

  const replacement = registration.installing

  replacement.postMessage({
   code: 'impart',
   payload: theme.arm.host
  })
 },
 setTheme: host => {
  if (theme.arm?.key === host)
   return

  theme.setArm(host)
  delete Framework.responses[location.origin + "/"]
  delete Framework.responses[location.origin + "/service.js!"]
  const channel = new BroadcastChannel("theme-reload")
  channel.postMessage(1)
  channel.close()
 }
}

// TODO: Large files won't be inlined soon. Fetch or stream them into the cache first, them provide them.
globe.onfetch = e => e.respondWith(service.fetchSync(e.request.url))
globe.onactivate = e => globe.clients.claim()
globe.onmessage = ({ data: { code, payload } }) => worker.controller[code](payload)

var interval
registration.onupdatefound = () => {
 if (serviceWorker !== registration.installing) {
  if (registration.installing) {
   log(1, 'Previous service worker is now resigning.')
   worker.controller.resign()
  } else {
   // Not sure if this is reachable.
   warn('Previous service worker, but I don\'t see the installing one. I\'ll ... wait?')

   if (interval)
    throw 'double interval set'

   interval = setInterval(() => {
    warn('polling')
    if (registration.installing)
     worker.controller.resign()
   }, 25)
  }
 } else {
  log(1, 'New service worker is now installing.')
 }
}