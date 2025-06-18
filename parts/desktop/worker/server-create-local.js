worker.controller = {
 claim() {
  debug('received claim message')
  globalThis.clients.claim()
 },
 impart(host) {
  debug('received impart message')
  if (desktop.theme?.key !== host)
   desktop.themes = desktop.themeHosts[host]

  _.defaultHost = host
  globalThis.skipWaiting()
 },
 resign() {
  if (interval)
   clearInterval(interval)

  const replacement = registration.installing

  debug('received resign message. sending impart message', replacement)

  replacement.postMessage({
   code: 'impart',
   payload: desktop.theme?.host ?? _.defaultHost
  })
 },
 setTheme: host => {
  debug('received setTheme message', host, desktop.theme?.key)
  if (desktop.theme?.key === host)
   return

  _.defaultHost = host
  desktop.themes = desktop.themeHosts[host]
  const channel = new BroadcastChannel("theme-reload")
  channel.postMessage(1)
  channel.close()
 }
}

// TODO: Large files won't be inlined soon. Fetch or stream them into the cache first, them provide them.
globalThis.onfetch = e => e.respondWith(service.fetchSync(e.request.url))
globalThis.onactivate = e => globalThis.clients.claim()
globalThis.onmessage = ({ data: { code, payload } }) => worker.controller[code](payload)

debug("ready for impart message...")

var interval
registration.onupdatefound = () => {
 if (serviceWorker !== registration.installing) {
  if (registration.installing) {
   log(1, 'Previous service worker is now resigning.')
   worker.controller.resign()
  } else throw 'unexpected error updating worker'
 } else log(1, 'New service worker is now installing.')
}