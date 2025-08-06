part.updateRouteID(ROUTE_ID)

const subparts = [...part]

if (subparts.length)
 throw `can't distribute base part state to subparts (${part.host}).\n${serialize(subparts)}`