if (typeof MODEL !== "number")
 throw new TypeError(`Model To RouteID Error: Part "${part.host}" only accepts a number as its model (found ${typeof MODEL}).`)

const resultRouteID = BigInt(MODEL)

if (resultRouteID >= part.cardinality)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a route ID that was too large (${resultRouteID}) (max ${part.cardinality}).`)

if (resultRouteID < 0n)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a negative route ID.`)

return resultRouteID