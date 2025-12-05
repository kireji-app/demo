const tabCount = MODEL.openTabs.length
return tabGroup.getPermutationRouteID(MODEL.openTabs) + BigInt(MODEL.activeTab) * tabGroup.permutationSizes[tabCount] + tabGroup.tabOffsets[tabCount]