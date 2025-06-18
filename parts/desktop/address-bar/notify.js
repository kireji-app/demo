if (!facet.supported)
 throw "Cannot set address bar right now. " + facet.error

if (now - (addressBar.throttleStartTime ??= now) >= addressBar.throttleDuration) {
 if (_.route.singletonRouteID !== _.routeID) {
  _.route.routeIDs = [_.routeID, ..._.route.routeIDs.slice(1)]
  history.replaceState({}, null, _.route.pathname)
 }
}