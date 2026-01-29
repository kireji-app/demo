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
  'Cache-Control': `public, max-age=${production ? 31536000 : 0}, immutable`,
  ...securityHeader
 },
 sitemapHeader = {
  ETag: _.ETag,
  'Content-Type': 'application/xml',
  'Cache-Control': 'public, max-age=86400, immutable',
  ...securityHeader
 },
 indexHeader = {
  'Content-Type': 'text/html;charset=UTF-8',
  "Document-Policy": "force-load-at-top",
  "Vary": "Sec-CH-Prefers-Color-Scheme",
  // 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; image-src data:; script-src self 'unsafe-inline'",
  // 'Permissions-Policy': 'microphone=(), camera=(), web-share=(self), full-screen=(self)',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  ...securityHeader
 },
 currentExports = {
  proxy(host, pathname, ifNoneMatch, prefersDarkMode, ifModifiedSince) {

   let status, head, body, logMessage
   const defaultRoute = `https://${host}/${_.version}/${_.landingHash}/`

   respond: {
    if (pathname === `/${_.version}/build.js`) {

     if (ifNoneMatch === _.ETag || ifNoneMatch === "W/" + _.ETag) {
      status = 304
      head = { ETag: _.ETag, ...securityHeader }
      logMessage = "Confirming Artifact"
      break respond
     }

     _.setRoute(defaultRoute)
     status = 200
     head = { ...serviceHeader }
     body = _["build.js"]
     logMessage = "Serving Artifact"
     break respond

    }

    if (pathname === `/${_.version}` || pathname === `/${_.version}/`) {
     status = 301
     head = { 'Location': `/${_.version}/${_.landingHash}/`, ...securityHeader }
     logMessage = "Normalizing URL"
     break respond
    }

    // color.device.light = !prefersDarkMode
    _.setRoute(`https://${host}${pathname}`)
    status = +(host in _.menuApplications ? 200 : _.applications[host].status ?? 503)
    const customHeaders = _.applications[host].customHeaders ?? {}
    head = { ...indexHeader, ...customHeaders }
    body = _['part.html']
    logMessage = "Serving Snapshot"
    break respond
   }

   return { status, head, body, logMessage }
  },
  decode(segment) {
   _.setRouteID(decodeSegment(segment))
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

logScope(0, `\nCreating Deployment Artifact`, log => {
 const
  fs = require("fs"),
  archiveFolder = '../.versions',
  artifactPath = `${archiveFolder}/${_.version}.js`

 log(`Saving artifact to ${artifactPath}`)

 if (!fs.existsSync(archiveFolder))
  fs.mkdirSync(archiveFolder)

 fs.writeFileSync(artifactPath, _["build.js"])

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
  const devSuffix = "localhost:3000"
  const isLocalRequest = host.endsWith(devSuffix)
  if (isLocalRequest)
   host = host.slice(0, -1 - devSuffix.length)

  try {
   respond: {

    if (pathname === '/-v') {
     status = 200
     head = { 'Content-Type': 'text/plain', ...securityHeader }
     body = _.version
     logMessage = "Serving Version"
     break respond
    }

    if (["/robots.txt", "/ads.txt", "/sitemap.txt", "/browserconfig.xml"/*, "/mstile-150x150.png"*/].includes(pathname)/* || pathname.startsWith("/apple-touch-icon")*/)
     throw `Config 404:${pathname.slice(1)}`

    if (pathname.startsWith("/.well-known"))
     throw `Config 404:.well-known folder`

    if (pathname.endsWith(".map"))
     throw `Config 404:.map file`

    /*
    if (["/favicon.ico"].includes(pathname))
     throw `Favicon`
    */

    if (isLocalRequest && !(host in _.applications)) {
     /* This is handled by the reverse proxy when not testing locally. */
     if (host && host.startsWith("www."))
      host = host.slice(4)

     if (!(host in _.applications))
      host = _.defaultApplicationHost ?? Object.getOwnPropertyNames(_.applications)[0]

     status = 302
     head = { 'Location': `http://${host}.${devSuffix}${pathname}`, ...securityHeader }
     logMessage = "Setting Application"
     break respond
    }

    if (pathname === "/sitemap.xml") {
     status = 200
     head = { ...sitemapHeader }
     body = _.applications[host]["sitemap.xml"]
     logMessage = "Serving Sitemap"
     break respond
    }

    if (pathname === "/humans.txt") {
     status = 200
     head = { 'Content-Type': 'text/plain', ...securityHeader }
     body = server["humans.txt"]
     logMessage = "Serving Credits!"
     break respond
    }

    if (pathname.startsWith("/apple-touch-icon") || pathname.startsWith("/mstile-") || ["/favicon.ico"].includes(pathname)) {
     status = 200
     head = { 'Content-Type': 'image/png', ...securityHeader }
     body = Buffer.from(_.applications[host]["part.png"], 'base64')
     logMessage = "Serving Icon"
     break respond
    }

    const destinationVersion = pathname.match(/^\/(\d+\.\d+\.\d+)/)?.[1]

    if (!destinationVersion) {
     status = 302
     _.setRoute(`https://${host}/${_.version}/${_.landingHash}/`)
     const translatedPathname = pathname === "/" ? encodePathname(_.routeID) : _.translateCanonicalPathname(host, pathname)
     head = { 'Location': translatedPathname, ...securityHeader }
     logMessage = "Translating Pathname"
     break respond
    }

    /** @type {IVersionedExports} */
    let destinationExports
    try {
     destinationExports = destinationVersion === _.version ? currentExports : require(`../.versions/${destinationVersion}.js`)
    } catch {
     throw `Bad Version: ${destinationVersion}`
    }

    const sourceVersion = searchParams.get("from")
    if (sourceVersion) {
     if (!/^\d+\.\d+\.\d+$/.test(sourceVersion))
      throw "Unsupported `from` parameter: " + sourceVersion
     /** @type {IVersionedExports} */
     let sourceExports
     try {
      sourceExports = require(`../.versions/${sourceVersion}.js`)
     } catch {
      throw `Bad Version: ${sourceVersion}`
     }
     const sourceHash = pathname.split("/")[2]
     const model = sourceExports.decode(sourceHash)
     const destinationHash = destinationExports.encode(model)
     status = 302
     head = { 'Location': `/${destinationVersion}/${destinationHash}/`, ...securityHeader }
     logMessage = "Updating Version"
     break respond
    }

    ;
    const payload = destinationExports.proxy(
     host,
     pathname,
     request.headers['if-none-match'],
     request.headers["sec-ch-prefers-color-scheme"] === 'dark',
     request.headers['if-modified-since'],
    )

    status = payload.status
    head = payload.head
    body = payload.body
    logMessage = payload.logMessage
   }
  } catch (respondError) {
   try {
    const payload = _.parts.abstract.error.getErrorResponse("" + respondError, host)
    status = payload.status
    head = { ...indexHeader }
    body = payload.body
    logMessage = payload.logMessage
   } catch (metaError) {
    error(metaError)
    status = 500
    head = { ...indexHeader }
    body = "<h1>Server Meta Error</h1><p>A server error occurred. Then, a second error was encountered while trying to generate the server error page.</p>"
    logMessage = "Meta Error"
   }
  } finally {
   log(logMessage, status, { 200: `✓`, get 302() { return `↪ ${head.Location}` }, get 301() { return `↪ ${head.Location}` }, 304: "♻", 400: "✕", 404: "?", 500: "!", 503: `#`, }[status])
   response.writeHead(status, head)
   response.end(body)
  }
 }
))

httpServer.listen(3000, () => logScope(0, "HTTP server active on port 3000."))