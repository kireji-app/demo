if (environment === "window")
 throw "Calling fetchSync in the window environment is not supported."

const { pathname } = new URL(REQUEST_URL)
const isFileRequest = ["/service.js", "/manifest.json"].includes(pathname)
const filename = isFileRequest ? pathname.slice(1) : "index.html"
const pattern = /^\/(.*)(?:[.%$#&,;!:=+\\(\\)\\[\\]](.*)|[^/])$/

if (!isFileRequest) {
 if (pattern.test(pathname))
  return new Response('Not Found', {
   status: 404,
   statusText: 'Not Found',
   headers: {
    'Content-Type': 'text/plain'
   }
  })
 else _.setRoute(REQUEST_URL)
}

return _.render({
 request: filename,
 format: "response"
})