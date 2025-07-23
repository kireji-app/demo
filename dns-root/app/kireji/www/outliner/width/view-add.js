if (_.application === _.app.kireji.www) {
 const element = document.querySelector("width-handle")
 element.onmousedown = e => {
  e.preventDefault()
  const backupOnMouseUp = globalThis.onmouseup
  const backupOnMouseMove = globalThis.onmousemove

  document.body.classList.add("dragging")

  globalThis.onmousemove = e => {
   e.preventDefault()
   if (e.clientX < 64) {
    if (width.arm === width.open)
     width.setRouteID(0n)
   } else {
    const targetRouteID = width.offsets.get(width.open) + BigInt(Math.min(895, Math.max(0, Math.trunc(e.clientX) - 128)))

    if (width.routeID !== targetRouteID)
     width.setRouteID(targetRouteID)
   }
  }

  globalThis.onmouseup = e => {
   e.preventDefault()
   globalThis.onmouseup = backupOnMouseUp
   globalThis.onmousemove = backupOnMouseMove
   document.body.classList.remove("dragging")
  }
 }
 element.ontouchstart = e => {
  const backupOnTouchEnd = globalThis.ontouchend
  const backupOnTouchMove = globalThis.ontouchmove

  document.body.classList.add("dragging")

  globalThis.ontouchmove = e => {
   if (e.touches[0].clientX < 64) {
    if (width.arm === width.open)
     width.setRouteID(0n)
   } else {
    const targetRouteID = width.offsets.get(width.open) + BigInt(Math.min(895, Math.max(0, Math.trunc(e.touches[0].clientX) - 128)))

    if (width.routeID !== targetRouteID)
     width.setRouteID(targetRouteID)
   }
  }

  globalThis.ontouchend = e => {
   globalThis.ontouchend = backupOnTouchEnd
   globalThis.ontouchmove = backupOnTouchMove
   document.body.classList.remove("dragging")
  }
 }
}