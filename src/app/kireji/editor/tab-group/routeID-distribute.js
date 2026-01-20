tabGroup.updateRouteID(ROUTE_ID)

// Extract the number of open tabs.
const numberOfTabsOpen = (() => {
 let estimate = tabGroup.tabBitDepths[ROUTE_ID.toString(2).length]
 if (ROUTE_ID < tabGroup.tabOffsets[estimate])
  estimate--
 else if (ROUTE_ID >= tabGroup.tabOffsets[estimate + 1n])
  estimate++
 ROUTE_ID -= tabGroup.tabOffsets[estimate]
 return estimate
})()

// Extract the index of the active open tab.
tabGroup.activeTabIndex = (() => {
 // TODO: Consider using -1 here instead of null.
 if (numberOfTabsOpen === 0n)
  return null

 const permutationSize = tabGroup.permutationSizes[numberOfTabsOpen]
 const result = ROUTE_ID / permutationSize
 ROUTE_ID %= permutationSize
 return Number(result)
})()

// Conditionally extract the file data for each of the open tabs.
let permutationRouteID = ROUTE_ID
if (numberOfTabsOpen !== tabGroup.openTabs.length || tabGroup.permutationRouteID !== permutationRouteID) {

 // Cache the permutation route ID to avoid unnecessarily repeating this expensive operation.
 tabGroup.permutationRouteID = permutationRouteID

 // Prepare an empty Fenwick tree for converting availability-based indices to absolute indices.
 tabGroup.tree = new tabGroup.FenwickTree()

 const indexOfLastOpenTab = numberOfTabsOpen - 1n
 const indexOfLastPossibleTabSubject = tabGroup.subjectCount - 1n

 for (let currentTabIndex = 0n; currentTabIndex < numberOfTabsOpen; currentTabIndex++) {

  // Use mix-based logic to extract the current tab's availability-based item index.
  const permutationFactorOfCurrentTabIndex = tabGroup.getPermutationFactor(numberOfTabsOpen, currentTabIndex)
  const availabilityIndexOfSelectedTabSubject = permutationRouteID / permutationFactorOfCurrentTabIndex
  permutationRouteID %= permutationFactorOfCurrentTabIndex

  // Use the Fenwick tree to obtain the true index of the tab subject in the list of all subjects.
  const trueIndexOfSelectedTabSubject = tabGroup.tree.findNthAvailable(availabilityIndexOfSelectedTabSubject)

  // Consume that index of the Fenwick tree in preparation for the next iteration.
  tabGroup.tree.update(trueIndexOfSelectedTabSubject, -1n)

  // Using embedded match logic, split apart the true index into usable file data.
  if (trueIndexOfSelectedTabSubject < allParts.length) {

   // The index is in the first plane; it maps to the set of parts themselves.
   tabGroup.openTabs[currentTabIndex] = { part: allParts[trueIndexOfSelectedTabSubject] }
  } else {

   // The index is among the later planes, indicating a specific file defined on a specific part.
   for (let indexOfPlane = 1; indexOfPlane <= allParts.length; indexOfPlane++) {
    const nextPlaneIndex = indexOfPlane + 1
    if (nextPlaneIndex > allParts.length || trueIndexOfSelectedTabSubject < tabGroup.partOffsets[nextPlaneIndex]) {
     const indexOfOwningPart = indexOfPlane - 1
     const part = allParts[indexOfOwningPart]
     const firstIndexOfCurrentPlane = tabGroup.partOffsets[indexOfPlane]
     const indexOfSubjectWithinCurrentPlane = Number(trueIndexOfSelectedTabSubject) - firstIndexOfCurrentPlane
     const filename = part.filenames[indexOfSubjectWithinCurrentPlane]
     tabGroup.openTabs[currentTabIndex] = { part, filename }
     break
    }
   }
  }
 }

 // Prune extra tab models.
 while (numberOfTabsOpen < tabGroup.openTabs.length)
  tabGroup.openTabs.pop()
}