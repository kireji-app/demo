if (sidebar.open.routeID === 0n) {
 sidebar.open.setRouteID(1n)
 if (sidebarView.routeID !== BigInt(VIEW_INDEX))
  sidebarView.setRouteID(BigInt(VIEW_INDEX))
} else if (sidebarView.routeID === BigInt(VIEW_INDEX))
 sidebar.open.setRouteID(0n)
else
 sidebarView.setRouteID(BigInt(VIEW_INDEX))