if (typeof MODEL !== "object")
 throw new TypeError(`Model To RouteID Error: Mix "${mix.host}" does not support computing a route ID from a model of type "${typeof MODEL}".`)

const keys = Object.keys(MODEL)

if (!keys.length)
 return 0n

let resultRouteID = 0n

for (const key of keys) {
 const factor = mix[key]

 if (!factor) {
  warn(new ReferenceError(`Model To RouteID Error: Mix "${mix.host}" does not have a factor called ${key}.`))
  continue
 }
 try {
  resultRouteID += factor.modelToRouteID(MODEL[key]) * mix.placeValues.get(factor)
 } catch (e) {
  warn(e)
 }
}

if (resultRouteID >= part.cardinality)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a route ID that was too large (${resultRouteID}) (max ${part.cardinality}).`)

if (resultRouteID < 0n)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a negative route ID.`)

return resultRouteID