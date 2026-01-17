pointer.handle({
 click() {
  const { host, pathname, hash } = new URL(TARGET_ELEMENT.href, `https://${_.application.host}${encodePathname(_.routeID)}`)

  if (host !== _.application.host)
   throw 'perform cross origin navigation here'

  const translatedPathname = _.translateCanonicalPathname(_.application.host, pathname, hash)
  const translatedRouteID = decodePathname(translatedPathname)

  if (_.routeID !== translatedRouteID) {
   history.pushState(null, null, location.href)
   _.setRouteID(translatedRouteID)
  }
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})