pointer.handle({
 click() {
  const host = TARGET_ELEMENT.getAttribute("href").slice(8)

  if (host === _.application?.host)
   return

  const targetLocation = (_.local ? `http://${host}.localhost:3000` : `https://${host}`) + encodePathname(_.routeID)

  location = targetLocation
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})