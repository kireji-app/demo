_.route = ROUTE

if (desktop.theme?.key !== ROUTE.host)
 desktop.theme = desktop.themeHosts[ROUTE.host]

// if (ROUTE.singletonRouteID !== _.routeID) {
//  // _.setRouteID(ROUTE.singletonRouteID)
//  debug("temporarily stopped standard flow")
// }

for (const routeID of ROUTE.routeIDs)
 warn("Do something with this URL route ID.", routeID)