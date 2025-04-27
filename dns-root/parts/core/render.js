{
 // OPTIONS, the only argument, can be a string or an object.
 if (typeof OPTIONS === "string")
  OPTIONS = { request: OPTIONS }

 // Set some defaults.
 OPTIONS.format ??= "raw"
 OPTIONS.fallback ??= null

 // A request can have a query attached.
 const [stringName, search = ""] = OPTIONS.request.split("?")

 if (!stringName)
  throw part.host + " Render Error: cannot handle render request without a string name. " + serialize(OPTIONS)

 // Some information is needed to handle encoding later.
 const { type, binary: base64, extension } = new StringHeader(stringName)

 // Any query object should be cast to a more useful object.
 const searchParams = new URLSearchParams(search)
 const requestHasParameters = searchParams.size > 0

 // Acquire a raw result from the part instance or return the fallback value.
 // TODO: String Parameters require a function
 //  with the 'render-*.js' pattern to accept PARAMS.

 let body = part[base64 && environment === "server" ? "blank" + extension : stringName]

 if (search)
  warn("Render ignored params: " + OPTIONS.request)

 if (body === undefined || body === "undefined")
  warn("undefined body", part.host, stringName)

 // Process the raw result into the requested format.
 if (OPTIONS.format === "raw")
  return body

 if (OPTIONS.format === "datauri") {
  if (!base64)
   body = btoaUnicode(body)

  return `data:${type};base64,${body}`
 }

 if (OPTIONS.format === "response") {
  if (base64) {
   const B = atob(body ?? "")
   const k = B.length
   const A = new ArrayBuffer(k)
   const I = new Uint8Array(A)

   for (var i = 0; i < k; i++)
    I[i] = B.charCodeAt(i)

   body = new Blob([I], { type })
  }

  return new Response(body, { headers: { "content-type": type, expires: "Sun, 20 Jul 1969 20:17:00 UTC" } })
 }

 throw part.host + ' Render Error: invalid format ' + serialize(OPTIONS)
}