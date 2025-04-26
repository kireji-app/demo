if (ENVIRONMENT === "window")
 throw "Cannot call fetchSync from client window."

if (REQUEST_URL in Framework.responses)
 return Framework.responses[REQUEST_URL]

const route = serverless.route = new Route(REQUEST_URL)

if (!(route.host in theme)) {
 // Handle the case for an unknown theme.
 route.port &&= ''
 route.host = "www.orenjinari.com"
}

if (!route.routeIDs.length) {
 // Use the default route.
 route.routeIDs = [0n]
}

if (theme.arm?.key !== route.host)
 theme.setArm(route.host)

const [desktopRouteID, ...taskRouteIDs] = route.routeIDs
if (desktopRouteID !== desktop.routeID) {
 if (desktopRouteID >= desktop.cardinality) {
  route.routeIDs = [0n, ...route.routeIDs.slice(1)]
  warn('Out-of-range task replaced. Add a new task with error message containing ' + desktopRouteID + ". For all other tasks, replace the existing task.")
 }
 desktop.setRoute(route.routeIDs[0])
}

Framework.responses[route.href] = user.render({
 request: route.stringName + route.search,
 format: "response"
})

return Framework.responses[route.href].clone()