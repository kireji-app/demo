part.updateRouteID(ROUTE_ID)

// The core part can act as a "tee", passing its exact state along to as many subparts as it wants.
const subparts = [...part]

if (subparts.length)
 throw `can't distribute base part state to subparts (${part.host}).\n${serialize(subparts)}`