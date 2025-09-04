const ETag = `"${_.version}.${_.gitSHA.slice(0, 7)}${_.local ? ("." + Math.random()).slice(2, 10) : ""}"`
const internalPort = 3000
const securityHeader = {
 'request-Content-Type-Options': 'nosniff',
 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
 'X-Frame-Options': 'DENY',
 'Referrer-Policy': 'strict-origin-when-cross-origin',
 "Accept-CH": "Sec-CH-Prefers-Color-Scheme",
 "Critical-CH": "Sec-CH-Prefers-Color-Scheme",
}
const serviceHeader = {
 ETag,
 'Content-Type': 'application/javascript;charset=UTF-8',
 'Cache-Control': 'public, max-age=0, immutable',
 ...securityHeader
}
const indexHeader = {
 "Retry-After": "86400",
 'Content-Type': 'text/html;charset=UTF-8',
 "Document-Policy": "force-load-at-top",
 "Vary": "Sec-CH-Prefers-Color-Scheme",
 // 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; image-src data:; script-src self 'unsafe-inline'",
 // 'Permissions-Policy': 'microphone=(), camera=(), web-share=(self), full-screen=(self)',
 'Cross-Origin-Embedder-Policy': 'require-corp',
 ...securityHeader
}

module.exports = {
 proxy(host, pathname, ifNoneMatch, prefersDarkMode) {

  let status, head, body

  respond: {
   if (pathname === `/${_.version}/kireji.js`) {

    if (ifNoneMatch === ETag) {
     status = 304
     head = { ETag, ...securityHeader }
     break respond
    }

    _.setRoute(`https://${host}/${_.version}/${_.landingHash}/`)
    status = 200
    head = serviceHeader
    body = _["kireji.js"]
    break respond

   }

   color.device.light = !prefersDarkMode

   status = 200
   head = indexHeader
   const defaultRoute = `https://${host}/${_.version}/${_.landingHash}/`
   try {
    _.setRoute(`https://${host}${pathname}`)
   } catch (e) {
    error(e)
    _.setRoute(defaultRoute)
   }
   body = _['index.html']
   break respond
  }

  return { status, head, body }
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

if (require.main === module) {
 const { existsSync: itemExists, mkdirSync: makeFolder, writeFileSync: writeFile } = require("fs")

 const archiveFolder = '../.versions'
 const artifactPath = `${archiveFolder}/${_.version}.js`

 openLog(0, "Saving deployment archive as " + artifactPath)
 if (!itemExists(archiveFolder)) makeFolder(archiveFolder)
 writeFile(artifactPath, _["kireji.js"])
 closeLog(0)

 logStringSize(0, preHydrationArchive)
 logEntropy(1, ...instances)

 require('http').createServer((request, response) => {
  log(0, `${new Date().toLocaleString().padEnd(21, " ")} ${Math.trunc(process.memoryUsage().rss / 1024 / 1024) + " MiB"} --> ${(request.headers["x-real-ip"] ?? "local-self").padEnd(24, " ")} <-- https://${request.headers.host}${request.url}`)
  let status, head = {}, body
  let host = request.headers.host
  const { pathname, searchParams } = new URL(`https://${host}${request.url}`)
  const [, version, segment] = pathname.split("/")

  try {
   respond: {

    if (pathname === '/-v') {
     status = 200
     head = { 'Content-Type': 'text/plain', ...securityHeader }
     body = _.version
     break respond
    }

    const devSuffix = "localhost:3000"
    if (host.endsWith(devSuffix)) {
     host = host.slice(0, -1 - devSuffix.length)
     if (!(host in _.applications)) {
      if (host && !host.startsWith("www."))
       host = "www." + host
      if (!(host in _.applications)) {
       warn(`Unsupported application '${host}'. Forwarding to www.desktop.parts.`)
       host = _.defaultApplication ?? Object.getOwnPropertyNames(_.applications)[0]
      }
      status = 302
      head = { 'Location': `http://${host}.${devSuffix}${pathname}`, ...securityHeader }
      break respond
     }
    }

    if (pathname === '/') {
     status = 302
     head = { 'Location': `/${_.version}/${_.landingHash}/`, ...securityHeader }
     break respond
    } else {
     // TODO: Handle more canonical pathnames
    }

    const serverVersion = pathname.match(/^\/(\d+\.\d+\.\d+)(?:\/.*)?$/)?.[1]
    if (!serverVersion) throw "Unsupported pathname: " + pathname
    /** @type {IVersionedServer} */
    const versionedServer = require(`../.versions/${serverVersion}.js`)

    const alternateModelVersion = searchParams.get("from")
    if (alternateModelVersion) {
     if (!/^\d+\.\d+\.\d+$/.test(alternateModelVersion))
      throw "Unsupported `from` parameter: " + alternateModelVersion
     /** @type {IVersionedServer} */
     const modelProvider = require(`../.versions/${alternateModelVersion}.js`)
     const model = modelProvider.decode(pathname.split("/")[2])
     status = 302
     head = { 'Location': `/${serverVersion}/${versionedServer.encode(model)}/`, ...securityHeader }
     break respond
    }

    ({ status, head, body } = versionedServer.proxy(
     host,
     pathname,
     request.headers['if-none-match'],
     request.headers["sec-ch-prefers-color-scheme"] === 'dark'
    ))
   }
  } catch (e) {
   error(e)
   status = 444
   head = securityHeader
  }
  log(0, `${new Date().toLocaleString().padEnd(21, " ")} ${Math.trunc(process.memoryUsage().rss / 1024 / 1024) + " MiB"} ${status} ${(request.headers["x-real-ip"] ?? "local-self").padEnd(24, " ")} <-- https://${request.headers.host}${request.url}`)
  response.writeHead(status, head)
  response.end(body)
 }).listen(internalPort, () => log(0, "HTTP Server " + ETag))
} else {
 log(0, "Server Module " + ETag)
}