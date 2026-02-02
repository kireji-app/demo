if (minosCash.routeID === minosCash.cardinality - 1n)
 return

const earnedRouteID = BigInt(EARNINGS) + minosCash.routeID

if (earnedRouteID > minosCash.cardinality - 1n)
 minosCash.setRouteID(minosCash.cardinality - 1n)
else
 minosCash.setRouteID(earnedRouteID)