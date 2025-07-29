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

if (!match.subpartKeys.includes(key))
 throw new ReferenceError(`Model To RouteID Error: Match "${match.host}" does not have a concrete arm at subdomain "${key}" (available arms are "${match.subpartKeys.join('", "')}").`)

const routeID = match.offsets.get(arm) + (isString ? 0n : arm.modelToRouteID(MODEL[key]))

if (routeID >= part.cardinality)
 throw new RangeError(`Model To RouteID Error: Mix "${part.host}" does not support a route ID up to ${routeID} (max ${part.cardinality}).`)

return routeID