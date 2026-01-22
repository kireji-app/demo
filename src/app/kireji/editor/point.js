const
 changeActiveTab = (newActiveTabIndex, newPreviewTabIndex = tabGroup.previewTabIndex, changesPermutation) => {
  history.pushState(null, null, location.href)
  if (changesPermutation) {
   tabGroup.permutationRouteID = tabGroup.getPermutationRouteID(tabGroup.openTabs)
   tabGroup.payloadRouteID = tabGroup.getPayloadRouteID(tabGroup.openTabs)
  }
  const changesActiveTab = tabGroup.activeTabIndex !== newActiveTabIndex
  tabGroup.activeTabIndex = newActiveTabIndex
  tabGroup.previewTabIndex = newPreviewTabIndex
  changedEditorSubparts.add(tabGroup)
  changedAppSubparts.add(editor)

  const activePart = tabGroup.openTabs[newActiveTabIndex].part
  const sidebarIsOpen = sidebar.open.model

  const summarizedRouteID = tabGroup.summarizeRouteID()
  if (tabGroup.routeID !== summarizedRouteID) {
   tabGroup.detachListeners()

   if (changesActiveTab) {
    if (sidebarIsOpen) {
     let parentFolder = sidebar.view.getParent(activePart)
     let finalRouteID = sidebar.view.folders.routeID

     while (parentFolder) {
      const folderIndex = sidebar.view.folders.superset.indexOf(parentFolder)
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
    if (scroller.routeID !== 0n) {
     scroller.updateRouteID(0n)
     changedEditorSubparts.add(scroller)
    }
   }

   tabGroup.updateRouteID(summarizedRouteID)
   editor.collectRouteID([...changedEditorSubparts], 1)
   kirejiApp.collectRouteID([...changedAppSubparts])
   kirejiApp[".."].collectPopulateView()
   kirejiApp.distributePopulateView()
   kirejiApp.distributeClean()
   kirejiApp.collectClean()

   if (changesActiveTab && sidebarIsOpen) {
    const { top: sidebarTop, bottom: sidebarBottom } = sidebar.view.scroller.container.getBoundingClientRect()
    const item = sidebar.view.scroller.container.querySelector(`[data-index="${allParts.indexOf(activePart)}"]`)
    const { top, bottom } = item.getBoundingClientRect()

    if ((bottom > sidebarBottom) || (top < sidebarTop))
     item.scrollIntoView({
      behavior: 'instant',
      block: 'center',
     })
   }
  }
 },
 changedEditorSubparts = new Set(),
 changedAppSubparts = new Set(),
 tabContainer = Q("#tab-group"),
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
    offscreen.innerHTML = tabGroup.renderTabHTML(allParts[PART_INDEX], isNaN(FILE_INDEX) ? undefined : allParts[PART_INDEX].filenames[FILE_INDEX], 0n, -1)
    return offscreen.querySelector("tab-")
   })() : TARGET_ELEMENT.parentElement.cloneNode(true)
   dragPreviewElement.setAttribute("data-drag-preview", "")
   dragPreviewElement.setAttribute("data-active", "")
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
   draggedItemFileData = draggedItemIsAlreadyTheActiveTab ? tabGroup.openTabs[activeTabIndexOfDraggedItem] : { part: allParts[PART_INDEX], filename: isNaN(FILE_INDEX) ? undefined : allParts[PART_INDEX].filenames[FILE_INDEX], payload: TAB_PAYLOAD },
   existingTabIndexOfFileData = draggedItemIsAlreadyTheActiveTab ? activeTabIndexOfDraggedItem : tabGroup.openTabs.findIndex(tab => tab.part === draggedItemFileData.part && tab.filename === draggedItemFileData.filename),
   tabAlreadyExistsForFileData = existingTabIndexOfFileData !== -1,
   numberOfTabsOpen = tabGroup.openTabs.length,
   handleItemClick = droppedOntoEditor => {
    if (draggedItemIsAlreadyTheActiveTab)
     return

    if (tabAlreadyExistsForFileData) {
     if (droppedOntoEditor && existingTabIndexOfFileData === tabGroup.previewTabIndex)
      tabGroup.previewTabIndex = null
     // if (existingTabIndexOfFileData !== tabGroup.activeTabIndex)
     changeActiveTab(existingTabIndexOfFileData)
     return
    }

    let indexOfNewlyCreatedTab = numberOfTabsOpen === 0 ? 0 : tabGroup.activeTabIndex + 1
    let newPreviewTabIndex = null

    if (tabGroup.previewTabIndex === null) {
     if (!droppedOntoEditor)
      newPreviewTabIndex = indexOfNewlyCreatedTab
    } else {
     if (droppedOntoEditor) {
      newPreviewTabIndex = tabGroup.previewTabIndex + (indexOfNewlyCreatedTab <= tabGroup.previewTabIndex)
     } else {
      tabGroup.openTabs.splice(tabGroup.previewTabIndex, 1)
      if (tabGroup.previewTabIndex < indexOfNewlyCreatedTab)
       indexOfNewlyCreatedTab--
      newPreviewTabIndex = indexOfNewlyCreatedTab
     }
    }

    tabGroup.openTabs.splice(indexOfNewlyCreatedTab, 0, draggedItemFileData)
    changeActiveTab(indexOfNewlyCreatedTab, newPreviewTabIndex, true)
   },
   handleTabGroupDragAndDrop = () => {
    const indexWhereItemWasDropped = Array.prototype.indexOf.call(tabContainer.children, dropTargetElement) + (dropTargetElement.getAttribute("data-drop-target") === "before" ? 0 : 1)

    if (draggedItemIsAlreadyTheActiveTab || tabAlreadyExistsForFileData) {

     const itemWasDroppedToTheRightOfItself = indexWhereItemWasDropped > existingTabIndexOfFileData
     const adjustedIndexWhereItemWasDropped = indexWhereItemWasDropped - +itemWasDroppedToTheRightOfItself

     if (adjustedIndexWhereItemWasDropped === existingTabIndexOfFileData) {
      if (existingTabIndexOfFileData === tabGroup.previewTabIndex)
       tabGroup.previewTabIndex = null
      // if (existingTabIndexOfFileData !== tabGroup.activeTabIndex)
      changeActiveTab(existingTabIndexOfFileData)
      return
     }

     const previewTab = tabGroup.previewTab

     // Remove the original tab.
     tabGroup.openTabs.splice(existingTabIndexOfFileData, 1)

     // Add the new tab.
     tabGroup.openTabs.splice(adjustedIndexWhereItemWasDropped, 0, draggedItemFileData)

     // Compute the new preview tab index.
     const adjustedPreviewTabIndex = (tabGroup.previewTabIndex === existingTabIndexOfFileData || tabGroup.previewTabIndex === null) ? null : tabGroup.openTabs.indexOf(previewTab)

     changeActiveTab(adjustedIndexWhereItemWasDropped, adjustedPreviewTabIndex, true)
    } else {

     const previewTab = tabGroup.previewTab

     // Add the new tab.
     tabGroup.openTabs.splice(indexWhereItemWasDropped, 0, draggedItemFileData)

     // Compute the new preview tab index.
     const adjustedPreviewTabIndex = tabGroup.previewTabIndex === null ? null : tabGroup.openTabs.indexOf(previewTab)

     changeActiveTab(indexWhereItemWasDropped, adjustedPreviewTabIndex, true)
    }
   }

  if (draggedItemWasDroppedOntoItself) handleItemClick()
  else if (draggedItemWasDroppedOntoTabGroup) handleTabGroupDragAndDrop()
  else if (draggedItemWasDroppedOntoEditor) handleItemClick(true)
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