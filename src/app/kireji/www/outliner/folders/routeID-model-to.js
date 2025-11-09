let resultRouteID = 0n

for (const host of MODEL) {
 const folderPart = partsByHost[host]

 if (!folderPart)
  continue // The part was moved or doesn't exist anymore, so it can't be linked.

 const folderIndex = folders.folderParts.indexOf(folderPart)
 const toggleBit = 1n << BigInt(folderIndex)
 resultRouteID |= toggleBit
}

return resultRouteID