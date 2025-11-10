if (!facet.supported)
 throw "Can't set address bar right now. " + facet.error

if (addressBar.timer)
 clearTimeout(addressBar.timer)

addressBar.timer = setTimeout(() => {
 if (_.routeID !== addressBar.routeIDCache) {
  addressBar.routeIDCache = _.routeID
  const pathname = encodePathname(_.routeID)
  history.replaceState(null, null, pathname)
  addressBar.throttleStartTime = _.now
  addressBar.timer = null
 }
}, addressBar.throttleDuration + addressBar.throttleStartTime - _.now)