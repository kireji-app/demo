function addListeners() {
 tabGroup.viewedTab.part.attach("populate", tabGroup, "listener")
 tabGroup.viewedTab.part.attach("remove", tabGroup, "listener")
}

if (hydrated) {

 const hasNoTabs = !tabGroup.openTabs.length
 const selectedTab = tabGroup.selectedTab

 if (tabGroup.viewedTab && tabGroup.viewedTab !== selectedTab)
  document.querySelector(`tab-[data-selected]`)?.removeAttribute("data-selected")

 const currentTabLayout = tabGroup.viewedTab ? (tabGroup.viewedTab.filename ? "file" : "summary") : "empty"

 tabGroup.viewedTab = selectedTab
 if (!hasNoTabs) {
  document.querySelector(`tab-:nth-child(${tabGroup.activeTab + 1})`).setAttribute("data-selected", "")

  if (!selectedTab.filename && !tabGroup.viewedTab.part.isAbstract)
   addListeners()
 }

 if (currentTabLayout === "summary") {
  if (hasNoTabs) {
   document.querySelector(`property-viewer scroll-content`).innerHTML = propertyViewer["empty-view.html"]
  } else if (!tabGroup.viewedTab.filename) {
   for (const word of ["about", "hash", "properties"])
    document.getElementById(`info-${word}`).innerHTML = propertyViewer[`info-${word}.html`]
  } else {
   document.querySelector(`property-viewer scroll-content`).innerHTML = propertyViewer["file-view.html"]
  }
 } else if (currentTabLayout === "file") {
  if (hasNoTabs) {
   document.querySelector(`property-viewer scroll-content`).innerHTML = propertyViewer["empty-view.html"]
  } else if (tabGroup.viewedTab.filename) {
   document.querySelector('property-viewer scroll-content').innerHTML = propertyViewer["file-view.html"]
  } else {
   document.querySelector(`property-viewer scroll-content`).innerHTML = propertyViewer["summary-view.html"]
  }
 } else {
  if (hasNoTabs)
   throw `Unexpected update to empty tab group without adding any new tabs.`
  if (tabGroup.viewedTab.filename) {
   document.querySelector(`property-viewer scroll-content`).innerHTML = propertyViewer["file-view.html"]
  } else {
   document.querySelector(`property-viewer scroll-content`).innerHTML = propertyViewer["summary-view.html"]
  }
 }
 document.querySelector("part-outliner summary[data-selected]")?.removeAttribute("data-selected")
 if (!hasNoTabs)
  document.querySelector(`part-outliner summary[data-index="${allParts.indexOf(tabGroup.viewedTab.part)}"]`)?.setAttribute("data-selected", "")
} else _.parts.core.client.promise.then(() => {
 if (tabGroup.selectedTab && !tabGroup.selectedTab.filename && !tabGroup.selectedTab.part.isAbstract)
  addListeners()
})