const numberOfTabsOpen = tabGroup.openTabs.length
const previewTabRouteID = numberOfTabsOpen > 0 ? (tabGroup.previewTabIndex === null ? BigInt(numberOfTabsOpen) : BigInt(tabGroup.previewTabIndex ?? numberOfTabsOpen)) : 0n
const activeTabRouteID = (numberOfTabsOpen > 0 ? BigInt(tabGroup.activeTabIndex) : 0n)

return tabGroup.tabOffsets[numberOfTabsOpen] +
 (
  (
   previewTabRouteID
   * BigInt(numberOfTabsOpen)
   + activeTabRouteID
  )
  * tabGroup.permutationSizes[numberOfTabsOpen]
  + tabGroup.permutationRouteID
 )
 * tabGroup.payloadSizes[numberOfTabsOpen]
 + tabGroup.payloadRouteID