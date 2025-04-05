if (typeof ROUTE_ID !== bigint || ROUTE_ID < -1n)
 throw new PartError(`Route ID is invalid.`)

if (ROUTE_ID >= part.cardinality)
 throw new PartError(`Route ID out of range.`)

part.previousRouteID = part.routeID
part.routeID = ROUTE_ID
part.wasEnabled = part.enabled
part.enabled = part.routeID >= 0
part.disabled = part.routeID === -1n
part.justEnabled = part.enabled && !part.wasEnabled
part.justDisabled = !part.enabled && part.wasEnabled
part.deltaRouteID = part.routeID - part.previousRouteID

if (part.deltaRouteID === 0n)
 throw new PartError('Reassigned routeID.')