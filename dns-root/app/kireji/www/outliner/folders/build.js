const folderIndex = new Map()
const folderParts = []

for (let i = 0; i < allParts.length; i++) {
 const instance = allParts[i]

 if (!instance.subdomains.length)
  continue

 folderIndex.set(instance.host, i)
 folderIndex.set(i, instance.host)

 folderParts.push(instance)
}

Object.defineProperties(folders, {
 cardinality: { value: 2n ** BigInt(folderParts.length) },
 folderParts: { value: folderParts },
 folderIndex: { value: folderIndex }
})