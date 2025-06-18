if (!module.supported)
 throw "Cannot set address bar right now. " + module.error

if (now - (addressBar.throttleStartTime ??= now) >= addressBar.throttleDuration) {
 if (_.route.singletonRouteID !== desktop.routeID) {
  _.route.routeIDs = [desktop.routeID, ..._.route.routeIDs.slice(1)]
  history.replaceState({}, null, _.route.pathname)
 }
}