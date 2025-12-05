tabGroup.viewedTab = tabGroup.selectedTab

_.parts.core.client.promise.then(() => {
 document.querySelector(`tab-[data-selected]`)?.scrollIntoView({
  behavior: 'smooth',
  inline: 'center',
 })
})