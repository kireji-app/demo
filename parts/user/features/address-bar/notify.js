if (!feature.supported)
 throw "Cannot set address bar right now. " + feature.error

if (now - (addressBar.throttleStartTime ??= now) >= addressBar.throttleDuration) {
 if (user.route.desktopRouteID !== desktop.routeID) {
  user.route.routeIDs = [desktop.routeID, ...user.route.routeIDs.slice(1)]
  history.replaceState({}, null, user.route.pathname)
 }
}