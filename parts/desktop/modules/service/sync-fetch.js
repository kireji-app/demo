if (environment === "window")
 throw "Calling fetchSync in the window environment is not supported."

if (_.route?.href !== REQUEST_URL)
 _.parts.user.setRoute(new Route(REQUEST_URL))

return _.parts.user.render({
 request: environment === "worker" ? _.route.filename + _.route.search : "index.html",
 format: "response"
})