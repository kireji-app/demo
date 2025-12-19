folders.updateRouteID(ROUTE_ID)

let openParts = 0

folders.openParts.clear()

for (let i = 0; i < folders.folderParts.length; i++) {
 const folderPart = folders.folderParts[i]
 const toggleBit = 1n << BigInt(i)
 if ((toggleBit & folders.routeID) > 0n)
  folders.openParts.add(folderPart)
}