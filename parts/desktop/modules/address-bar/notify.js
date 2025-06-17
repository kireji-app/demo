if (!module.supported)
 throw "Cannot set address bar right now. " + module.error

if (now - (addressBar.throttleStartTime ??= now) >= addressBar.throttleDuration) {
 if (root.route.singletonRouteID !== desktop.routeID) {
  root.route.routeIDs = [desktop.routeID, ...root.route.routeIDs.slice(1)]
  history.replaceState({}, null, root.route.pathname)
 }
}