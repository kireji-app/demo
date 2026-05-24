if (typeof MODEL !== "number")
 throw new TypeError(`Model To RouteID Error: Part "${part.host}" does not support computing a route ID from a model of type "${typeof MODEL}".`)

const resultRouteID = BigInt(Math.floor((((MODEL % 360) + 360) % 360) * 10))

if (resultRouteID >= part.cardinality)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a route ID that was too large (${resultRouteID}) (max ${part.cardinality}).`)

if (resultRouteID < 0n)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a negative route ID.`)

return resultRouteID