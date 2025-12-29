if (!Array.isArray(MODEL))
 throw new TypeError(`Model To RouteID Error: Box "${box.host}" does not support computing a route ID from a model of type "${typeof MODEL}".`)

if (MODEL.length !== box.placeValues.length)
 throw new RangeError(`Model To RouteID Error: Box "${box.host}" does not support computing a route ID from an array with a different length than the number of dimensions the box has.`)

if (MODEL.some(member => typeof member !== "bigint" && isNaN(member)))
 throw new RangeError(`Model To RouteID Error: Box "${box.host}" does not support computing a route ID from an array with element(s) which are not numeric.`)

let resultRouteID = 0n

box.placeValues.forEach((placeValue, i) => resultRouteID += BigInt(MODEL[i]) * box.placeValues[i])

if (resultRouteID >= box.cardinality)
 throw new RangeError(`Model To RouteID Error: Box "${box.host}" does not support a route ID up to ${resultRouteID} (max ${box.cardinality}).`)

return resultRouteID