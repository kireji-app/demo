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
  proxy(host, pathname, ifNoneMatch, prefersDarkMode, ifModifiedSince) {

   let status, head, body, logMessage
   const defaultRoute = `https://${host}/${_.version}/${_.landingHash}/`

   respond: {
    if (pathname === `/${_.version}/${_.codename}.js`) {

     if (ifNoneMatch === _.ETag || ifNoneMatch === "W/" + _.ETag) {
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

    if (pathname === `/${_.version}` || pathname === `/${_.version}/`) {
     status = 301
     head = { 'Location': `/${_.version}/${_.landingHash}/`, ...securityHeader }
     logMessage = "Normalizing URL"
     break respond
    }

    // color.device.light = !prefersDarkMode
    head = indexHeader
    _.setRoute(`https://${host}${pathname}`)
    status = host in _.liveApplications ? 200 : _.applications[host].status
    body = _['index.html']
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

    if (pathname === "/robots.txt")
     throw `No Robots`

    if (isLocalRequest && !(host in _.applications)) {
     /* 301 forward invalid application requests.
        This is handled by NGINX on the real server. */
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
     head = sitemapHeader
     body = _.applications[host]["sitemap.xml"]
     logMessage = "Serving Sitemap"
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
    } catch (e) {
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
     } catch (e) {
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
    ({ status, head, body, logMessage } = destinationExports.proxy(
     host,
     pathname,
     request.headers['if-none-match'],
     request.headers["sec-ch-prefers-color-scheme"] === 'dark',
     request.headers['if-modified-since'],
    ))
   }
  } catch (e) {
   if (("" + e).startsWith("No Robots")) {
    const version = e.split(": ").pop()
    logMessage = "No robots.txt"
    status = 404
    body = `<span class=thin>This server</span><span>allows search engine crawlers.</span>`
   } else if (("" + e).startsWith("Bad Version: ")) {
    const version = e.split(": ").pop()
    logMessage = "Unknown Version"
    status = 400
    body = `<span>Version</span><span class=thin>${version}</span><span>was removed or never existed.</span>`
   } else if (("" + e).startsWith("Bad Canonical Path: ") || ("" + e).startsWith("Unsupported `from` ")) {
    logMessage = "Bad Path"
    status = 400
    body = "<span class=thin>Your request</span><span>was not valid.</span>"
   } else if (("" + e).startsWith("Bad Hash Character: ")) {
    const character = e.split(": ").pop()
    logMessage = "Bad Hash"
    status = 400
    body = `<span>Path contained unsupported character "${character}".</span>`
   } else if (("" + e).startsWith("Unknown Canonical Path: ")) {
    const path = e.split(": ").pop()
    logMessage = "Path Not Found"
    status = 404
    body = `<span>📄</span><span class=thin>${path.length > 18 ? "The requested path" : `"${path}"`}</span><span>was removed or never existed.</span>`
   } else {
    error(e)
    logMessage = "Server Error"
    status = 500
    body = "<span>An unknown server error occured.</span>"
   }
   const themeBGColor = (_.applications[host] ?? _.applications[_.defaultApplicationHost])[`theme-light-bg`];
   body = `<style>html {
  background-color: var(--bg);
  --wallpaper-height: 100vh;
  --bg: ${themeBGColor};
  --bg-un-mode: #${color.blendHex(themeBGColor, "cfcfcf", "multiply")};
  font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
 }${_.parts.abstract.error.getErrorCSS(body)}
</style>
${_.parts.abstract.error.getErrorHTML(status, body)}`
   head = indexHeader
  } finally {
   log(logMessage, status, {
    200: `✓`,
    get 302() { return `↪ ${head.Location}` },
    304: "♻",
    400: "✕",
    404: "?",
    // 444: "✕",
    500: "!",
    501: `#`,
   }[status])
   response.writeHead(status, head)
   response.end(body)
  }
 }
))

httpServer.listen(3000, () => logScope(0, "HTTP server active on port 3000."))