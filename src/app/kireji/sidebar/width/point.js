/** @type {IKirejiAppSidebarWidthPointerConfig} */
const pointerConfig = {
 toolBarWidth: Q("tool-bar").clientWidth,
 sidebarWidthRouteIDCache: sidebarWidth.routeID,
 down() {
  document.body.classList.add("dragging-width-handle")
 },
 drag(pointerEvent) {
  if (pointerEvent.clientX < (sidebarWidth.min / 2 + this.toolBarWidth)) {
   if (sidebar.open.routeID === 1n) {
    sidebar.open.setRouteID(0n)
    if (sidebarWidth.routeID !== this.sidebarWidthRouteIDCache)
     sidebarWidth.setRouteID(this.sidebarWidthRouteIDCache)
   }
  } else {
   const targetWidth = Math.min(Number(sidebarWidth.cardinality) - 1, Math.max(0, Math.trunc(pointerEvent.clientX) - sidebarWidth.min - this.toolBarWidth))
   if (sidebar.open.routeID === 0n)
    sidebar.open.setRouteID(1n)
   const targetRouteID = BigInt(targetWidth)
   if (sidebarWidth.routeID !== targetRouteID)
    sidebarWidth.setRouteID(targetRouteID)
  }
 },
 reset() {
  document.body.classList.remove("dragging-width-handle")
 },
 POINTER_EVENT,
 TARGET_ELEMENT
}

pointer.handle(pointerConfig)