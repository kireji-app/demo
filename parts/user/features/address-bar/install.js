addressBar.throttleDuration = agent.isSafari ? 350 : 75
addressBar.throttleStartTime = user.time
addressBar.route = new Route(location.href)
user.setRoute(addressBar.route)