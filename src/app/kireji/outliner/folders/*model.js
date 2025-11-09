const openFolders = []

for (let i = 0; i < folders.folderParts.length; i++) {
 const folderPart = folders.folderParts[i]
 const toggleBit = 1n << BigInt(i)
 if ((toggleBit & folders.routeID) > 0n)
  openFolders.push(folderPart.host)
}

return openFolders