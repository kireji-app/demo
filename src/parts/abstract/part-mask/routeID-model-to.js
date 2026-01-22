let resultRouteID = 0n

for (const host of MODEL) {
 const chosenPart = partsByHost[host]

 // This check is necessary for ingesting the model of an earlier version of the ecosystem.
 if (!chosenPart)
  continue // The part was moved/renamed or doesn't exist anymore, so it can't be linked.

 const partIndex = partMask.superset.indexOf(chosenPart)
 const toggleBit = 1n << BigInt(partIndex)
 resultRouteID |= toggleBit
}

if (resultRouteID >= part.cardinality)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a route ID that was too large (${resultRouteID}) (max ${part.cardinality}).`)

if (resultRouteID < 0n)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a negative route ID.`)

return resultRouteID