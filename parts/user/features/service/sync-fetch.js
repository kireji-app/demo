if (environment === "window")
 throw "Calling fetchSync in the window environment is not supported."

//if (!(REQUEST_URL in Framework.responses)) {
if (user.route?.href !== REQUEST_URL)
 user.setRoute(new Route(REQUEST_URL));

// Framework.responses[REQUEST_URL] = 
return (theme.arm.framework.ownFilenameTable.has(user.route.filename) ? theme.arm : user).render({
 request: user.route.filename + user.route.search,
 format: "response"
})

// if (REQUEST_URL !== user.route.href)
//  Framework.responses[user.route.href] = Framework.responses[REQUEST_URL]
//}

// return Framework.responses[REQUEST_URL].clone()