EVENT.preventDefault()
const backupOnMouseUp = window.onmouseup
const backupOnMouseMove = window.onmousemove

document.body.classList.add("dragging")

window.onmousemove = e => {
 e.preventDefault()
 if (e.clientX < 64) {
  if (part.arm === part.open)
   part.setRouteID(0n)
 } else {
  const targetRouteID = part.offsets.get(part.open) + BigInt(Math.min(895, Math.max(0, Math.trunc(e.clientX) - 128)))

  if (part.routeID !== targetRouteID)
   part.setRouteID(targetRouteID)
 }
}

window.onmouseup = e => {
 e.preventDefault()
 window.onmouseup = backupOnMouseUp
 window.onmousemove = backupOnMouseMove
 document.body.classList.remove("dragging")
}