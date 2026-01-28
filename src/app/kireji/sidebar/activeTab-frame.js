if (!sidebar.open.model || tabGroup.openTabs.length === 0)
 return

// Open folders if necessary to expose the active tab element.
let parentFolder = sidebar.view.getParent(tabGroup.openTabs[tabGroup.activeTabIndex].part)
let finalRouteID = sidebar.view.folders.routeID

while (parentFolder) {
 const folderIndex = sidebar.view.folders.superset.indexOf(parentFolder)
 finalRouteID |= 1n << BigInt(folderIndex)
 parentFolder = sidebar.view.getParent(parentFolder)
}

if (sidebar.view.folders.routeID !== finalRouteID)
 sidebar.view.folders.setRouteID(finalRouteID)

// Scroll to the tab if necessary.
const { top: sidebarTop, bottom: sidebarBottom } = sidebar.view.scroller.container.getBoundingClientRect()
const item = sidebar.view.scroller.container.querySelector(`[data-index="${allParts.indexOf(tabGroup.openTabs[tabGroup.activeTabIndex].part)}"]`)
const { top, bottom } = item.getBoundingClientRect()

if ((bottom > sidebarBottom) || (top < sidebarTop))
 item.scrollIntoView({ behavior: 'instant', block: 'center', })