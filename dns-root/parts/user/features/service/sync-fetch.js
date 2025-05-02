if (environment === "window")
 throw "Calling fetchSync in the window environment is not supported."

service.route = new Route(REQUEST_URL)

if (!(REQUEST_URL in Framework.responses)) {
 user.setRoute(service.route)

 Framework.responses[REQUEST_URL] = (theme.arm.framework.ownFilenameTable.has(service.route.filename) ? theme.arm : user).render({
  request: service.route.filename + service.route.search,
  format: "response"
 })

 if (REQUEST_URL !== service.route.href)
  Framework.responses[service.route.href] = Framework.responses[REQUEST_URL]
}

return Framework.responses[REQUEST_URL].clone()