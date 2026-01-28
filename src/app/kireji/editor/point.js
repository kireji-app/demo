/** @type {IKirejiAppEditorPointerConfig} */
const pointerConfig = {
 activeTabIndexOfDraggedItem: Array.prototype.indexOf.call(tabGroup.container.children, TARGET_ELEMENT.parentElement),
 dropTargetElement: null,
 dragPreviewElement: null,
 down() {
  if (![-1, tabGroup.activeTabIndex].includes(this.activeTabIndexOfDraggedItem)) {
   tabGroup.activeTabIndex = this.activeTabIndexOfDraggedItem
   tabGroup.recomputeRouteID()
  }
 },
 drag(pointerEvent) {
  const
   { left: tabsLeft, right: tabsRight, top: tabsTop, bottom: tabsBottom } = tabGroup.container.getBoundingClientRect(),
   isOverTabGroup = pointerEvent.clientX >= tabsLeft && pointerEvent.clientX <= tabsRight && pointerEvent.clientY >= tabsTop && pointerEvent.clientY <= tabsBottom
  if (isOverTabGroup) {
   if (tabGroup.container.parentElement.hasAttribute("data-drop-target"))
    tabGroup.container.parentElement.removeAttribute("data-drop-target")
   const currentElement = document.elementFromPoint(pointerEvent.clientX, pointerEvent.clientY)
   if (currentElement) {
    const currentTab = currentElement.closest("tab-")
    if (this.dropTargetElement !== currentTab) {
     this.dropTargetElement?.removeAttribute("data-drop-target")
     this.dropTargetElement = currentTab
    }
    if (this.dropTargetElement) {
     const { left: tabLeft, right: tabRight } = currentTab.getBoundingClientRect()
     const center = (tabLeft + tabRight) / 2
     this.dropTargetElement.setAttribute("data-drop-target", center >= pointerEvent.clientX ? "before" : "after")
    } else {
     const { right: lastTabRight } = tabGroup.container.lastElementChild.getBoundingClientRect()
     if (lastTabRight <= pointerEvent.clientX) {
      this.dropTargetElement = tabGroup.container.lastElementChild
      this.dropTargetElement.setAttribute("data-drop-target", "after")
     } else {
      this.dropTargetElement = tabGroup.container.firstElementChild
      this.dropTargetElement.setAttribute("data-drop-target", "before")
     }
    }
   }
  } else {
   const
    editorRect = tabGroup.container.parentElement.getBoundingClientRect(),
    draggedItemIsOverEditor = pointerEvent.clientX >= editorRect.left && pointerEvent.clientX <= editorRect.right && pointerEvent.clientY >= editorRect.top && pointerEvent.clientY <= editorRect.bottom
   if (draggedItemIsOverEditor && !tabGroup.container.parentElement.hasAttribute("data-drop-target"))
    tabGroup.container.parentElement.setAttribute("data-drop-target", "")
   else if (!draggedItemIsOverEditor && tabGroup.container.parentElement.hasAttribute("data-drop-target"))
    tabGroup.container.parentElement.removeAttribute("data-drop-target")
   if (this.dropTargetElement) {
    this.dropTargetElement.removeAttribute("data-drop-target")
    this.dropTargetElement = null
   }
  }
  if (!this.dragPreviewElement) {
   this.dragPreviewElement = this.activeTabIndexOfDraggedItem === -1 ? (() => {
    const offscreen = document.createElement("div")
    offscreen.innerHTML = tabGroup.renderTabHTML(allParts[PART_INDEX], isNaN(FILE_INDEX) ? undefined : allParts[PART_INDEX].filenames[FILE_INDEX], 0n, -1)
    return offscreen.querySelector("tab-")
   })() : TARGET_ELEMENT.parentElement.cloneNode(true)
   this.dragPreviewElement.setAttribute("data-drag-preview", "")
   this.dragPreviewElement.setAttribute("data-active", "")
   this.dragPreviewElement.removeAttribute("data-drop-target")
   document.body.appendChild(this.dragPreviewElement)
  }
  this.dragPreviewElement.style = `left:${pointerEvent.clientX}px;top:${pointerEvent.clientY - this.dragPreviewElement.clientHeight}px`
 },
 drop(pointerEvent) {
  // TODO: break into separate "click" and "drop" handlers.
  const
   draggedItemRect = TARGET_ELEMENT.getBoundingClientRect(),
   draggedItemWasDroppedOntoItself = pointerEvent.clientX >= draggedItemRect.left && pointerEvent.clientX <= draggedItemRect.right && pointerEvent.clientY >= draggedItemRect.top && pointerEvent.clientY <= draggedItemRect.bottom,
   tabGroupRect = tabGroup.container.getBoundingClientRect(),
   draggedItemWasDroppedOntoTabGroup = pointerEvent.clientX >= tabGroupRect.left && pointerEvent.clientX <= tabGroupRect.right && pointerEvent.clientY >= tabGroupRect.top && pointerEvent.clientY <= tabGroupRect.bottom,
   editorRect = tabGroup.container.parentElement.getBoundingClientRect(),
   draggedItemWasDroppedOntoEditor = pointerEvent.clientX >= editorRect.left && pointerEvent.clientX <= editorRect.right && pointerEvent.clientY >= editorRect.top && pointerEvent.clientY <= editorRect.bottom,
   draggedItemIsAlreadyTheActiveTab = this.activeTabIndexOfDraggedItem !== -1,
   draggedItemFileData = draggedItemIsAlreadyTheActiveTab ? tabGroup.openTabs[this.activeTabIndexOfDraggedItem] : { part: allParts[PART_INDEX], filename: isNaN(FILE_INDEX) ? undefined : allParts[PART_INDEX].filenames[FILE_INDEX], payload: TAB_PAYLOAD },
   existingTabIndexOfFileData = draggedItemIsAlreadyTheActiveTab ? this.activeTabIndexOfDraggedItem : tabGroup.openTabs.findIndex(tab => tab.part === draggedItemFileData.part && tab.filename === draggedItemFileData.filename),
   tabAlreadyExistsForFileData = existingTabIndexOfFileData !== -1,
   numberOfTabsOpen = tabGroup.openTabs.length,
   handleItemClick = droppedOntoEditor => {
    if (draggedItemIsAlreadyTheActiveTab)
     return

    if (tabAlreadyExistsForFileData) {
     let recomputeTabGroupRouteID = false

     if (droppedOntoEditor && existingTabIndexOfFileData === tabGroup.previewTabIndex) {
      recomputeTabGroupRouteID = true
      tabGroup.previewTabIndex = null
     }

     if (existingTabIndexOfFileData !== tabGroup.activeTabIndex) {
      recomputeTabGroupRouteID = true
      tabGroup.activeTabIndex = existingTabIndexOfFileData
     }

     if (recomputeTabGroupRouteID)
      tabGroup.recomputeRouteID()

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
    tabGroup.activeTabIndex = indexOfNewlyCreatedTab
    tabGroup.previewTabIndex = newPreviewTabIndex
    tabGroup.recomputeRouteID(true)
   },
   handleTabGroupDragAndDrop = () => {
    const indexWhereItemWasDropped = Array.prototype.indexOf.call(tabGroup.container.children, this.dropTargetElement) + (this.dropTargetElement.getAttribute("data-drop-target") === "before" ? 0 : 1)

    if (draggedItemIsAlreadyTheActiveTab || tabAlreadyExistsForFileData) {

     const itemWasDroppedToTheRightOfItself = indexWhereItemWasDropped > existingTabIndexOfFileData
     const adjustedIndexWhereItemWasDropped = indexWhereItemWasDropped - +itemWasDroppedToTheRightOfItself

     if (adjustedIndexWhereItemWasDropped === existingTabIndexOfFileData) {
      let recomputeTabGroupRouteID = false

      if (existingTabIndexOfFileData === tabGroup.previewTabIndex) {
       recomputeTabGroupRouteID = true
       tabGroup.previewTabIndex = null
      }

      if (existingTabIndexOfFileData !== tabGroup.activeTabIndex) {
       recomputeTabGroupRouteID = true
       tabGroup.activeTabIndex = existingTabIndexOfFileData
      }

      if (recomputeTabGroupRouteID)
       tabGroup.recomputeRouteID()

      return
     }

     const previewTab = tabGroup.previewTab

     // Remove the original tab.
     tabGroup.openTabs.splice(existingTabIndexOfFileData, 1)

     // Add the new tab.
     tabGroup.openTabs.splice(adjustedIndexWhereItemWasDropped, 0, draggedItemFileData)

     // Compute the new preview tab index.
     const adjustedPreviewTabIndex = (tabGroup.previewTabIndex === existingTabIndexOfFileData || tabGroup.previewTabIndex === null) ? null : tabGroup.openTabs.indexOf(previewTab)
     tabGroup.activeTabIndex = adjustedIndexWhereItemWasDropped
     tabGroup.previewTabIndex = adjustedPreviewTabIndex
     tabGroup.recomputeRouteID(true)
    } else {

     const previewTab = tabGroup.previewTab

     // Add the new tab.
     tabGroup.openTabs.splice(indexWhereItemWasDropped, 0, draggedItemFileData)

     // Compute the new preview tab index.
     const adjustedPreviewTabIndex = tabGroup.previewTabIndex === null ? null : tabGroup.openTabs.indexOf(previewTab)
     tabGroup.activeTabIndex = indexWhereItemWasDropped
     tabGroup.previewTabIndex = adjustedPreviewTabIndex
     tabGroup.recomputeRouteID(true)
    }
   }

  if (draggedItemWasDroppedOntoItself) handleItemClick()
  else if (draggedItemWasDroppedOntoTabGroup) handleTabGroupDragAndDrop()
  else if (draggedItemWasDroppedOntoEditor) handleItemClick(true)
  else { /* Do nothing. */ }
 },
 reset() {
  this.dropTargetElement?.removeAttribute("data-drop-target")
  tabGroup.container.parentElement.removeAttribute("data-drop-target")
  this.dragPreviewElement?.remove()
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
}

pointer.handle(pointerConfig)