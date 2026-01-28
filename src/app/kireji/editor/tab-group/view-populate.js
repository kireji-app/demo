if (hydrated) {

 const hasNoTabs = !tabGroup.openTabs.length
 const activeTab = tabGroup.activeTab
 const previewTab = tabGroup.previewTab

 // TODO: Create a "pseudo-part" that has all the same view methods, etc. of a normal part but is dynamically instantiated for dynamic typing.

 if (tabGroup.openTabs.length !== tabGroup.viewedOpenTabs.length || tabGroup.viewedPermutation !== tabGroup.permutationRouteID || tabGroup.viewedPayload !== tabGroup.payloadRouteID) {
  // TODO: This is a dead-simple approach ... more performant approaches exist.
  const tabContainer = Q("#tab-group")
  const existingTabCount = tabGroup.viewedOpenTabs.length
  const targetTabCount = tabGroup.openTabs.length
  const maxLength = Math.max(existingTabCount, targetTabCount)

  for (let i = 0; i < maxLength; i++) {
   if (targetTabCount <= i) {
    tabContainer.children[i].remove()
    continue
   }

   const newOpenTab = tabGroup.openTabs[i]
   const existingOpenTab = tabGroup.viewedOpenTabs[i]

   if (existingOpenTab === newOpenTab)
    continue

   const newTabElement = (() => {
    const offscreen = document.createElement("div")
    offscreen.innerHTML = tabGroup.renderTabHTML(newOpenTab.part, newOpenTab.filename, newOpenTab.payload, i)
    return offscreen.querySelector("tab-")
   })()

   if (existingOpenTab) {
    tabContainer.children[i].replaceWith(newTabElement)
    continue
   }

   tabContainer.appendChild(newTabElement)
  }
  tabGroup.viewedPermutation = tabGroup.permutationRouteID
  tabGroup.viewedPayload = tabGroup.payloadRouteID
  tabGroup.viewedOpenTabs = [...tabGroup.openTabs]
 }

 if (tabGroup.viewedActiveTab && tabGroup.viewedActiveTab !== activeTab)
  Q(`tab-[data-active]`)?.removeAttribute("data-active")

 if (tabGroup.viewedPreviewTab && tabGroup.viewedPreviewTab !== previewTab)
  Q(`tab-[data-preview]`)?.removeAttribute("data-preview")

 const currentTabLayout = tabGroup.viewedActiveTab ? (tabGroup.viewedActiveTab.filename ? "file" : "summary") : "empty"

 tabGroup.viewedActiveTab = activeTab
 tabGroup.viewedPreviewTab = previewTab

 if (!hasNoTabs) {
  const activeTabElement = Q(`tab-:nth-child(${tabGroup.activeTabIndex + 1})`)

  if (!activeTabElement.hasAttribute("data-active")) {
   activeTabElement.setAttribute("data-active", "")
   activeTabElement.scrollIntoView({
    behavior: "smooth",
    inline: 'nearest',
   })
  }

  tabGroup.attachListeners()

  const previewTabElement = tabGroup.previewTabIndex === null ? null : Q(`tab-:nth-child(${tabGroup.previewTabIndex + 1})`)

  if (previewTabElement && !previewTabElement.hasAttribute("data-preview"))
   previewTabElement.setAttribute("data-preview", "")
 }

 if (currentTabLayout === "summary") {
  if (hasNoTabs) {
   Q(`editor-view scroll-content`).innerHTML = editor["empty-view.html"]
  } else if (!tabGroup.viewedActiveTab.filename) {
   for (const section of sections) {
    const element = Q(`#info-${section.key}>section`)
    element.innerHTML = section["part.html"]
    if (section.key.startsWith("state")) {
     if (activePart.isAbstract || section.key === "state" && activePart.disabled)
      element.setAttribute("disabled", "")
     else
      element.removeAttribute("disabled")
    }
   }
  } else {
   Q(`editor-view scroll-content`).innerHTML = editor["file-view.html"]
  }
  Q(`crumbs-`).innerHTML = editor["crumbs.html"]
 } else if (currentTabLayout === "file") {
  if (hasNoTabs) {
   Q(`editor-view scroll-content`).innerHTML = editor["empty-view.html"]
  } else if (tabGroup.viewedActiveTab.filename) {
   Q('editor-view scroll-content').innerHTML = editor["file-view.html"]
  } else {
   Q(`editor-view scroll-content`).innerHTML = editor["summary-view.html"]
  }
  Q(`crumbs-`).innerHTML = editor["crumbs.html"]
 } else {
  if (hasNoTabs)
   throw `Unexpected update to empty tab group without adding any new tabs.`
  if (tabGroup.viewedActiveTab.filename) {
   Q(`editor-view scroll-content`).innerHTML = editor["file-view.html"]
  } else {
   Q(`editor-view scroll-content`).innerHTML = editor["summary-view.html"]
  }
  Q(`crumbs-`).innerHTML = editor["crumbs.html"]
 }
 Q("#sidebar-view summary[data-active]")?.removeAttribute("data-active")
 if (!hasNoTabs)
  Q(`#sidebar-view summary[data-index="${allParts.indexOf(tabGroup.viewedActiveTab.part)}"]`)?.setAttribute("data-active", "")
} else _.parts.core.client.promise.then(() => tabGroup.attachListeners())