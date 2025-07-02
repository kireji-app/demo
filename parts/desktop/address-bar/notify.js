if (!facet.supported)
 throw "Can't set address bar right now. " + facet.error

// TODO: Fix this. It doesn't always capture the "last" thing you did.

if (now - addressBar.throttleStartTime >= addressBar.throttleDuration) {
 if (_.routeID !== _.routeIDs[0][0]) {
  _.routeIDs[0][0] = _.routeID
  history.replaceState({}, null, swap(_.routeIDs))
  addressBar.throttleStartTime = now
 }
}