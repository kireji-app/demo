const ETag = `"${_.version}.${_.branch}"`

const securityHeader = {
 'request-Content-Type-Options': 'nosniff',
 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
 'request-Frame-Options': 'DENY',
 'Referrer-Policy': 'strict-origin-when-cross-origin'
}

const serviceHeader = {
 'Content-Type': 'application/javascript;charset=UTF-8',
 'Cache-Control': 'public, max-age=604800',
 ...securityHeader
}

const indexHeader = {
 ETag,
 "Retry-After": "86400",
 'Content-Type': 'text/html;charset=UTF-8',
 "Document-Policy": "force-load-at-top",
 // 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; img-src data:; script-src self 'unsafe-inline'",
 // 'Permissions-Policy': '(), web-share=(self), full-screen=(self)',
 'Cross-Origin-Embedder-Policy': 'require-corp',
 ...securityHeader
}

function serverLog(status, request) {
 log(0, `${new Date().toLocaleString().padEnd(21, " ")} ${status} ${request.headers["x-real-ip"].padEnd(24, " ")} <-- https://${request.headers.host}${request.url}`)
}

require('http').createServer((request, response) => {
 let status, head, body

 _.setRoute(`https://${request.headers.host}${request.url}`)

 if (request.url === "/kireji.js") {
  if (request.headers['if-none-match'] === ETag) {
   status = 304
   head = { ETag }
  } else {
   status = 200
   head = serviceHeader
   body = _["kireji.js"]
  }
 } else {
  status = 429
  head = indexHeader
  body = _["index.html"]
 }

 serverLog(status, request)
 response.writeHead(status, head)
 response.end(body)
}).listen(3000, () => log(1, "https://localhost:3000"))

const logRAM = () => log(7, 'Memory Usage:', process.memoryUsage().rss.toLocaleString())
logRAM()
setInterval(logRAM, 1000)