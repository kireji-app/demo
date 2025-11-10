_.noop(EVENT)

if (PART_INDEX === -1n || PART_INDEX >= allParts.length)
 throw new RangeError("Cannot select part with invalid part index " + PART_INDEX)

const routeID = BigInt(PART_INDEX)

if (selected.routeID === routeID)
 return

history.pushState(null, null, location.href)
propertyViewer.scroller.setRouteID(0n)
selected.setRouteID(routeID)