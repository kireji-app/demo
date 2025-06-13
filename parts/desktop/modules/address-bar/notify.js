if (!module.supported)
 throw "Cannot set address bar right now. " + module.error

if (now - (addressBar.throttleStartTime ??= now) >= addressBar.throttleDuration) {
 if (root.parts.user.route.desktopRouteID !== root.parts.desktop.routeID) {
  root.parts.user.route.routeIDs = [root.parts.desktop.routeID, ...root.parts.user.route.routeIDs.slice(1)]
  history.replaceState({}, null, root.parts.user.route.pathname)
 }
}