if (SUBPARTS.includes(part[0]))
 part.updateRouteID(part[0].routeID)

part.parent?.collectRouteID([part])