if (_.application === _.app.kireji.www) {

 const
  element = document.querySelector("width-handle"),
  start = e => {
   e.preventDefault()
   if (pointerID !== null) return
   element.setPointerCapture(pointerID = e.pointerId)
   document.body.classList.add("dragging")
   document.addEventListener("pointermove", drag)
   document.addEventListener("pointerup", end)
   document.addEventListener("pointercancel", end)
  },
  drag = e => {
   if (e.pointerId !== pointerID) return
   e.preventDefault()
   if (e.clientX < 64) {
    if (width.arm === width.open) width.setRouteID(0n)
   } else {
    const targetWidth = Math.min(895, Math.max(0, Math.trunc(e.clientX) - 128))
    const targetRouteID = width.offsets.get(width.open) + BigInt(targetWidth)
    if (width.routeID !== targetRouteID) width.setRouteID(targetRouteID)
   }
  },
  end = e => {
   if (e.pointerId !== pointerID) return
   document.body.classList.remove("dragging")
   document.removeEventListener("pointermove", drag)
   document.removeEventListener("pointerup", end)
   document.removeEventListener("pointercancel", end)
   element.releasePointerCapture(pointerID)
   pointerID = null
  }

 let pointerID = null

 element.onpointerdown = start
}