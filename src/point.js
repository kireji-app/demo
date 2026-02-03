pointer.handle({
 click() {
  const { host, pathname, hash } = new URL(TARGET_ELEMENT.href, `https://${_.application.host}${encodePathname(_.routeID)}`)

  const destinationVersion = pathname.match(/^\/(\d+\.\d+\.\d+)/)?.[1]

  if (destinationVersion)
   throw `Internal Hyperlink Error: Internal links should be canonical links, not versioned links (linking to "${TARGET_ELEMENT.href}").`

  if (host !== _.application.host) {
   if (host in _.applications) {
    if (pathname === "/" && !hash) {
     const targetLocation = (_.local ? `http://${host}.localhost:${_.port}` : `https://${host}`) + encodePathname(_.routeID)
     location = targetLocation
    } else warn(`Cross-host navigation and canonical pathname are not yet handled because of ambiguity between simply changing applications and linking to a canonical home page (while attempting to navigate to "${TARGET_ELEMENT.href}").`)
   } else window.open(TARGET_ELEMENT.href, '_blank')
   return
  }

  const translatedPathname = _.translateCanonicalPathname(_.application.host, pathname, hash)
  const translatedRouteID = decodePathname(translatedPathname)

  if (_.routeID !== translatedRouteID) {
   setUndoPoint()
   _.setRouteID(translatedRouteID)
  }
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})