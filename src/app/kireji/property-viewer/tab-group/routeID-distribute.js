tabGroup.updateRouteID(ROUTE_ID)

const tabCount = (() => {
 let estimate = tabGroup.tabBitDepths[ROUTE_ID.toString(2).length]
 if (ROUTE_ID < tabGroup.tabOffsets[estimate])
  estimate--
 else if (ROUTE_ID >= tabGroup.tabOffsets[estimate + 1n])
  estimate++
 ROUTE_ID -= tabGroup.tabOffsets[estimate]
 return estimate
})()

tabGroup.activeTab = (() => {
 if (tabCount === 0n)
  return null

 const permutationSize = tabGroup.permutationSizes[tabCount]
 const result = ROUTE_ID / permutationSize
 ROUTE_ID %= permutationSize
 return Number(result)
})()

if (tabCount !== tabGroup.openTabs.length || tabGroup.permutationRouteID !== ROUTE_ID) {
 // Extract tab models.
 tabGroup.permutationRouteID = ROUTE_ID
 tabGroup.tree = new tabGroup.TabTree()
 for (let j = 0n; j < tabCount; j++) {
  let p = 1n
  if (tabCount - j > 1n)
   for (let i = 0n; i < tabCount - j - 1n; i++)
    p *= tabGroup.subjectCount - j - 1n - i
  const index = tabGroup.tree.findNthAvailable(ROUTE_ID / p)
  tabGroup.tree.update(index, -1n)
  if (index < allParts.length)
   tabGroup.openTabs[j] = { part: allParts[index] }
  else for (let i = 1; i <= allParts.length; i++) {
   const nextIndex = i + 1
   if (nextIndex > allParts.length || index < tabGroup.partOffsets[nextIndex]) {
    const part = allParts[i - 1]
    const filename = part.filenames[Number(index) - tabGroup.partOffsets[i]]
    tabGroup.openTabs[j] = { part, filename }
    break
   }
  }
  ROUTE_ID %= p
 }

 // Prune extra tab models.
 while (tabCount < tabGroup.openTabs.length)
  tabGroup.openTabs.pop()
}