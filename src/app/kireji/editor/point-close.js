pointer.handle({
 click() {
  const tabIndex = Array.prototype.indexOf.call(document.getElementById("tab-group").children, TARGET_ELEMENT.parentElement)

  if (tabIndex < 0)
   throw `can't close tab: the given element was not a tab in #tabGroup.`

  const
   targetTab = tabGroup.openTabs[tabIndex],
   isClosingActiveTab = tabGroup.activeTab === tabIndex,
   finalTabIndex = isClosingActiveTab ? (tabGroup.activeTab < 1 ? 0 : tabGroup.activeTab - 1) : (tabGroup.activeTab > tabIndex ? tabGroup.activeTab - 1 : tabGroup.activeTab)

  const fallbackTabElement = document.querySelector(`tab-:nth-child(${finalTabIndex + 1})`)

  tabGroup.detachListeners()
  tabGroup.activeTab = null
  tabGroup.openTabs.splice(tabIndex, 1)
  tabGroup.permutationRouteID = tabGroup.getPermutationRouteID(tabGroup.openTabs)

  if (fallbackTabElement)
   tabGroup.activeTab = finalTabIndex

  warn('expand outliner folders now')

  const numberOfTabsOpen = tabGroup.openTabs.length
  tabGroup.updateRouteID(tabGroup.permutationRouteID + (numberOfTabsOpen > 0 ? BigInt(tabGroup.activeTab) : 0n) * tabGroup.permutationSizes[numberOfTabsOpen] + tabGroup.tabOffsets[numberOfTabsOpen])
  editor.collectRouteID([tabGroup], 1)
  kirejiApp.collectRouteID([editor])
  kirejiApp[".."].collectPopulateView()
  kirejiApp.distributePopulateView()
  kirejiApp.distributeClean()
  kirejiApp.collectClean()
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})