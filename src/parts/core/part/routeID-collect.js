throw "can't collect the route ID of a base part type"

if (SUBPARTS.includes(part[0]))
 part.updateRouteID(part[0].routeID)

part[".."]?.collectRouteID([part])