if (environment === "window")
 throw "Calling fetchSync in the window environment is not supported."

if (root.route?.href !== REQUEST_URL)
 root.parts.user.setRoute(new Route(REQUEST_URL))

return root.parts.user.render({
 request: environment === "worker" ? root.route.filename + root.route.search : "index.html",
 format: "response"
})