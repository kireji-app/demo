return {
 activeTab: tabGroup.activeTab,
 openTabs: tabGroup.openTabs.map(({ part, filename }) => ({ host: part.host, filename }))
}