if (ENVIRONMENT === "window")
 throw "Cannot call fetchSync from client window."

if (REQUEST_URL in Framework.responses)
 return Framework.responses[REQUEST_URL]

const route = new Route(REQUEST_URL)

if (!route.routeIDs.length) {
 warn("assign the default routeIDs here!")
 route.pathname = "/-"
}

if (!IS_PRODUCTION) {
 route.port = ''
 route.host = "www.desktop.parts"
}

if (theme.arm?.key !== route.host)
 theme.setArm(route.host)

if (user.routeID !== route.routeIDs[0])
 user.setRoute(route.routeIDs[0])

Framework.responses[route.href] = desktop.render({
 request: route.stringName + route.search,
 format: "response"
})

return Framework.responses[route.href].clone()