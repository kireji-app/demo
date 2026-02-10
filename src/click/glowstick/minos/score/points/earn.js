if (minosPoints.routeID === minosPoints.cardinality - 1n)
 return

const earnedRouteID = BigInt(EARNINGS) + minosPoints.routeID

if (earnedRouteID > minosPoints.cardinality - 1n)
 minosPoints.setRouteID(minosPoints.cardinality - 1n)
else
 minosPoints.setRouteID(earnedRouteID)