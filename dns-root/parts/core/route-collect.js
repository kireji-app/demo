if (SUBPARTS.includes(part[0]))
 part.updateRoute(part[0].routeID)

part.parent?.collectRoute([part])