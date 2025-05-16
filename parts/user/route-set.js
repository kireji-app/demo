user.route = ROUTE

if (themes.arm?.key !== user.route.host)
 themes.setArm(user.route.host)

if (user.route.desktopRouteID !== desktop.routeID)
 desktop.setRouteID(user.route.desktopRouteID)

for (const taskRouteID of user.route.taskRouteIDs)
 warn("Do something with this task route ID.", taskRouteID)