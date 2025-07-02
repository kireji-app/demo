if (!facet.supported)
 throw "Cannot set address bar right now. " + facet.error

if (now - (addressBar.throttleStartTime ??= now) >= addressBar.throttleDuration) {
 if (_.routeID !== _.routeIDs[0][0]) {
  _.routeIDs[0][0] = _.routeID
  history.replaceState({}, null, swap(_.routeIDs))
 }
}