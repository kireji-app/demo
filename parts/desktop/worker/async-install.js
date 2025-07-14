if (environment === "worker") {
 globalThis.onfetch = event => {
  try {
   const { host, pathname, search, hash } = new URL(event.request.url)

   if (hash || search)
    throw 'Requests with a fragment or query are not supported.'

   const isFileRequest = ["/kireji.js", "/manifest.json"].includes(pathname)

   const filename = isFileRequest ? pathname.slice(1) : "index.html"

   if (isFileRequest)
    _.setRoute(`https://${host}`)
   else {
    if (!/^\/(?:[\w-]*\/)?$/.test(pathname))
     throw `Pathname '${pathname}' is not valid.`

    _.setRoute(`https://${host}${pathname}`)
   }

   event.respondWith(_.render({
    request: filename,
    format: "response"
   }))

  } catch (e) {
   error(e)
   event.respondWith(Promise.reject(e))
  }
 }
 globalThis.onactivate = e => globalThis.clients.claim()
 globalThis.install = e => globalThis.skipWaiting()
 globalThis.onmessage = ({ data: { code, payload } }) => {
  switch (code) {

   case "claim":
    globalThis.clients.claim()
    break

   default:
    error('Unsupported worker message code ' + code)
  }
 }
} else {

 if (!worker.registration) {
  const registration = await nav.serviceWorker.getRegistration()
  Object.defineProperties(worker, {
   startupRegistration: { value: registration },
   registration: { value: registration },
  })

  if (!worker.registration.active)
   throw 'Unexpected lack of existing service worker registration while installing worker facet in client.'

  Object.defineProperties(worker, {
   controller: { value: nav.serviceWorker.controller }
  })

  nav.serviceWorker.oncontrollerchange = () => location.reload()
 }

 if (!production)
  addEventListener("focus", () => {
   log(0, 'Checking for updates.')
   worker.registration.update().catch(() => location.reload())
  })
}