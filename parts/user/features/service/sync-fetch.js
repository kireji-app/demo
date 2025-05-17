if (environment === "window")
 throw "Calling fetchSync in the window environment is not supported."

if (user.route?.href !== REQUEST_URL)
 user.setRoute(new Route(REQUEST_URL))

return user.render({
 request: environment === "worker" ? user.route.filename + user.route.search : "index.html",
 format: "response"
})