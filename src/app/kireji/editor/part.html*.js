return "<editor->" + (
 `<crumbs->${editor["crumbs.html"]}</crumbs-><editor-view>` + editor.scroller.wrap(
  editor[`${tabGroup.openTabs.length ? (tabGroup.activeTab.filename ? "file" : "summary") : "empty"}-view.html`]
 ) + "</editor-view>" +
 tabGroup["part.html"]
) + "</editor->"