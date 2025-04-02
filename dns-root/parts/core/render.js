// OPTIONS, the only argument, can be a string or an object.
if (typeof OPTIONS === "string")
 OPTIONS = { request: OPTIONS }

// Set some defaults.
OPTIONS.links ??= "follow-all"
OPTIONS.format ??= "raw"
OPTIONS.fallback ??= null

// A request can have a query attached.
const [stringName, search = ""] = OPTIONS.request.split("?")

if (!stringName)
 throw part.host + " Render Error: cannot handle render request without a string name. " + JSON.stringify(OPTIONS)

// Some information is needed to handle encoding later.
const [type, base64, extension] = Framework.headerOf(stringName)

// Any query object should be cast to a more useful object.
const searchParams = new URLSearchParams(search)
const requestHasParameters = searchParams.size > 0

// Delegate any link following to a recursive call.
if (extension === "uri" && OPTIONS.links !== "no-follow") {

 if (!(OPTIONS.links === "follow-all" || OPTIONS.links === "follow-once"))
  throw part.host + " Render Error: invalid links property value: " + OPTIONS.links + ". " + JSON.stringify(OPTIONS)

 const newOptions = { ...OPTIONS }
 const newStringName = part.framework.readString(stringName)

 if (!newStringName) {
  warn(part.host + " Render 404: can't follow .uri link " + stringName + ". " + JSON.stringify(OPTIONS))
  return OPTIONS.fallback
 }

 if (OPTIONS.links === "follow-once")
  newOptions.links = "no-follow"

 newOptions.stringName = newStringName + search

 return render(newOptions)
}

// Acquire the raw result from a defined render endpoint or return the fallback value.
let body = null
const renderMethodSymbol = Symbol.for(stringName)
const partHasRenderMethod = renderMethodSymbol in part
if (partHasRenderMethod) {
 let prototype = part
 while (true) {

  if (requestHasParameters || prototype.framework.ownRenderableStringNames.includes(stringName)) {
   body = part[renderMethodSymbol]()
   break
  }

  if (prototype.framework.ownStringNameTable.has(stringName)) {
   body = prototype.framework.readOwnString(stringName)
   break
  }

  prototype = prototype.super
 }
} else {

 if (requestHasParameters)
  warn(part.host + " Render Warning: ignoring request parameters (no render endpoint found). " + JSON.stringify(OPTIONS))

 body = part.framework.readString(stringName, null)

 if (body === null) {
  warn(part.host + ' Render 404: : no static or dynamic string could fullfil the request: ' + JSON.stringify(OPTIONS))
  return OPTIONS.fallback
 }
}

// Process the raw result into the requested format.
if (RESULT_FORMAT === "raw")
 return body

if (OPTIONS.format === "datauri")
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

throw part.host + ' Render Error: invalid format ' + JSON.stringify(OPTIONS)