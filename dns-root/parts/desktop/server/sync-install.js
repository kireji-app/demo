const ETag = `"${_.version}.${_.gitSHA.slice(0, 7)}${_.local ? ("." + Math.random()).slice(2, 10) : ""}`
const internalPort = 3000
const securityHeader = {
 'request-Content-Type-Options': 'nosniff',
 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
 'request-Frame-Options': 'DENY',
 'Referrer-Policy': 'strict-origin-when-cross-origin'
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
 // 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; image-src data:; script-src self 'unsafe-inline'",
 // 'Permissions-Policy': 'microphone=(), camera=(), web-share=(self), full-screen=(self)',
 'Cross-Origin-Embedder-Policy': 'require-corp',
 ...securityHeader
}

module.exports = {
 proxy(host, pathname, ifNoneMatch) {

  let status, head, body

  respond: {
   if (pathname === `/${_.version}/kireji.js`) {

    if (ifNoneMatch === ETag) {
     status = 304
     head = { ETag }
     break respond
    }

    _.setRoute(`https://${host}/${_.version}/${landingHash}/`)
    status = 200
    head = serviceHeader
    body = _["kireji.js"]
    break respond

   }

   status = 200
   head = indexHeader
   _.setRoute(`https://${host}${pathname}`)
   body = _['index.html']
   break respond

  }

  return { status, head, body }
 }
}

if (environment === "server" && require.main === module) {
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
  let status, head = {}, body
  let host = request.headers.host
  const pathname = request.url
  const devSuffix = "localhost:3000"

  try {
   respond: {

    if (pathname === '/-v') {
     status = 200
     head = { 'Content-Type': 'application/json' }
     body = `{"version":${_.version},"nonce":"$1/$2!"}`
     break respond
    }

    if (host.endsWith(devSuffix)) {
     host = host.slice(0, -1 - devSuffix.length)
     if (!(host in _.applications)) {
      if (host) warn(`Unsuported application '${host}'. Forwarding to www.desktop.parts.`)
      status = 301
      head = { 'Location': `http://www.desktop.parts.${devSuffix}${pathname}` }
      break respond
     }
    }

    if (pathname === '/') {
     status = 302
     head = { 'Location': `/${_.version}/${landingHash}/` }
     break respond
    }

    let serverModule

    if (pathname.startsWith(`/${_.version}/`))
     serverModule = module.exports
    else {
     const oldVersion = pathname.match(/^\/(\d+\.\d+\.\d+)(?:\/.*)?$/)?.[1]
     if (oldVersion) serverModule = require(`../.versions/${oldVersion}.js`)
     else throw "Unsupported pathname format: " + pathname
    }

    ({ status, head, body } = serverModule.proxy(host, pathname, request.headers['if-none-match']))

   }
  } catch (e) {
   status = 444
   error(e)
   head = {}
  }

  log(0, `${new Date().toLocaleString().padEnd(21, " ")} ${status} ${(request.headers["x-real-ip"] ?? "local-self").padEnd(24, " ")} <-- https://${request.headers.host}${request.url}`)
  response.writeHead(status, head)
  response.end(body)
 }).listen(internalPort, () => log(0, "HTTP Server " + ETag))
} else {
 log(0, "Server Module " + ETag)
}