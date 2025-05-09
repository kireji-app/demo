worker.controller = {
 claim() {
  debug('received claim message')
  globe.clients.claim()
 },
 impart(host) {
  debug('received impart message')
  if (theme.arm?.key !== host)
   theme.setArm(host)

  build.defaultHost = host
  globe.skipWaiting()

  globe.imparted = true
 },
 resign() {
  debug('received resign message')
  if (interval)
   clearInterval(interval)

  const replacement = registration.installing

  replacement.postMessage({
   code: 'impart',
   payload: theme.arm?.host ?? build.defaultHost
  })
 },
 setTheme: host => {
  debug('received setTheme message', host, theme.arm?.key)
  if (theme.arm?.key === host)
   return

  build.defaultHost = host
  theme.setArm(host)
  // delete Framework.responses[location.origin + "/"]
  // delete Framework.responses[location.origin + "/service.js!"]
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
  }
  throw 'unexpected error updating worker'
 } else log(1, 'New service worker is now installing.')
}