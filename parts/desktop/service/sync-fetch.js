if (environment === "window")
 throw "Calling fetchSync in the window environment is not supported."

const { host, pathname } = new URL(REQUEST_URL)

// if (_.route?.href !== REQUEST_URL)
//  _.setRoute(new Route(REQUEST_URL))

return new Response(serialize({ x: pathname, y: swap(pathname), test: swap(swap(pathname)) }))

return _.render({
 request: environment === "worker" ? _.route.filename + _.route.search : "index.html",
 format: "response"
})
