return "<property-viewer>" + propertyViewer.scroller.wrap(
 propertyViewer[`${tabGroup.openTabs.length ? (tabGroup.selectedTab.filename ? "file" : "summary") : "empty"}-view.html`]
) + "</property-viewer>"