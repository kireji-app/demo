const
 changeActiveTab = (newActiveTabIndex, changesPermutation) => {
  history.pushState(null, null, location.href)
  if (changesPermutation)
   tabGroup.permutationRouteID = tabGroup.getPermutationRouteID(tabGroup.openTabs)
  tabGroup.activeTabIndex = newActiveTabIndex
  changedEditorSubparts.add(tabGroup)
  changedAppSubparts.add(editor)

  const activePart = tabGroup.openTabs[newActiveTabIndex].part
  const sidebarIsOpen = sidebar.open.model

  if (sidebarIsOpen) {
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

  tabGroup.detachListeners()
  if (scroller.routeID !== 0n) {
   scroller.updateRouteID(0n)
   changedEditorSubparts.add(scroller)
  }
  const numberOfTabsOpen = tabGroup.openTabs.length
  tabGroup.updateRouteID(tabGroup.permutationRouteID + (numberOfTabsOpen > 0 ? BigInt(tabGroup.activeTabIndex) : 0n) * tabGroup.permutationSizes[numberOfTabsOpen] + tabGroup.tabOffsets[numberOfTabsOpen])
  editor.collectRouteID([...changedEditorSubparts], 1)
  kirejiApp.collectRouteID([...changedAppSubparts])
  kirejiApp[".."].collectPopulateView()
  kirejiApp.distributePopulateView()
  kirejiApp.distributeClean()
  kirejiApp.collectClean()

  if (sidebarIsOpen) {
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
 changedEditorSubparts = new Set(),
 changedAppSubparts = new Set(),
 tabContainer = document.getElementById("tab-group"),
 activeTabIndexOfDraggedItem = Array.prototype.indexOf.call(tabContainer.children, TARGET_ELEMENT.parentElement)
/** @type {HTMLElement?} */
let dropTargetElement = null
/** @type {HTMLElement?} */
let dragPreviewElement = null

pointer.handle({
 down() {
  if (![-1, tabGroup.activeTabIndex].includes(activeTabIndexOfDraggedItem))
   changeActiveTab(activeTabIndexOfDraggedItem)
 },
 drag(pointerEvent) {
  const
   { left: tabsLeft, right: tabsRight, top: tabsTop, bottom: tabsBottom } = tabContainer.getBoundingClientRect(),
   isOverTabGroup = pointerEvent.clientX >= tabsLeft && pointerEvent.clientX <= tabsRight && pointerEvent.clientY >= tabsTop && pointerEvent.clientY <= tabsBottom
  if (isOverTabGroup) {
   if (tabContainer.parentElement.hasAttribute("data-drop-target"))
    tabContainer.parentElement.removeAttribute("data-drop-target")
   const currentElement = document.elementFromPoint(pointerEvent.clientX, pointerEvent.clientY)
   if (currentElement) {
    const currentTab = currentElement.closest("tab-")
    if (dropTargetElement !== currentTab) {
     dropTargetElement?.removeAttribute("data-drop-target")
     dropTargetElement = currentTab
    }
    if (dropTargetElement) {
     const { left: tabLeft, right: tabRight } = currentTab.getBoundingClientRect()
     const center = (tabLeft + tabRight) / 2
     dropTargetElement.setAttribute("data-drop-target", center >= pointerEvent.clientX ? "before" : "after")
    } else {
     const { right: lastTabRight } = tabContainer.lastElementChild.getBoundingClientRect()
     if (lastTabRight <= pointerEvent.clientX) {
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
    draggedItemIsOverEditor = pointerEvent.clientX >= editorRect.left && pointerEvent.clientX <= editorRect.right && pointerEvent.clientY >= editorRect.top && pointerEvent.clientY <= editorRect.bottom
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
   })() : TARGET_ELEMENT.parentElement.cloneNode(true)
   dragPreviewElement.setAttribute("data-drag-preview", "")
   dragPreviewElement.setAttribute("data-selected", "")
   dragPreviewElement.removeAttribute("data-drop-target")
   document.body.appendChild(dragPreviewElement)
  }
  dragPreviewElement.style = `left:${pointerEvent.clientX}px;top:${pointerEvent.clientY}px`
 },
 drop(pointerEvent) {
  // TODO: break into separate "click" and "drop" handlers.
  const
   draggedItemRect = TARGET_ELEMENT.getBoundingClientRect(),
   draggedItemWasDroppedOntoItself = pointerEvent.clientX >= draggedItemRect.left && pointerEvent.clientX <= draggedItemRect.right && pointerEvent.clientY >= draggedItemRect.top && pointerEvent.clientY <= draggedItemRect.bottom,
   tabGroupRect = tabContainer.getBoundingClientRect(),
   draggedItemWasDroppedOntoTabGroup = pointerEvent.clientX >= tabGroupRect.left && pointerEvent.clientX <= tabGroupRect.right && pointerEvent.clientY >= tabGroupRect.top && pointerEvent.clientY <= tabGroupRect.bottom,
   editorRect = tabContainer.parentElement.getBoundingClientRect(),
   draggedItemWasDroppedOntoEditor = pointerEvent.clientX >= editorRect.left && pointerEvent.clientX <= editorRect.right && pointerEvent.clientY >= editorRect.top && pointerEvent.clientY <= editorRect.bottom,
   draggedItemIsAlreadyTheActiveTab = activeTabIndexOfDraggedItem !== -1,
   draggedItemFileData = draggedItemIsAlreadyTheActiveTab ? tabGroup.openTabs[activeTabIndexOfDraggedItem] : { part: allParts[PART_INDEX], filename: isNaN(FILE_INDEX) ? undefined : allParts[PART_INDEX].filenames[FILE_INDEX] },
   existingTabIndexOfFileData = draggedItemIsAlreadyTheActiveTab ? activeTabIndexOfDraggedItem : tabGroup.openTabs.findIndex(tab => tab.part === draggedItemFileData.part && tab.filename === draggedItemFileData.filename),
   tabAlreadyExistsForFileData = existingTabIndexOfFileData !== -1,
   numberOfTabsOpen = tabGroup.openTabs.length,
   conditionallyActivateExistingTab = () => {
    if (existingTabIndexOfFileData !== tabGroup.activeTabIndex)
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

    const nearestIndexToTheRight = numberOfTabsOpen === 0 ? 0 : tabGroup.activeTabIndex + 1
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
 },
 reset() {
  dropTargetElement?.removeAttribute("data-drop-target")
  tabContainer.parentElement.removeAttribute("data-drop-target")
  dragPreviewElement?.remove()
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})