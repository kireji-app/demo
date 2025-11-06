const
 securityHeader = {
  'request-Content-Type-Options': 'nosniff',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  "Accept-CH": "Sec-CH-Prefers-Color-Scheme",
  "Critical-CH": "Sec-CH-Prefers-Color-Scheme",
 },
 serviceHeader = {
  ETag: _.ETag,
  'Content-Type': 'application/javascript;charset=UTF-8',
  'Cache-Control': 'public, max-age=0, immutable',
  ...securityHeader
 },
 indexHeader = {
  "Retry-After": "86400",
  'Content-Type': 'text/html;charset=UTF-8',
  "Document-Policy": "force-load-at-top",
  "Vary": "Sec-CH-Prefers-Color-Scheme",
  // 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; image-src data:; script-src self 'unsafe-inline'",
  // 'Permissions-Policy': 'microphone=(), camera=(), web-share=(self), full-screen=(self)',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  ...securityHeader
 },
 currentExports = {
  proxy(host, pathname, ifNoneMatch, prefersDarkMode) {

   let status, head, body, logMessage
   const defaultRoute = `https://${host}/${_.version}/${_.landingHash}/`

   respond: {
    if (pathname === `/${_.version}/${_.codename}.js`) {

     debug({ ifNoneMatch, ETag: _.ETag })

     if (ifNoneMatch === _.ETag) {
      status = 304
      head = { ETag: _.ETag, ...securityHeader }
      logMessage = "Confirming Artifact"
      break respond
     }

     _.setRoute(defaultRoute)
     status = 200
     head = serviceHeader
     body = _.pack(false)
     logMessage = "Serving Artifact"
     break respond

    }

    color.device.light = !prefersDarkMode
    status = 200
    head = indexHeader
    try {
     _.setRoute(`https://${host}${pathname}`)
     logMessage = "Rendering Snapshot"
    } catch (e) {
     error(e)
     logMessage = "Rendering Fallback"
     _.setRoute(defaultRoute)
    }
    body = _['index.html']
    break respond
   }

   return { status, head, body, logMessage }
  },
  decode(segment) {
   try {
    _.setRouteID(decodeSegment(segment))
   } catch (e) {
    error(e)
    _.setRouteID(decodeSegment(_.landingHash))
   }
   return _.model
  },
  encode(model) {
   return encodeSegment(_.modelToRouteID(model))
  }
 }

module.exports = currentExports

if (require.main !== module) {
 logScope(0, "Module is not main. Skipping HTTP server.")
 return
}

const
 logServerScope = (col1, col2, col3, callback) =>
  logScope(0, `\n${("" + col1).padEnd(22, " ")} ${(Math.trunc(process.memoryUsage().rss / 1024 / 1024) + " MiB").padEnd(8, " ")} ${("" + col2).padStart(24, " ")} ${col3}`, log =>
   callback((col1, col2, col3) => log(`${("" + col1).padEnd(20, " ")} ${(Math.trunc(process.memoryUsage().rss / 1024 / 1024) + " MiB").padEnd(8, " ")} ${("" + col2).padStart(24, " ")} ${col3}`)))

logScope(0, `\nCreating Deployment Artifact`, log => {
 const
  fs = require("fs"),
  archiveFolder = '../.versions',
  artifactPath = `${archiveFolder}/${_.version}.js`

 log(`Saving artifact to ${artifactPath}`)

 if (!fs.existsSync(archiveFolder))
  fs.mkdirSync(archiveFolder)

 fs.writeFileSync(artifactPath, _.pack(true))

 log("Success.")
})

logScope(1, `\nDeployment Artifact Stats`, () => {
 logStringSize(1, preHydrationArchive)
})

const httpServer = require('http').createServer((request, response) => logServerScope(
 new Date().toLocaleString(),
 request.headers["x-real-ip"] ?? "local-self",
 `https://${request.headers.host}${request.url}`,
 log => {
  let status, head = {}, body, logMessage
  let host = request.headers.host
  const { href, pathname, searchParams } = new URL(`https://${host}${request.url}`)

  try {
   respond: {

    if (pathname === '/-v') {
     status = 200
     head = { 'Content-Type': 'text/plain', ...securityHeader }
     body = _.version
     logMessage = "Serving Version"
     break respond
    }

    const devSuffix = "localhost:3000"
    const isLocalRequest = host.endsWith(devSuffix)
    if (isLocalRequest) {
     host = host.slice(0, -1 - devSuffix.length)
     if (!(host in _.applications)) {
      /* 302 forward invalid application requests.
         This is handled by NGINX on the real server. */
      if (host && !host.startsWith("www.")) host = "www." + host
      if (!(host in _.applications))
       host = _.defaultApplication ?? Object.getOwnPropertyNames(_.applications)[0]

      status = 302
      head = { 'Location': `http://${host}.${devSuffix}${pathname}`, ...securityHeader }
      logMessage = "Setting Application"
      break respond
     }
    }

    const destinationVersion = pathname.match(/^\/(\d+\.\d+\.\d+)(?:\/.*)?$/)?.[1]

    if (!destinationVersion) {
     status = 302
     _.setRoute(`https://${host}/${_.version}/${_.landingHash}/`)
     const translatedPathname = pathname === "/" ? encodePathname(_.routeID) : _.translateCanonicalPathname(host, pathname)
     head = { 'Location': translatedPathname, ...securityHeader }
     logMessage = "Translating Pathname"
     break respond
    }

    /** @type {IVersionedExports} */
    const destinationExports = destinationVersion === _.version ? currentExports : require(`../.versions/${destinationVersion}.js`)

    const sourceVersion = searchParams.get("from")
    if (sourceVersion) {
     if (!/^\d+\.\d+\.\d+$/.test(sourceVersion))
      throw "Unsupported `from` parameter: " + sourceVersion
     /** @type {IVersionedExports} */
     const sourceExports = require(`../.versions/${sourceVersion}.js`)
     const sourceHash = pathname.split("/")[2]
     const model = sourceExports.decode(sourceHash)
     const destinationHash = destinationExports.encode(model)
     status = 302
     head = { 'Location': `/${destinationVersion}/${destinationHash}/`, ...securityHeader }
     logMessage = "Updating Version"
     break respond
    }

    ({ status, head, body, logMessage = "Old Proxy" } = destinationExports.proxy(
     host,
     pathname,
     request.headers['if-none-match'],
     request.headers["sec-ch-prefers-color-scheme"] === 'dark'
    ))
   }
  } catch (e) {
   if (e.startsWith("Unsupported Canonical Route"))
    logMessage = "Unsupported Route"
   else if (e.startsWith("Unsupported `from` "))
    logMessage = "Unsupported Version"
   else {
    error(e)
    logMessage = "Unknown Error"
   }
   status = 444
   head = securityHeader
  } finally {
   response.writeHead(status, head)
   response.end(body)

   log(logMessage, status, {
    200: `✓`,
    get 302() { return `↪ ${head.Location}` },
    304: "♻",
    444: "✕"
   }[status])
  }
 }
))

httpServer.listen(3000, () => logScope(0, "HTTP server active on port 3000."))