_.noop(POINTER_EVENT)

if (tabGroup.pointerID !== null)
 return

const
 end = e => {
  if (e.pointerId !== tabGroup.pointerID) return
  document.removeEventListener("pointerup", end)
  document.removeEventListener("pointercancel", end)
  TARGET_ELEMENT.releasePointerCapture(tabGroup.pointerID)
  tabGroup.pointerID = null

  const { left, right, top, bottom } = TARGET_ELEMENT.getBoundingClientRect()

  if (e.clientX >= left && e.clientX <= right && e.clientY >= top && e.clientY <= bottom) {

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

   warn('update the outliner folders now')

   const numberOfTabsOpen = tabGroup.openTabs.length
   tabGroup.updateRouteID(tabGroup.permutationRouteID + (numberOfTabsOpen > 0 ? BigInt(tabGroup.activeTab) : 0n) * tabGroup.permutationSizes[numberOfTabsOpen] + tabGroup.tabOffsets[numberOfTabsOpen])
   editor.collectRouteID([tabGroup], 1)
   kirejiApp.collectRouteID([editor])
   kirejiApp[".."].collectPopulateView()
   kirejiApp.distributePopulateView()
   kirejiApp.distributeClean()
   kirejiApp.collectClean()
  }
 },
 cancel = e => {
  if (e.pointerId !== tabGroup.pointerID) return
  document.removeEventListener("pointerup", end)
  document.removeEventListener("pointercancel", cancel)
  tabGroup.pointerID = null
  TARGET_ELEMENT.releasePointerCapture(tabGroup.pointerID)
 }

tabGroup.pointerID = POINTER_EVENT.pointerId
TARGET_ELEMENT.setPointerCapture(tabGroup.pointerID)
document.addEventListener("pointerup", end)
document.addEventListener("pointercancel", cancel)