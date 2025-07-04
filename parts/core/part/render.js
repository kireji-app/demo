{
 if (typeof OPTIONS === "string")
  OPTIONS = { request: OPTIONS }

 OPTIONS.format ??= "raw"
 OPTIONS.fallback ??= null

 const [filename, search = ""] = OPTIONS.request.split("?")

 if (!filename)
  throw part.host + " Render Error: can't handle render request without a filename. " + serialize(OPTIONS)

 const { filetype, binary, extension } = new FileHeader(filename)

 const searchParams = new URLSearchParams(search)
 const requestHasParameters = searchParams.size > 0

 // TODO: Remove legacy search params code.

 let body = part[binary && environment === "server" ? "blank" + extension : filename]

 if (search)
  warn("Render ignored params: " + OPTIONS.request)

 // if (body === undefined || body === "undefined")
 //  warn("undefined body", part.host, filename)

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