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

 if ([".gif", ".png"].includes(extension)) {
  let width, height
  if (extension === ".gif") {
   const sizeBlock = atob(body.slice(8, 16)).slice(0, 4)
   width = sizeBlock.charCodeAt(0) | (sizeBlock.charCodeAt(1) << 8)
   height = sizeBlock.charCodeAt(2) | (sizeBlock.charCodeAt(3) << 8)
  } else if (extension === ".png") {
   const sizeBlock = atob(body.slice(20, 32)).slice(1)
   width = (sizeBlock.charCodeAt(0) << 24) |
    (sizeBlock.charCodeAt(1) << 16) |
    (sizeBlock.charCodeAt(2) << 8) |
    sizeBlock.charCodeAt(3);
   height = (sizeBlock.charCodeAt(4) << 24) |
    (sizeBlock.charCodeAt(5) << 16) |
    (sizeBlock.charCodeAt(6) << 8) |
    sizeBlock.charCodeAt(7);
  }

  body = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"/>`
  let imgOwner = part
  while (imgOwner && !imgOwner.filenames.includes(filename))
   imgOwner = imgOwner.prototype
  filetype = `image/svg+xml;inert;${imgOwner.host}/${filename}`
 }

 // if (body === undefined || body === "undefined")
 //  warn("undefined body", part.host, filename)

 if (OPTIONS.format === "raw")
  return body

 if (OPTIONS.format === "datauri") {
  if (binary && !filetype.startsWith("image/svg+xml"))
   return `data:${filetype};base64,${body}`

  return `data:${filetype},${encodeURIComponent(body)}`
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