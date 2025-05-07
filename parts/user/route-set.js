if (theme.arm?.key !== ROUTE.host)
 theme.setArm(ROUTE.host)

if (ROUTE.desktopRouteID !== desktop.routeID)
 desktop.setRouteID(ROUTE.desktopRouteID)

for (const taskRouteID of ROUTE.taskRouteIDs) {
 warn("Do something with this task route ID.", taskRouteID)
}