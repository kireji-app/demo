if (environment === "worker") {
 globalThis.onfetch = event => {
  try {
   const { host, pathname, search, hash } = new URL(event.request.url)

   if (hash || search)
    throw 'Requests with a fragment or query are not supported.'

   const isFileRequest = [`/${_.version}/kireji.js`, `/${_.version}/manifest.json`].includes(pathname)

   const filename = isFileRequest ? pathname.split("/")[2] : "index.html"

   if (isFileRequest)
    _.setRoute(`https://${host}/${_.version}/${_.landingHash}/`)
   else {
    if (!/^\/\d+\.\d+.\d+\/(?:[\w-]*\/)?$/.test(pathname))
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
 // globalThis.oninstall = e => globalThis.skipWaiting()
 globalThis.onmessage = ({ data: { code, payload }, source }) => {
  switch (code) {

   case "claim":
    globalThis.clients.claim()
    debug("just claimed clients", source)
    break

   case "activate":
    globalThis.skipWaiting()
    break

   case "version":
    source.postMessage({ code: "version", payload: _.version })
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

 worker.registration.onupdatefound = event => {
  const target = worker.registration.installing || worker.registration.waiting
  nav.serviceWorker.onmessage = ({ data: { code, payload } }) => {
   if (code !== "version") return
   nav.serviceWorker.onmessage = null
   if (!production) {
    if (confirm(`Service Worker Update available ${payload}.\n\nIt will be activated once all activate tabs in this origin are closed. \n\nWould you like to install it immediately instead? This will refresh all activate tabs in this origin.`))
     target.postMessage({ code: "activate" })
   }
  }
  target.postMessage({ code: "version" })
 }

 if (!production)
  addEventListener("focus", () => {
   log(2, 'Checking for updates.')
   worker.registration.update().catch(() => location.reload())
  })
}