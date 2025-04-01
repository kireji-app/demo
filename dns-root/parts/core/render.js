const [stringName, queryString] = STRING_REQUEST.split("?")
const [type, base64] = Framework.headerOf(stringName)
const isCustom = !!queryString

if (framework.fetchStatic)
 // if the current object has a directly defined render function for this type,
 //  use it

 // if there is no defined render function for this type,
 //  if there is no query string, check for a static own string.
 //
 // if there is no static own string, and if the incoming framework is not CorePart's framework,
 //  call this function with the framework.parent this is not the base, 


 let body = null

if (isCustom)
 body = part.framework.readOwnString(stringName, null)

if (body === null) {
 if (stringName in part.framework.ownStringNameTable)
  body = part.framework.ownStringNameTable
 if (stringName in part)
  body = part()
 let body = part.framework.readString(stringName)
}

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