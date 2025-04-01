globe.addressBar = part

addressBar.throttleDuration = user.agent.isSafari ? 350 : 75
addressBar.throttleStartTime = user.time
addressBar.isLocal = TAGS.includes("local")
addressBar.hostname = IS_PRODUCTION ? location.hostname : DEVELOPMENT_HOST
addressBar.routeIDs = location.pathname.split(/\/+/).filter(s => s).map(s => addressBar.decodeRoute(s))