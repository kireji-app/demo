globe.addressBar = part

addressBar.throttleDuration = desktop.agent.isSafari ? 350 : 75
addressBar.throttleStartTime = desktop.time
addressBar.isLocal = TAGS.includes("local")
addressBar.hostname = IS_PRODUCTION ? location.hostname : DEVELOPMENT_HOST
addressBar.routeIDs = location.pathname.split(/\/+/).filter(s => s).map(s => addressBar.decodeRoute(s))