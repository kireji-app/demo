_.route = ROUTE

if (desktop.theme?.key !== ROUTE.host)
 desktop.theme = desktop.themeHosts[ROUTE.host]

if (ROUTE.singletonRouteID !== desktop.routeID)
 _.setRouteID(ROUTE.singletonRouteID)

for (const taskRouteID of ROUTE.taskRouteIDs)
 warn("Do something with this task route ID.", taskRouteID)