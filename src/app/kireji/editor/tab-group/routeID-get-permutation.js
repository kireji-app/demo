const numberOfTabsOpen = BigInt(TABS.length)

// Prepare an empty Fenwick tree for converting absolute indices to availability-based indices.
tabGroup.tree = new tabGroup.FenwickTree()

// Compile the array of unranked indices into a single permutation identifier.
let permutationRouteID = 0n
for (let currentTabIndex = 0n; currentTabIndex < numberOfTabsOpen; currentTabIndex++) {

 // Use an embedded match to combine the current tab's file data into an absolute tab subject index.
 const { part, filename } = TABS[Number(currentTabIndex)]
 const index = allParts.indexOf(part)
 const trueIndexOfActiveTabSubject = BigInt(filename ? tabGroup.partOffsets[index + 1] + part.filenames.indexOf(filename) : index)

 // Use the Fenwick tree to obtain the availability-based index of the tab subject in the list of remaining subjects.
 const availabilityIndexOfActiveTabSubject = tabGroup.tree.query(trueIndexOfActiveTabSubject - 1n)

 // Consume that index of the Fenwick tree in preparation for the next iteration.
 tabGroup.tree.update(trueIndexOfActiveTabSubject, -1n)

 // Use mix-based logic to compile this index with the rest.
 const permutationFactorOfCurrentTabIndex = tabGroup.getPermutationFactor(numberOfTabsOpen, currentTabIndex)
 permutationRouteID += availabilityIndexOfActiveTabSubject * permutationFactorOfCurrentTabIndex
}

return permutationRouteID