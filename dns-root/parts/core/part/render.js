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

 const searchParams = new URLSearchParams(search)
 const requestHasParameters = searchParams.size > 0

 // TODO: Remove legacy search params code.

 let body = part[filename]

 if (/*(environment !== "client" || !client.hydrated) && */[".gif", ".png"].includes(extension)) {
  const placeholder = _["1x1.gif"]
  let sizeBlock
  if (extension === ".gif")
   sizeBlock = atob(body.slice(8, 16)).slice(0, 4)
  else if (extension === ".png") {
   const x = atob(body.slice(20, 32)).slice(1)
   sizeBlock = x[3] + x[2] + x[7] + x[6]
  }
  body = placeholder.slice(0, 8) + btoa(sizeBlock + atob(placeholder.slice(8, 16)).slice(4)) + placeholder.slice(16)
  let imgOwner = part
  while (imgOwner && !imgOwner.filenames.includes(filename))
   imgOwner = imgOwner.prototype
  filetype = `image/gif;inert;${imgOwner.host}/${filename}`
 }

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