tabGroup.viewedActiveTab = tabGroup.activeTab
tabGroup.viewedPreviewTab = tabGroup.previewTab
tabGroup.viewedPermutation = tabGroup.permutationRouteID
tabGroup.viewedPayload = tabGroup.payloadRouteID
tabGroup.viewedOpenTabs = [...tabGroup.openTabs]

_.parts.core.client.promise.then(() => {
 Q(`tab-[data-active]`)?.scrollIntoView({
  behavior: 'smooth',
  inline: 'nearest',
 })
})