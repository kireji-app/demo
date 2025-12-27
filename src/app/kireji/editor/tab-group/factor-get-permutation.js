const indexOfLastPossibleTabSubject = tabGroup.subjectCount - 1n
const indexOfLastOpenTab = NUMBER_OF_TABS_OPEN - 1n

let permutationFactorOfCurrentTabIndex = 1n

for (let consumedTabIndices = 0n; consumedTabIndices < indexOfLastOpenTab - CURRENT_TAB_INDEX; consumedTabIndices++)
 permutationFactorOfCurrentTabIndex *= indexOfLastPossibleTabSubject - CURRENT_TAB_INDEX - consumedTabIndices

return permutationFactorOfCurrentTabIndex