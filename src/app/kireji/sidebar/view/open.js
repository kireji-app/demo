if (sidebar.open.routeID === 0n) {
 sidebar.open.setRouteID(1n)
 sidebar.width.populateView()
 if (sidebarView.routeID !== BigInt(VIEW_INDEX))
  sidebarView.setRouteID(BigInt(VIEW_INDEX))
} else if (sidebarView.routeID === BigInt(VIEW_INDEX)) {
 sidebar.open.setRouteID(0n)
 sidebar.width.populateView()
} else {
 sidebarView.setRouteID(BigInt(VIEW_INDEX))
}


