return (
 "<editor->" + editor.scroller.wrap(
  editor[`${tabGroup.openTabs.length ? (tabGroup.selectedTab.filename ? "file" : "summary") : "empty"}-view.html`]
 ) + "</editor->" +
 tabGroup["part.html"]
)