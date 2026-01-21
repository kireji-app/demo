return {
 activeTabIndex: tabGroup.activeTabIndex,
 previewTabIndex: tabGroup.previewTabIndex,
 openTabs: tabGroup.openTabs.map(({ part, filename, payload }) => ({ host: part.host, filename, payload: Number(payload) }))
}