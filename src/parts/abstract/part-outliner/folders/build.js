const folderParts = []

for (let i = 0; i < allParts.length; i++) {
 const childPart = allParts[i]
 const childArray = folders[".."].getChildren(childPart)

 if (childArray.length)
  folderParts.push(childPart)
}

folders.define({
 cardinality: { value: 2n ** BigInt(folderParts.length) },
 folderParts: { value: folderParts },
 openParts: { value: new Set() }
})