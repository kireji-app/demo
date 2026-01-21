if (hydrated) {
 /** @type {IScroller<IPartOutliner<IKirejiAppSidebar>>} */
 const scroller = sidebar.view.scroller

 if (part.routeID === 0n) {
  scroller.removeView()
  sidebar.element.remove()
 } else {
  Q("tool-bar").after(sidebar.element)
  scroller.addView()
 }
}