if (!facet.supported)
 throw "Can't set address bar right now. " + facet.error

if (addressBar.timer)
 clearTimeout(addressBar.timer)

addressBar.timer = setTimeout(() => {
 if (_.routeID !== addressBar.routeIDCache) {
  addressBar.routeIDCache = _.routeID
  history.replaceState({}, null, encodeRoute(_.routeID))
  addressBar.throttleStartTime = performance.now()
  addressBar.timer = undefined
 }
}, addressBar.throttleDuration + addressBar.throttleStartTime - now)