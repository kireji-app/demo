if (ENVIRONMENT === "window")
 throw "Cannot call fetchSync from client window."

if (REQUEST_URL in Framework.responses)
 return Framework.responses[REQUEST_URL]

const route = new Route(REQUEST_URL)

if (!route.routeIDs.length) {
 warn('Handle the case for a lack of user settings here.')
 route.pathname = "/1"
}

if (!(route.host in theme)) {
 warn('Handle the case for a host that isn\'t a theme.')
 route.port = ''
 route.host = "localhost:3000"
}

if (theme.arm?.key !== route.host)
 theme.setArm(route.host)


const [userRouteID, ...taskRouteIDs] = route.routeIDs
if (userRouteID !== user.routeID) {
 if (userRouteID >= user.cardinality) {
  route.routeIDs = [0n, ...route.routeIDs.slice(1)]
  warn('Out-of-range task replaced. Add a new task with error message containing ' + userRouteID + ". For all other tasks, replace the existing task.")
 }

 user.setRoute(route.routeIDs[0])
}

Framework.responses[route.href] = desktop.render({
 request: route.stringName + route.search,
 format: "response"
})

return Framework.responses[route.href].clone()