part.updateRouteID(ROUTE_ID)

// The core part can act as a "tee", passing its exact state along to as many subparts as it wants.
for (const subpart of part) {
 throw `cannot distribute base part state to subparts (${part.host} => ${subpart.host})`
 subpart.distributeRouteID(ROUTE_ID)
}