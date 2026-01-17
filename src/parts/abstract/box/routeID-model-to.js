if (!Array.isArray(MODEL))
 throw new TypeError(`Model To RouteID Error: Box "${box.host}" does not support computing a route ID from a model of type "${typeof MODEL}".`)

if (MODEL.length !== box.placeValues.length)
 throw new RangeError(`Model To RouteID Error: Box "${box.host}" does not support computing a route ID from an array with a different length than the number of dimensions the box has.`)

if (MODEL.some(member => typeof member !== "bigint" && isNaN(member)))
 throw new RangeError(`Model To RouteID Error: Box "${box.host}" does not support computing a route ID from an array with element(s) which are not numeric.`)

let resultRouteID = 0n

box.placeValues.forEach((placeValue, i) => resultRouteID += BigInt(MODEL[i]) * box.placeValues[i])

if (resultRouteID >= part.cardinality)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a route ID that was too large (${resultRouteID}) (max ${part.cardinality}).`)

if (resultRouteID < 0n)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a negative route ID.`)

return resultRouteID