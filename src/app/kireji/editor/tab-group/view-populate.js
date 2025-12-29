function addListeners() {
 tabGroup.viewedTab.part.attach("populate", tabGroup, "listener")
 tabGroup.viewedTab.part.attach("remove", tabGroup, "listener")
}

if (hydrated) {

 const hasNoTabs = !tabGroup.openTabs.length
 const selectedTab = tabGroup.selectedTab

 // TODO: Create a "pseudo-part" that has all the same view methods, etc. of a normal part but is dynamically instantiated for dynamic typing.

 if (tabGroup.openTabs.length !== tabGroup.viewedOpenTabs.length || tabGroup.viewedPermutation !== tabGroup.permutationRouteID) {
  // This is a dead-simple approach ... more performant approaches exist.
  const tabContainer = document.getElementById("tab-group")
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
    offscreen.innerHTML = tabGroup.renderTabHTML(newOpenTab.part, newOpenTab.filename, i)
    return offscreen.querySelector("tab-")
   })()

   if (existingOpenTab) {
    tabContainer.children[i].replaceWith(newTabElement)
    continue
   }

   tabContainer.appendChild(newTabElement)
  }
  tabGroup.viewedPermutation = tabGroup.permutationRouteID
  tabGroup.viewedOpenTabs = [...tabGroup.openTabs]
 }

 if (tabGroup.viewedTab && tabGroup.viewedTab !== selectedTab)
  document.querySelector(`tab-[data-selected]`)?.removeAttribute("data-selected")

 const currentTabLayout = tabGroup.viewedTab ? (tabGroup.viewedTab.filename ? "file" : "summary") : "empty"

 tabGroup.viewedTab = selectedTab
 if (!hasNoTabs) {
  const activeTabElement = document.querySelector(`tab-:nth-child(${tabGroup.activeTab + 1})`)

  if (!activeTabElement.hasAttribute("data-selected")) {
   activeTabElement.setAttribute("data-selected", "")
   activeTabElement.scrollIntoView({
    behavior: "smooth",
    inline: 'nearest',
   })
  }

  if (!selectedTab.filename && !tabGroup.viewedTab.part.isAbstract)
   addListeners()
 }

 if (currentTabLayout === "summary") {
  if (hasNoTabs) {
   document.querySelector(`editor-view scroll-content`).innerHTML = editor["empty-view.html"]
  } else if (!tabGroup.viewedTab.filename) {
   for (const word of ["about", "state-space", "state", "properties"]) {
    const element = document.getElementById(`info-${word}`)
    element.innerHTML = editor[`info-${word}.html`]
    if (word.startsWith("state")) {
     if (selectedPart.isAbstract)
      element.setAttribute("disabled", "")
     else
      element.removeAttribute("disabled")
    }
   }
  } else {
   document.querySelector(`editor-view scroll-content`).innerHTML = editor["file-view.html"]
  }
  document.querySelector(`crumbs-`).innerHTML = editor["crumbs.html"]
 } else if (currentTabLayout === "file") {
  if (hasNoTabs) {
   document.querySelector(`editor-view scroll-content`).innerHTML = editor["empty-view.html"]
  } else if (tabGroup.viewedTab.filename) {
   document.querySelector('editor-view scroll-content').innerHTML = editor["file-view.html"]
  } else {
   document.querySelector(`editor-view scroll-content`).innerHTML = editor["summary-view.html"]
  }
  document.querySelector(`crumbs-`).innerHTML = editor["crumbs.html"]
 } else {
  if (hasNoTabs)
   throw `Unexpected update to empty tab group without adding any new tabs.`
  if (tabGroup.viewedTab.filename) {
   document.querySelector(`editor-view scroll-content`).innerHTML = editor["file-view.html"]
  } else {
   document.querySelector(`editor-view scroll-content`).innerHTML = editor["summary-view.html"]
  }
  document.querySelector(`crumbs-`).innerHTML = editor["crumbs.html"]
 }
 document.querySelector("#sidebar-view summary[data-selected]")?.removeAttribute("data-selected")
 if (!hasNoTabs)
  document.querySelector(`#sidebar-view summary[data-index="${allParts.indexOf(tabGroup.viewedTab.part)}"]`)?.setAttribute("data-selected", "")
} else _.parts.core.client.promise.then(() => {
 if (tabGroup.selectedTab && !tabGroup.selectedTab.filename && !tabGroup.selectedTab.part.isAbstract)
  addListeners()
})