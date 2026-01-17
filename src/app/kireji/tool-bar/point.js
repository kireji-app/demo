pointer.handle({
 click() {
  if (sidebar.open.routeID === 0n) {
   sidebar.open.setRouteID(1n)
   if (toolBar.routeID !== BigInt(VIEW_INDEX))
    toolBar.setRouteID(BigInt(VIEW_INDEX))
  } else if (toolBar.routeID === BigInt(VIEW_INDEX))
   sidebar.open.setRouteID(0n)
  else
   toolBar.setRouteID(BigInt(VIEW_INDEX))
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})