if (hydrated) {
 /** @type {IScroller<IPartOutliner<IKirejiAppSidebar>>} */
 const scroller = sidebar[sidebar.view.arm.key].scroller

 if (part.routeID === 0n) {
  scroller.pause()
  sidebar.headerElement.remove()
  sidebar.viewElement.remove()
  document.body.classList.remove("sidebar-open")
 } else {
  document.body.classList.add("sidebar-open")
  document.querySelector("toolbar-").after(sidebar.headerElement, sidebar.viewElement)
  scroller.resume()
 }
}