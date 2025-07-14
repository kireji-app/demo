const path = require('path')

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
 // 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; img-src data:; script-src self 'unsafe-inline'",
 // 'Permissions-Policy': '(), web-share=(self), full-screen=(self)',
 'Cross-Origin-Embedder-Policy': 'require-corp',
 ...securityHeader
}

function serverLog(status, request) {
 log(0, `${new Date().toLocaleString().padEnd(21, " ")} ${status} ${(request.headers["x-real-ip"] ?? "local-self").padEnd(24, " ")} <-- https://${request.headers.host}${request.url}`)
}

require('http').createServer((request, response) => {
 let status, head = {}, body
 let host = request.headers.host
 const pathname = request.url
 const devSuffix = "localhost:3000"

 try {
  setRoute: {
   if (host.endsWith(devSuffix)) {
    host = host.slice(0, -1 - devSuffix.length)
    if (!(host in _.applications)) {
     if (host) warn(`Unsuported application '${host}'. Forwarding to www.desktop.parts.`)
     status = 301
     head = { 'Location': `http://www.desktop.parts.${devSuffix}${pathname}` }
     break setRoute
    }
   }

   if (pathname === "/kireji.js") {

    if (request.headers['if-none-match'] === ETag) {
     status = 304
     head = { ETag }
     break setRoute
    }

    _.setRoute(`https://${host}/`)
    status = 200
    head = serviceHeader
    body = _["kireji.js"]
    break setRoute

   }

   status = 429
   head = indexHeader
   _.setRoute(`https://${host}${pathname}`)
   body = _["index.html"]
  }
 } catch (e) {
  status = 444
  error(e)
  head = {}
 }

 serverLog(status, request)
 response.writeHead(status, head)
 response.end(body)
}).listen(internalPort, () => log(1, "Server ready. ETag: " + ETag))