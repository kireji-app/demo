let resultRouteID = 0n

for (const host of MODEL) {
 const folderPart = partsByHost[host]

 // This check is necessary for ingesting the model of an earlier version of the ecosystem.
 if (!folderPart)
  continue // The part was moved/renamed or doesn't exist anymore, so it can't be linked.

 const folderIndex = folders.folderParts.indexOf(folderPart)
 const toggleBit = 1n << BigInt(folderIndex)
 resultRouteID |= toggleBit
}

return resultRouteID