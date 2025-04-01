globe.addressBar = part

addressBar.throttleDuration = user.agent.isSafari ? 350 : 75
addressBar.throttleStartTime = user.time
addressBar.isLocal = BUILD.tags.includes("local")
addressBar.hostname = addressBar.isLocal ? BUILD.host : location.hostname
addressBar.routeIDs = location.pathname.split(/\/+/).filter(s => s).map(s => addressBar.decodeRoute(s))