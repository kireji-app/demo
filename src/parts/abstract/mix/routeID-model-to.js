if (typeof MODEL !== "object")
 throw new TypeError(`Model To RouteID Error: Mix "${mix.host}" does not support computing a route ID from a model of type "${typeof MODEL}".`)

const keys = Object.keys(MODEL)

if (!keys.length)
 return 0n

let resultRouteID = 0n

for (const key of keys) {
 const factor = mix[key]

 if (!factor)
  throw new ReferenceError(`Model To RouteID Error: Mix "${mix.host}" does not have a factor called ${key}.`)

 resultRouteID += factor.modelToRouteID(MODEL[key]) * mix.placeValues.get(factor)
}

if (resultRouteID >= part.cardinality)
 throw new RangeError(`Model To RouteID Error: Mix "${part.host}" does not support a route ID up to ${resultRouteID} (max ${part.cardinality}).`)

return resultRouteID