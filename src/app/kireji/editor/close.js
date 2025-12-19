const tabContainer = document.getElementById("tab-group")
const tabIndex = Array.prototype.indexOf.call(tabContainer.children, TAB_ELEMENT)

if (tabIndex < 0)
 throw `can't close tab: the given element was not a tab in #tabGroup.`

const targetTab = tabGroup.openTabs[tabIndex]
const isClosingActiveTab = tabGroup.activeTab === tabIndex
const finalTabIndex = isClosingActiveTab ? (tabGroup.activeTab < 1 ? 0 : tabGroup.activeTab - 1) : (tabGroup.activeTab > tabIndex ? tabGroup.activeTab - 1 : tabGroup.activeTab)
TAB_ELEMENT.remove()

tabGroup.activeTab = null
tabGroup.openTabs.splice(tabIndex, 1)
tabGroup.permutationRouteID = tabGroup.getPermutationRouteID(tabGroup.model.openTabs)

editor.activate(EVENT, document.querySelector(`tab-:nth-child(${finalTabIndex + 1})`))