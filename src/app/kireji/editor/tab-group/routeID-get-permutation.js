const tabCount = BigInt(TABS.length)

const indices = TABS.map(({ host, filename }) => {
 const part = partsByHost[host]
 const index = allParts.indexOf(part)
 return BigInt(filename ? tabGroup.partOffsets[index + 1] + part.filenames.indexOf(filename) : index)
})

tabGroup.tree = new tabGroup.TabTree()
let permutationRouteID = 0n

for (let j = 0n; j < tabCount; j++) {
 let p = 1n
 if (tabCount - j > 1n)
  for (let i = 0n; i < tabCount - j - 1n; i++)
   p *= tabGroup.subjectCount - j - 1n - i
 const fileIndex = indices[j]
 permutationRouteID += tabGroup.tree.query(fileIndex - 1n) * p
 tabGroup.tree.update(fileIndex, -1n)
}

return permutationRouteID