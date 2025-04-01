Framework.log(0, "Framework.internalFetch " + REQUEST.url)
// This is the closest equivalent to parse state from address bar on the server side.

let { pathname, search, hash, host, href } = new URL(REQUEST.url)
let stringName = ""
host = BUILD.tags.includes("local") ? BUILD.host : host

if (pathname.endsWith("!")) {
 const lastSlashIndex = pathname.lastIndexOf("/")
 pathname = pathname.slice(0, lastSlashIndex)
 stringName = pathname.slice(lastSlashIndex + 1, -1)
} else {
 stringName = "index.html"
}

const segments = pathname.split('/')
const stringName = (segments.pop()) || "index.html!"
search ??= "?raw"

if (!(href in Framework.responses)) {
 const part = new Part(host)

 if (part)
  Framework.responses[href] = part.createResponse(stringName, (search ? search + "&" : "?") + "pathname=" + pathname)
 else
  Framework.warn(0, Framework.environment + " says: 404 at " + host)
}

return Framework.responses[href]?.clone()