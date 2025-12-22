_.noop(EVENT)

const tabContainer = document.getElementById("tab-group")
const tabCount = tabGroup.openTabs.length
const tabIndex = Array.prototype.indexOf.call(tabContainer.children, TAB_ELEMENT)
const changedAppSubparts = [editor]

if (tabCount > 0) {
 if (tabIndex < 0)
  throw new RangeError("The given TAB_ELEMENT was not in the #tab-group container.")

 if (tabIndex === tabGroup.activeTab)
  return

 tabGroup.activeTab = tabIndex

 let parentFolder = sidebar.view.getParent(tabGroup.openTabs[tabIndex].part)
 let toggleMask = 0n

 while (parentFolder) {
  const folderIndex = sidebar.view.folders.folderParts.indexOf(parentFolder)
  const toggleBit = 1n << BigInt(folderIndex)
  if (!(sidebar.view.folders.routeID & toggleBit))
   toggleMask |= toggleBit
  parentFolder = sidebar.view.getParent(parentFolder)
 }

 const finalRouteID = toggleMask | sidebar.view.folders.routeID

 if (sidebar.view.folders.routeID !== finalRouteID) {
  sidebar.view.folders.distributeRouteID(finalRouteID)
  sidebar.view.collectRouteID([sidebar.view.folders], 2)
  changedAppSubparts.unshift(sidebar)
 }

} else {
 tabGroup.activeTab = null
}

// Detach now to prevent clashes while populating the views in a moment.
if (tabGroup.viewedTab && !tabGroup.viewedTab.filename && !tabGroup.viewedTab.part.isAbstract) {
 tabGroup.viewedTab.part.detach("populate", tabGroup, "listener")
 tabGroup.viewedTab.part.detach("remove", tabGroup, "listener")
}

history.pushState(null, null, location.href)

const changedEditorSubparts = [tabGroup]

if (!(
 tabGroup.viewedTab &&
 tabGroup.openTabs.length &&
 tabGroup.viewedTab.part === tabGroup.openTabs[tabIndex].part &&
 tabGroup.viewedTab.filename === tabGroup.openTabs[tabIndex].filename
) && scroller.routeID !== 0n) {
 scroller.updateRouteID(0n)
 changedEditorSubparts.push(scroller)
}

tabGroup.updateRouteID(tabGroup.permutationRouteID + (tabCount > 0 ? BigInt(tabIndex) : 0n) * tabGroup.permutationSizes[tabCount] + tabGroup.tabOffsets[tabCount])
editor.collectRouteID(changedEditorSubparts, 1)
kirejiApp.collectRouteID(changedAppSubparts)
kirejiApp[".."].collectPopulateView()
kirejiApp.distributePopulateView()
kirejiApp.distributeClean()
kirejiApp.collectClean()