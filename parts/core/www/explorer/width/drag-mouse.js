EVENT.preventDefault()
const backupOnMouseUp = window.onmouseup
const backupOnMouseMove = window.onmousemove

document.body.classList.add("dragging")

window.onmousemove = e => {
 e.preventDefault()
 if (e.clientX < 32) {
  if (part.width.arm === part.width.open)
   part.width.set(0n)
 } else part.width.set(part.width.offsets[part.width.open] + BigInt(Math.min(895, Math.max(0, Math.trunc(e.clientX) - 64))))
}

window.onmouseup = e => {
 e.preventDefault()
 window.onmouseup = backupOnMouseUp
 window.onmousemove = backupOnMouseMove
 document.body.classList.remove("dragging")
}