if (environment === "worker") {
 globalThis.onfetch = event => {
  try {
   const { host, pathname, searchParams, hash } = new URL(event.request.url)
   const alternateModelVersion = searchParams.get("from")

   if (alternateModelVersion || pathname === '/-v')
    return

   const isFileRequest = [`/${_.version}/kireji.js`, `/${_.version}/manifest.json`].includes(pathname)
   const filename = isFileRequest ? pathname.split("/")[2] : "index.html"
   const fallbackRoute = `https://${host}/${_.version}/${_.landingHash}/`

   if (isFileRequest)
    _.setRoute(fallbackRoute)
   else try {
    if (!/^\/\d+\.\d+.\d+\/(?:[\w-]*\/)?$/.test(pathname))
     throw `Pathname '${pathname}' is not valid.`
    _.setRoute(`https://${host}${pathname}`)
   } catch (e) {
    error(e)
    _.setRoute(fallbackRoute)
   }

   color.device.light = event.request.headers.get("sec-ch-prefers-color-scheme") !== 'dark'

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
    break

   case "activate":
    globalThis.skipWaiting()
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
  if (!production)
   target.postMessage({ code: "activate" })
 }

 if (!production)
  addEventListener("focus", () => {
   log(1, 'Checking for updates.')
   worker.registration.update().catch((e) => {
    warn(e)
    // location.reload()
   })
  })
}