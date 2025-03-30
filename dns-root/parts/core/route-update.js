if (ROUTE_ID < -1n)
 throw new RangeError(`(host ${part.host}, index ${part.index}): routeID (${ROUTE_ID}) is too small (min = -1).`)

if (ROUTE_ID >= part.cardinality)
 throw new RangeError(`(host ${part.host}, index ${part.index}): routeID (${ROUTE_ID}) is too large (max = ${part.cardinality}).`)

part.previousRouteID = part.routeID
part.routeID = ROUTE_ID
part.wasEnabled = part.enabled
part.enabled = part.routeID >= 0
part.deltaRouteID = part.routeID - part.previousRouteID

if (part.deltaRouteID === 0n) {
 Framework.warn(' reassigned state to ' + part.key)
}