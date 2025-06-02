{
 // OPTIONS, the only argument, can be a filename or an options object.
 if (typeof OPTIONS === "string")
  OPTIONS = { request: OPTIONS }

 // Set some defaults.
 OPTIONS.format ??= "raw"
 OPTIONS.fallback ??= null

 // A request can have a query attached.
 const [filename, search = ""] = OPTIONS.request.split("?")

 if (!filename)
  throw part.host + " Render Error: cannot handle render request without a filename. " + serialize(OPTIONS)

 // Some information is needed to handle encoding later.
 const { filetype, binary, extension } = new FileHeader(filename)

 // Any query object should be cast to a more useful object.
 const searchParams = new URLSearchParams(search)
 const requestHasParameters = searchParams.size > 0

 // Acquire a raw result from the part instance or return the fallback value.
 // TODO: Search parameters require a generating function.
 //  with the 'render-*.js' pattern to accept PARAMS.

 let body = part[binary && environment === "server" ? "blank" + extension : filename]

 if (search)
  warn("Render ignored params: " + OPTIONS.request)

 if (body === undefined || body === "undefined")
  warn("undefined body", part.host, filename)

 // Process the raw result into the requested format.
 if (OPTIONS.format === "raw")
  return body

 if (OPTIONS.format === "datauri") {
  if (!binary)
   body = btoaUnicode(body)

  return `data:${filetype};base64,${body}`
 }

 if (OPTIONS.format === "response") {
  if (binary) {
   const B = atob(body ?? "")
   const k = B.length
   const A = new ArrayBuffer(k)
   const I = new Uint8Array(A)

   for (var i = 0; i < k; i++)
    I[i] = B.charCodeAt(i)

   body = new Blob([I], { type: filetype })
  }

  return new Response(body, { headers: { "content-type": filetype, expires: "Sun, 20 Jul 1969 20:17:00 UTC" } })
 }

 throw part.host + ' Render Error: invalid format ' + serialize(OPTIONS)
}