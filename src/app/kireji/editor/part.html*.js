return "<editor->" + (
 "<editor-view>" + editor.scroller.wrap(
  editor[`${tabGroup.openTabs.length ? (tabGroup.selectedTab.filename ? "file" : "summary") : "empty"}-view.html`]
 ) + "</editor-view>" +
 tabGroup["part.html"]
) + "</editor->"