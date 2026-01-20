if (part.isAbstract)
 throw new Error(`You can't set the route ID of an abstract part. (${part.host})`)

if (ROUTE_ID === undefined)
 throw new Error(`The ROUTE_ID argument is missing. ` + part.host)

if (typeof ROUTE_ID !== "bigint" || ROUTE_ID < -1n)
 throw new Error(`Route ID is invalid. ` + part.host)

if (ROUTE_ID >= part.cardinality)
 throw new Error(`Route ID (${ROUTE_ID}) out of range (max = ${part.cardinality - 1n}). ` + part.host)

part.previousRouteID = part.routeID
part.routeID = ROUTE_ID
part.wasEnabled = part.enabled
part.enabled = part.routeID >= 0
part.disabled = part.routeID === -1n
part.justEnabled = part.enabled && !part.wasEnabled
part.justDisabled = !part.enabled && part.wasEnabled
part.deltaRouteID = part.routeID - part.previousRouteID

if (part.deltaRouteID === 0n)
 warn(`Reassigned route ID (${part.routeID}) to part.\n ${part[".."] ? `${part[".."].key} {\n  ${part.key} : "${part.host}" // <--- this part \n }` : part.host}`)

part.dirty = true