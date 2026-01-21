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

// Extract the per-tab payload data.
let payloadRouteID = ROUTE_ID % tabGroup.payloadSizes[numberOfTabsOpen]
ROUTE_ID /= tabGroup.payloadSizes[numberOfTabsOpen]

// Extract the permutation data.
let permutationRouteID = ROUTE_ID % tabGroup.permutationSizes[numberOfTabsOpen]
ROUTE_ID /= tabGroup.permutationSizes[numberOfTabsOpen]

// Extract the index of the active tab.
tabGroup.activeTabIndex = numberOfTabsOpen === 0n ? null : Number(ROUTE_ID % numberOfTabsOpen)
ROUTE_ID /= (numberOfTabsOpen === 0n ? 1n : numberOfTabsOpen)

// Extract the index of the preview tab.
tabGroup.previewTabIndex = ROUTE_ID === numberOfTabsOpen ? null : Number(ROUTE_ID)

// Conditionally extract the file data for each of the open tabs.
if (numberOfTabsOpen !== tabGroup.openTabs.length || tabGroup.permutationRouteID !== permutationRouteID || tabGroup.payloadRouteID !== payloadRouteID) {

 // Cache the permutation route ID to avoid unnecessarily repeating this expensive operation.
 tabGroup.permutationRouteID = permutationRouteID
 tabGroup.payloadRouteID = payloadRouteID

 // Prepare an empty Fenwick tree for converting availability-based indices to absolute indices.
 tabGroup.tree = new tabGroup.FenwickTree()

 const indexOfLastOpenTab = numberOfTabsOpen - 1n
 const indexOfLastPossibleTabSubject = tabGroup.subjectCount - 1n

 for (let currentTabIndex = 0n; currentTabIndex < numberOfTabsOpen; currentTabIndex++) {

  // Use mix-based logic to extract the current tab's availability-based item index.
  const permutationFactorOfCurrentTabIndex = tabGroup.getPermutationFactor(numberOfTabsOpen, currentTabIndex)
  const availabilityIndexOfActiveTabSubject = permutationRouteID / permutationFactorOfCurrentTabIndex
  permutationRouteID %= permutationFactorOfCurrentTabIndex

  // Use the Fenwick tree to obtain the true index of the tab subject in the list of all subjects.
  const trueIndexOfActiveTabSubject = tabGroup.tree.findNthAvailable(availabilityIndexOfActiveTabSubject)

  // Consume that index of the Fenwick tree in preparation for the next iteration.
  tabGroup.tree.update(trueIndexOfActiveTabSubject, -1n)

  // Use mix-based logic to extract the current tab's data payload.
  const payload = payloadRouteID % tabGroup.payloadCardinality
  payloadRouteID /= tabGroup.payloadCardinality

  // Using embedded match logic, split apart the true index into usable file data.
  if (trueIndexOfActiveTabSubject < allParts.length) {

   // The index is in the first plane; it maps to the set of parts themselves.
   tabGroup.openTabs[currentTabIndex] = {
    part: allParts[trueIndexOfActiveTabSubject],
    payload
   }
  } else {

   // The index is among the later planes, indicating a specific file defined on a specific part.
   for (let indexOfPlane = 1; indexOfPlane <= allParts.length; indexOfPlane++) {
    const nextPlaneIndex = indexOfPlane + 1
    if (nextPlaneIndex > allParts.length || trueIndexOfActiveTabSubject < tabGroup.partOffsets[nextPlaneIndex]) {
     const indexOfOwningPart = indexOfPlane - 1
     const part = allParts[indexOfOwningPart]
     const firstIndexOfCurrentPlane = tabGroup.partOffsets[indexOfPlane]
     const indexOfSubjectWithinCurrentPlane = Number(trueIndexOfActiveTabSubject) - firstIndexOfCurrentPlane
     const filename = part.filenames[indexOfSubjectWithinCurrentPlane]
     tabGroup.openTabs[currentTabIndex] = { part, filename, payload }
     break
    }
   }
  }
 }

 // Prune extra tab models.
 while (numberOfTabsOpen < tabGroup.openTabs.length)
  tabGroup.openTabs.pop()
}