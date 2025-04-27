if (environment === "window")
 throw "Cannot call fetchSync from client window."

if (REQUEST_URL in Framework.responses)
 return Framework.responses[REQUEST_URL]

service.route = new Route(REQUEST_URL)

if (!service.route.routeIDs.length)
 service.route.routeIDs = [0n]

if (!(service.route.host in theme)) {
 service.route.port &&= ''
 service.route.host = "www.orenjinari.com"
}

if (theme.arm?.key !== service.route.host)
 theme.setArm(service.route.host)

const [desktopRouteID, ...taskRouteIDs] = service.route.routeIDs

if (desktopRouteID !== desktop.routeID) {
 if (desktopRouteID >= desktop.cardinality) {
  service.route.routeIDs = [0n, ...service.route.routeIDs.slice(1)]
  warn('Out-of-range task replaced. Add a new task with error message containing ' + desktopRouteID + ". For all other tasks, replace the existing task.")
 }
 desktop.setRoute(service.route.routeIDs[0])
}

Framework.responses[service.route.href] = (theme.arm.framework.ownStringNameTable.has(service.route.stringName) ? theme.arm : user).render({
 request: service.route.stringName + service.route.search,
 format: "response"
})

return Framework.responses[service.route.href].clone()