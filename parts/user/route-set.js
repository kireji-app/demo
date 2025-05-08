user.route = ROUTE

if (theme.arm?.key !== user.route.host)
 theme.setArm(user.route.host)

if (user.route.desktopRouteID !== desktop.routeID)
 desktop.setRouteID(user.route.desktopRouteID)

for (const taskRouteID of user.route.taskRouteIDs)
 warn("Do something with this task route ID.", taskRouteID)