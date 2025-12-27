_.noop(POINTER_EVENT)

if (tabGroup.pointerID !== null)
 return

const
 dragItem = e => {
  if (e.pointerId !== tabGroup.pointerID) return
  e.preventDefault()
  const
   { left: tabsLeft, right: tabsRight, top: tabsTop, bottom: tabsBottom } = tabContainer.getBoundingClientRect(),
   isOverTabGroup = e.clientX >= tabsLeft && e.clientX <= tabsRight && e.clientY >= tabsTop && e.clientY <= tabsBottom
  if (isOverTabGroup) {
   if (tabContainer.parentElement.hasAttribute("data-drop-target"))
    tabContainer.parentElement.removeAttribute("data-drop-target")
   const currentElement = document.elementFromPoint(e.clientX, e.clientY)
   if (currentElement) {
    const currentTab = currentElement.closest("tab-")
    if (dropTargetElement !== currentTab) {
     dropTargetElement?.removeAttribute("data-drop-target")
     dropTargetElement = currentTab
    }
    if (dropTargetElement) {
     const { left: tabLeft, right: tabRight } = currentTab.getBoundingClientRect()
     const center = (tabLeft + tabRight) / 2
     dropTargetElement.setAttribute("data-drop-target", center >= e.clientX ? "before" : "after")
    } else {
     const { right: lastTabRight } = tabContainer.lastElementChild.getBoundingClientRect()
     if (lastTabRight <= e.clientX) {
      dropTargetElement = tabContainer.lastElementChild
      dropTargetElement.setAttribute("data-drop-target", "after")
     } else {
      dropTargetElement = tabContainer.firstElementChild
      dropTargetElement.setAttribute("data-drop-target", "before")
     }
    }
   }
  } else {
   const
    editorRect = tabContainer.parentElement.getBoundingClientRect(),
    draggedItemIsOverEditor = e.clientX >= editorRect.left && e.clientX <= editorRect.right && e.clientY >= editorRect.top && e.clientY <= editorRect.bottom
   if (draggedItemIsOverEditor && !tabContainer.parentElement.hasAttribute("data-drop-target"))
    tabContainer.parentElement.setAttribute("data-drop-target", "")
   else if (!draggedItemIsOverEditor && tabContainer.parentElement.hasAttribute("data-drop-target"))
    tabContainer.parentElement.removeAttribute("data-drop-target")
   if (dropTargetElement) {
    dropTargetElement.removeAttribute("data-drop-target")
    dropTargetElement = null
   }
  }
  if (!dragPreviewElement) {
   dragPreviewElement = activeTabIndexOfDraggedItem === -1 ? (() => {
    const offscreen = document.createElement("div")
    offscreen.innerHTML = tabGroup.renderTabHTML(allParts[PART_INDEX], isNaN(FILE_INDEX) ? undefined : allParts[PART_INDEX].filenames[FILE_INDEX], -1)
    return offscreen.querySelector("tab-")
   })() : TARGET_ELEMENT.cloneNode(true)
   dragPreviewElement.setAttribute("data-drag-preview", "")
   dragPreviewElement.setAttribute("data-selected", "")
   dragPreviewElement.removeAttribute("data-drop-target")
   document.body.appendChild(dragPreviewElement)
  }
  dragPreviewElement.style = `left:${e.clientX}px;top:${e.clientY}px`
 },
 dropItem = e => {

  if (e.pointerId !== tabGroup.pointerID)
   return

  const
   draggedItemRect = TARGET_ELEMENT.getBoundingClientRect(),
   draggedItemWasDroppedOntoItself = e.clientX >= draggedItemRect.left && e.clientX <= draggedItemRect.right && e.clientY >= draggedItemRect.top && e.clientY <= draggedItemRect.bottom,
   tabGroupRect = tabContainer.getBoundingClientRect(),
   draggedItemWasDroppedOntoTabGroup = e.clientX >= tabGroupRect.left && e.clientX <= tabGroupRect.right && e.clientY >= tabGroupRect.top && e.clientY <= tabGroupRect.bottom,
   editorRect = tabContainer.parentElement.getBoundingClientRect(),
   draggedItemWasDroppedOntoEditor = e.clientX >= editorRect.left && e.clientX <= editorRect.right && e.clientY >= editorRect.top && e.clientY <= editorRect.bottom,
   draggedItemIsAlreadyTheActiveTab = activeTabIndexOfDraggedItem !== -1,
   draggedItemFileData = draggedItemIsAlreadyTheActiveTab ? tabGroup.openTabs[activeTabIndexOfDraggedItem] : { part: allParts[PART_INDEX], filename: isNaN(FILE_INDEX) ? undefined : allParts[PART_INDEX].filenames[FILE_INDEX] },
   existingTabIndexOfFileData = draggedItemIsAlreadyTheActiveTab ? activeTabIndexOfDraggedItem : tabGroup.openTabs.findIndex(tab => tab.part === draggedItemFileData.part && tab.filename === draggedItemFileData.filename),
   tabAlreadyExistsForFileData = existingTabIndexOfFileData !== -1,
   numberOfTabsOpen = tabGroup.openTabs.length,
   conditionallyActivateExistingTab = () => {
    if (existingTabIndexOfFileData !== tabGroup.activeTab)
     changeActiveTab(existingTabIndexOfFileData)
   },
   createAndActivateNewTabAt = indexOfNewlyCreatedTab => {
    tabGroup.openTabs.splice(indexOfNewlyCreatedTab, 0, draggedItemFileData)
    changeActiveTab(indexOfNewlyCreatedTab, true)
   },
   handleItemClick = () => {
    if (draggedItemIsAlreadyTheActiveTab)
     return

    if (tabAlreadyExistsForFileData) {
     conditionallyActivateExistingTab()
     return
    }

    const nearestIndexToTheRight = numberOfTabsOpen === 0 ? 0 : tabGroup.activeTab + 1
    createAndActivateNewTabAt(nearestIndexToTheRight)
   },
   handleTabGroupDragAndDrop = () => {
    const indexWhereItemWasDropped = Array.prototype.indexOf.call(tabContainer.children, dropTargetElement) + (dropTargetElement.getAttribute("data-drop-target") === "before" ? 0 : 1)

    if (draggedItemIsAlreadyTheActiveTab || tabAlreadyExistsForFileData) {

     const itemWasDroppedToTheRightOfItself = indexWhereItemWasDropped > existingTabIndexOfFileData
     const correctedIndexWhereItemWasDropped = indexWhereItemWasDropped - +itemWasDroppedToTheRightOfItself

     if (correctedIndexWhereItemWasDropped === existingTabIndexOfFileData) {
      conditionallyActivateExistingTab()
      return
     }

     tabGroup.openTabs.splice(existingTabIndexOfFileData, 1)
     createAndActivateNewTabAt(correctedIndexWhereItemWasDropped)

    } else createAndActivateNewTabAt(indexWhereItemWasDropped)
   }

  if (draggedItemWasDroppedOntoItself) handleItemClick()
  else if (draggedItemWasDroppedOntoTabGroup) handleTabGroupDragAndDrop()
  else if (draggedItemWasDroppedOntoEditor) handleItemClick()
  else { /* Do nothing. */ }

  reset(e)
 },
 reset = e => {
  if (e.pointerId !== tabGroup.pointerID) return
  document.removeEventListener("pointermove", dragItem)
  document.removeEventListener("pointerup", dropItem)
  document.removeEventListener("pointercancel", reset)
  TARGET_ELEMENT.releasePointerCapture(tabGroup.pointerID)
  tabGroup.pointerID = null
  dropTargetElement?.removeAttribute("data-drop-target")
  tabContainer.parentElement.removeAttribute("data-drop-target")
  dropTargetElement = null
  dragPreviewElement?.remove()
  dragPreviewElement = null
 },
 expandOutlinerFolders = () => {
  debug('expand outliner folders here.')
  /* FIX BUG HERE!
  let parentFolder = sidebar.view.getParent(tabGroup.openTabs[activeTabIndexOfDraggedItem].part)
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
  */
 },
 resetScroller = () => {
  if (scroller.routeID === 0n)
   return

  scroller.updateRouteID(0n)
  changedEditorSubparts.add(scroller)
  changedAppSubparts.add(editor)
 },
 changeActiveTab = (newActiveTab, changesPermutation) => {
  history.pushState(null, null, location.href)
  if (changesPermutation)
   tabGroup.permutationRouteID = tabGroup.getPermutationRouteID(tabGroup.openTabs)
  tabGroup.activeTab = newActiveTab
  changedEditorSubparts.add(tabGroup)
  changedAppSubparts.add(editor)
  expandOutlinerFolders()
  tabGroup.detachListeners()
  resetScroller()
  const numberOfTabsOpen = tabGroup.openTabs.length
  tabGroup.updateRouteID(tabGroup.permutationRouteID + (numberOfTabsOpen > 0 ? BigInt(tabGroup.activeTab) : 0n) * tabGroup.permutationSizes[numberOfTabsOpen] + tabGroup.tabOffsets[numberOfTabsOpen])
  editor.collectRouteID([...changedEditorSubparts], 1)
  kirejiApp.collectRouteID([...changedAppSubparts])
  kirejiApp[".."].collectPopulateView()
  kirejiApp.distributePopulateView()
  kirejiApp.distributeClean()
  kirejiApp.collectClean()
 },
 changedEditorSubparts = new Set(),
 changedAppSubparts = new Set(),
 tabContainer = document.getElementById("tab-group"),
 activeTabIndexOfDraggedItem = Array.prototype.indexOf.call(tabContainer.children, TARGET_ELEMENT)

// Begin a drag-and-drop session.
TARGET_ELEMENT.setPointerCapture(tabGroup.pointerID = POINTER_EVENT.pointerId)
document.addEventListener("pointermove", dragItem)
document.addEventListener("pointerup", dropItem)
document.addEventListener("pointercancel", reset)

if (![-1, tabGroup.activeTab].includes(activeTabIndexOfDraggedItem))
 changeActiveTab(activeTabIndexOfDraggedItem)

/** @type {HTMLElement?} */
let dropTargetElement = null
/** @type {HTMLElement?} */
let dragPreviewElement = null