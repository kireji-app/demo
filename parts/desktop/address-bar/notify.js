if (!facet.supported)
 throw "Can't set address bar right now. " + facet.error

if (now - addressBar.throttleStartTime >= addressBar.throttleDuration) {
 if (_.routeID !== _.routeIDs[0][0]) {
  _.routeIDs[0][0] = _.routeID
  history.replaceState({}, null, swap(_.routeIDs))
  addressBar.throttleStartTime = now
 }
}