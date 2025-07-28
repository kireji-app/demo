{
 if (typeof OPTIONS === "string")
  OPTIONS = { request: OPTIONS }

 OPTIONS.format ??= "raw"
 OPTIONS.fallback ??= null

 const [filename, search = ""] = OPTIONS.request.split("?")

 if (!filename)
  throw part.host + " Render Error: can't handle render request without a filename. " + serialize(OPTIONS)

 const header = new FileHeader(filename)
 const { binary, extension } = header
 let { filetype } = header

 let body = part[filename]

 // if (body === undefined || body === "undefined")
 //  warn("undefined body", part.host, filename)

 if (OPTIONS.format === "raw")
  return body

 if (OPTIONS.format === "datauri")
  return `data:${binary ? `${filetype};base64,${body}` : `${filetype},${encodeURIComponent(body)}`}`

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