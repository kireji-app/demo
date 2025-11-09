const folderParts = []

for (let i = 0; i < allParts.length; i++) {
 const instance = allParts[i]

 if (!instance.subdomains.length)
  continue

 folderParts.push(instance)
}

folders.define({
 cardinality: { value: 2n ** BigInt(folderParts.length) },
 folderParts: { value: folderParts }
})