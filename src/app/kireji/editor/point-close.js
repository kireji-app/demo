pointer.handle({
 click() {
  const
   tabIndex = Array.prototype.indexOf.call(document.getElementById("tab-group").children, TARGET_ELEMENT.parentElement),
   changedAppSubparts = new Set([editor])

  if (tabIndex < 0)
   throw `can't close tab: the given element was not a tab in #tabGroup.`

  const
   targetTab = tabGroup.openTabs[tabIndex],
   isClosingActiveTab = tabGroup.activeTabIndex === tabIndex,
   finalTabIndex = isClosingActiveTab ? (tabGroup.activeTabIndex < 1 ? 0 : tabGroup.activeTabIndex - 1) : (tabGroup.activeTabIndex > tabIndex ? tabGroup.activeTabIndex - 1 : tabGroup.activeTabIndex)

  const fallbackTabElement = tabGroup.openTabs.length === 1 ? null : document.querySelector(`tab-:nth-child(${finalTabIndex + 1})`)

  tabGroup.detachListeners()
  tabGroup.activeTabIndex = null
  tabGroup.openTabs.splice(tabIndex, 1)
  tabGroup.permutationRouteID = tabGroup.getPermutationRouteID(tabGroup.openTabs)

  let activePart = null
  const sidebarIsOpen = sidebar.open.model

  if (fallbackTabElement) {
   tabGroup.activeTabIndex = finalTabIndex

   if (sidebarIsOpen) {
    activePart = tabGroup.openTabs[finalTabIndex].part
    let parentFolder = sidebar.view.getParent(activePart)
    let finalRouteID = sidebar.view.folders.routeID

    while (parentFolder) {
     const folderIndex = sidebar.view.folders.folderParts.indexOf(parentFolder)
     finalRouteID |= 1n << BigInt(folderIndex)
     parentFolder = sidebar.view.getParent(parentFolder)
    }

    if (sidebar.view.folders.routeID !== finalRouteID) {
     sidebar.view.folders.distributeRouteID(finalRouteID)
     sidebar.view.collectRouteID([sidebar.view.folders], 1)
     sidebar.collectRouteID([sidebar.view], 1)
     changedAppSubparts.add(sidebar)
    }
   }
  }

  const numberOfTabsOpen = tabGroup.openTabs.length
  tabGroup.updateRouteID(tabGroup.permutationRouteID + (numberOfTabsOpen > 0 ? BigInt(tabGroup.activeTabIndex) : 0n) * tabGroup.permutationSizes[numberOfTabsOpen] + tabGroup.tabOffsets[numberOfTabsOpen])
  editor.collectRouteID([tabGroup], 1)
  kirejiApp.collectRouteID([...changedAppSubparts])
  kirejiApp[".."].collectPopulateView()
  kirejiApp.distributePopulateView()
  kirejiApp.distributeClean()
  kirejiApp.collectClean()

  if (fallbackTabElement && sidebarIsOpen) {
   const { top: sidebarTop, bottom: sidebarBottom } = sidebar.view.scroller.container.getBoundingClientRect()
   const item = sidebar.view.scroller.container.querySelector(`[data-index="${allParts.indexOf(activePart)}"]`)
   const { top, bottom } = item.getBoundingClientRect()

   if ((bottom > sidebarBottom) || (top < sidebarTop))
    item.scrollIntoView({
     behavior: 'instant',
     block: 'center',
    })
  }
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})