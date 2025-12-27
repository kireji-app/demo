tabGroup.viewedTab = tabGroup.selectedTab
tabGroup.viewedPermutation = tabGroup.permutationRouteID
tabGroup.viewedOpenTabs = [...tabGroup.openTabs]

_.parts.core.client.promise.then(() => {
 document.querySelector(`tab-[data-selected]`)?.scrollIntoView({
  behavior: 'smooth',
  inline: 'nearest',
 })
})