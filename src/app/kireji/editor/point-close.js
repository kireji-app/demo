pointer.handle({
 click() {
  const tabIndex = Array.prototype.indexOf.call(Q("#tab-group").children, TARGET_ELEMENT.parentElement)
  tabGroup.openTabs.splice(tabIndex, 1)[0]
  tabGroup.activeTabIndex = tabGroup.openTabs.length === 0 ? null : (tabGroup.activeTabIndex === tabIndex ? (tabGroup.activeTabIndex < 1 ? 0 : tabGroup.activeTabIndex - 1) : (tabGroup.activeTabIndex > tabIndex ? tabGroup.activeTabIndex - 1 : tabGroup.activeTabIndex))
  tabGroup.previewTabIndex = tabGroup.openTabs.length === 0 || tabGroup.previewTabIndex === tabIndex ? null : (tabGroup.previewTabIndex > tabIndex ? tabGroup.previewTabIndex - 1 : tabGroup.previewTabIndex)
  tabGroup.recomputeRouteID(true)
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})