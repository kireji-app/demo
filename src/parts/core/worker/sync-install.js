const supportedFiles = {
 "build.js": "text/javascript",
 "manifest.json": "application/json"
}

globalThis.onfetch = event => logServerScope(
 new Date().toLocaleString(),
 "worker-self",
 event.request.url,
 log => {
  let status, head, body, logMessage
  const { host, pathname, searchParams } = new URL(event.request.url)

  try {
   respond: {

    if (searchParams.get("from")) {
     status = 999
     logMessage = "Updating Version"
     break respond
    }

    if (pathname === '/-v') {
     status = 999
     logMessage = "Serving Version"
     break respond
    }

    if (pathname === `/${_.version}/`) {
     status = 301
     head = { 'Location': `/${_.version}/${_.landingHash}/` }
     logMessage = "Normalizing URL"
     break respond
    }

    const [, version, filename] = pathname.split("/")
    const isSupportedFile = filename in supportedFiles
    _.setRoute((isSupportedFile || filename === undefined) ? `https://${host}/${_.version}/${_.landingHash}/` : `https://${host}${pathname}`)
    // color.device.light = event.request.headers.get("sec-ch-prefers-color-scheme") !== 'dark'
    status = !isSupportedFile && _.application.prototype.host === "error.abstract.parts" ? _.application.status : 200
    head = {
     "content-type": (isSupportedFile ? supportedFiles[filename] : "text/html") + ';charset=UTF-8',
     "expires": "Sun, 20 Jul 1969 20:17:00 UTC",
    }
    body = _[isSupportedFile ? filename : "part.html"]
    logMessage = isSupportedFile ? ("Serving Artifact", "Serving File") : "Serving Snapshot"
   }
  } catch (respondError) {
   try {
    const payload = _.parts.abstract.error.getErrorResponse("" + respondError, host)

    status = payload.status
    head = {
     "content-type": "text/html;charset=UTF-8",
     "expires": "Sun, 20 Jul 1969 20:17:00 UTC",
    }
    body = payload.body
    logMessage = payload.logMessage
   } catch (metaError) {
    error(metaError)
    event.respondWith(Promise.reject(metaError))
   }
  } finally {
   log(logMessage, status, { 200: `✓`, get 302() { return `↪ ${head.Location}` }, get 302() { return `↪ ${head.Location}` }, 304: "♻", 400: "✕", 404: "?", 999: `↪`, 500: "!", 503: `#`, }[status])

   if (status === 999) {
    // Let the server field the request.
    return
   }

   // Let the worker field the request.
   event.respondWith(new Response(body, {
    status,
    headers: head
   }))
  }
 })

globalThis.onactivate = () => globalThis.clients.claim()
// globalThis.oninstall = () => globalThis.skipWaiting()
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
