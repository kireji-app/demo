const { host, pathname, searchParams, hash } = REQUEST_URL
const filename = pathname.split("/").pop()
const [type, base64] = Framework.headerOf(filename)
const body = part.framework.readString(filename)

if (RESULT_FORMAT === "raw")
 return body

if (RESULT_FORMAT === "datauri")
 return `data:${type};base64,${base64 ? body : Framework.btoaUnicode(body)}`

if (RESULT_FORMAT === "response") {
 if (base64) {
  const B = atob(body)
  const k = B.length
  const A = new ArrayBuffer(k)
  const I = new Uint8Array(A)

  for (var i = 0; i < k; i++)
   I[i] = B.charCodeAt(i)

  body = new Blob([I], { type })
 }

 return new Response(body, { headers: { "content-type": type, expires: "Sun, 20 Jul 1969 20:17:00 UTC" } })
}

throw 'invalid RESULT_FORMAT ' + RESULT_FORMAT