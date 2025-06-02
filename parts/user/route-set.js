user.route = ROUTE

if (root.parts.user.themes.arm?.key !== root.parts.user.route.host)
 root.parts.user.themes.setArm(root.parts.user.route.host)

if (root.parts.user.route.desktopRouteID !== root.parts.desktop.routeID)
 root.parts.desktop.setRouteID(root.parts.user.route.desktopRouteID)

for (const taskRouteID of root.parts.user.route.taskRouteIDs)
 warn("Do something with this task route ID.", taskRouteID)