globalThis.onfetch = event => {
 try {
  const { host, pathname, searchParams } = new URL(event.request.url)

  const alternateModelVersion = searchParams.get("from")

  if (alternateModelVersion || pathname === '/-v')
   return // Let the server field the request.

  const [, version, filename] = pathname.split("/")

  if (version !== _.version)
   throw "Unsupported Cross-Version Service Worker Request"

  const supportedFiles = {
   [`${_.codename}.js`]: "text/javascript",
   "manifest.json": "application/json"
  }

  const isSupportedFile = filename in supportedFiles

  _.setRoute(isSupportedFile ? `https://${host}/${_.version}/${_.landingHash}/` : `https://${host}${pathname}`)

  color.device.light = event.request.headers.get("sec-ch-prefers-color-scheme") !== 'dark'

  event.respondWith(new Response(_[isSupportedFile ? filename : "index.html"], {
   status: !isSupportedFile && _.application.prototype.host === "error.abstract.parts" ? _.application.status : 200,
   headers: {
    "content-type": (isSupportedFile ? supportedFiles[filename] : "text/html") + ';charset=UTF-8',
    "expires": "Sun, 20 Jul 1969 20:17:00 UTC",
   }
  }))

 } catch (e) {
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
   error('Unsupported Worker Message: ' + code)
 }
}
