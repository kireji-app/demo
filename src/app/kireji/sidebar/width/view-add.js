sidebarWidth.element = document.querySelector("width-handle")

const
 toolBarElement = document.querySelector("tool-bar"),
 start = e => {
  e.preventDefault()
  if (pointerID !== null) return
  document.body.classList.add("dragging-width-handle")
  document.addEventListener("pointermove", drag)
  document.addEventListener("pointerup", end)
  document.addEventListener("pointercancel", end)
  sidebarWidth.element.setPointerCapture(pointerID = e.pointerId)
  sidebarWidthRouteIDCache = sidebarWidth.routeID
 },
 drag = e => {
  if (e.pointerId !== pointerID) return
  e.preventDefault()
  if (e.clientX < (sidebarWidth.min / 2 + toolBarElement.clientWidth)) {
   if (sidebar.open.routeID === 1n) {
    sidebar.open.setRouteID(0n)
    sidebarWidth.setRouteID(sidebarWidthRouteIDCache)
   }
  } else {
   const targetWidth = Math.min(Number(sidebarWidth.cardinality) - 1, Math.max(0, Math.trunc(e.clientX) - sidebarWidth.min - toolBarElement.clientWidth))
   const targetRouteID = BigInt(targetWidth)
   if (sidebar.open.routeID === 0n) {
    sidebar.open.setRouteID(1n)
    sidebarWidth.setRouteID(targetRouteID)
   } else if (sidebarWidth.routeID !== targetRouteID)
    sidebarWidth.setRouteID(targetRouteID)
  }
 },
 end = e => {
  if (e.pointerId !== pointerID) return
  document.body.classList.remove("dragging-width-handle")
  document.removeEventListener("pointermove", drag)
  document.removeEventListener("pointerup", end)
  document.removeEventListener("pointercancel", end)
  sidebarWidth.element.releasePointerCapture(pointerID)
  pointerID = null
  sidebarWidthRouteIDCache = null
 }

let pointerID = null
let sidebarWidthRouteIDCache = null

sidebarWidth.element.onpointerdown = start