const isString = typeof MODEL === "string"

if (!isString && typeof MODEL !== "object")
 throw new TypeError(`Model To RouteID Error: Match "${match.host}" does not support computing a route ID from a model of type "${typeof MODEL}".`)

const keys = isString ? [MODEL] : Object.keys(MODEL)

if (!keys.length)
 return 0n

if (keys.length !== 1)
 throw new ReferenceError(`Model To RouteID Error: Match "${match.host}" does not support multiple key assignments (attempted to set "${keys.join('", "')}").`)

const key = keys[0]
const arm = match[key]


if (!match.subparts.includes(arm))
 throw new ReferenceError(`Model To RouteID Error: Match "${match.host}" does not have a concrete arm at subdomain "${key}" (available arms are "${match.subparts.map(subpart => subpart.key).join('", "')}").`)

const resultRouteID = match.offsets.get(arm) + (isString ? 0n : arm.modelToRouteID(MODEL[key]))

if (resultRouteID >= part.cardinality)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a route ID that was too large (${resultRouteID}) (max ${part.cardinality}).`)

if (resultRouteID < 0n)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a negative route ID.`)

return resultRouteID