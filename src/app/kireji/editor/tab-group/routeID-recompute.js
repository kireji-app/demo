setUndoPoint()

if (RECOMPUTE_OPEN_TABS) {
 tabGroup.permutationRouteID = tabGroup.getPermutationRouteID(tabGroup.openTabs)
 tabGroup.payloadRouteID = tabGroup.getPayloadRouteID(tabGroup.openTabs)
}

const
 numberOfTabsOpen = tabGroup.openTabs.length,
 previewTabRouteID = numberOfTabsOpen > 0 ? (tabGroup.previewTabIndex === null ? BigInt(numberOfTabsOpen) : BigInt(tabGroup.previewTabIndex ?? numberOfTabsOpen)) : 0n,
 activeTabRouteID = (numberOfTabsOpen > 0 ? BigInt(tabGroup.activeTabIndex) : 0n),
 summarizedRouteID = tabGroup.tabOffsets[numberOfTabsOpen] +
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

if (tabGroup.routeID !== summarizedRouteID) {
 const isChangingActiveTab = tabGroup.viewedActiveTab !== tabGroup.activeTab
 tabGroup.detachListeners()
 tabGroup.setRouteID(summarizedRouteID)
 if (isChangingActiveTab) {
  scroller.scrollToTop()
  sidebar.frameActiveTab()
 }
}