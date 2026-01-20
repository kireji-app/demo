return {
 activeTabIndex: tabGroup.activeTabIndex,
 openTabs: tabGroup.openTabs.map(({ part, filename }) => ({ host: part.host, filename }))
}