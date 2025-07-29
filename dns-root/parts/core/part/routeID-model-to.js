if (typeof MODEL !== "string")
 throw new TypeError(`Model To RouteID Error: Part "${part.host}" does not support computing a route ID from a model of type "${typeof MODEL}".`)

const routeID = decodeSegment(MODEL)

if (routeID >= part.cardinality)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" does not support a route ID up to ${routeID} (max ${part.cardinality}).`)

return routeID