/** @type {IMinosGamePiecePointerConfig} */
const pointerConfig = minos.modal.shop.enabled ? {
 click() {
  const newTargetID = BigInt(minosPiece.key.slice(5))
  if (newTargetID !== minos.modal.shop.target.routeID)
   minos.modal.shop.target.setRouteID(newTargetID)
 },
 POINTER_EVENT,
 TARGET_ELEMENT
} : {
 boardSize: minos.board.clientSize,
 itemStyle: TARGET_ELEMENT.getAttribute("style"),
 itemSize: null,
 dropMarker: minos.board.element.appendChild(document.createElement("mino-")),
 dropPosition: null,
 isRadialBomb: minosPiece.primitive === minosPiece.radialBomb,
 isCrosshairBomb: minosPiece.primitive === minosPiece.crosshairBomb,
 down() {
  this.dropMarker.setAttribute("style", `display:none`)
  this.dropMarker.classList.add("drop-marker")
  TARGET_ELEMENT.setAttribute("style", `${this.itemStyle};--x:0;--y:0`)
  TARGET_ELEMENT.classList.add("dragging")
  minos.container.classList.add("dragging")
  this.itemSize = TARGET_ELEMENT.getBoundingClientRect()
  TARGET_ELEMENT.focus()
 },
 drag(pointerEvent) {
  const
   offset = { left: pointerEvent.clientX - POINTER_EVENT.clientX, top: pointerEvent.clientY - POINTER_EVENT.clientY },
   x = Math.round((this.itemSize.left - this.boardSize.left + offset.left) / this.boardSize.tileSize),
   y = Math.round((this.itemSize.top - this.boardSize.top + offset.top) / this.boardSize.tileSize),
   isOnBoard = x >= 0 && x < minos.board.width && y >= 0 && y < minos.board.width,
   isAllowed = isOnBoard && minosPiece.allowedTiles.has(minos.board.allTiles[y * minos.board.width + x])

  if (isAllowed) {
   this.dropPosition = { x, y }
   minos.board.element.classList.add("allowed")
   this.shop = false
  } else {
   this.dropPosition = null
   minos.board.element.classList.remove("allowed")
  }

  if (this.isRadialBomb) {
   for (const oldThreatened of minos.board.element.querySelectorAll(".threatened"))
    oldThreatened.classList.remove("threatened")

   const radius = 5n
   const r2 = radius * radius
   for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
     const nx = BigInt(x) + dx
     const ny = BigInt(y) + dy
     if (nx >= 0n && nx < minos.board.width && ny >= 0n && ny < minos.board.width && dx * dx + dy * dy <= r2)
      Q(`#board mino-[style="--x:${nx};--y:${ny}"]`)?.classList.add("threatened")
    }
   }
  } else if (this.isCrosshairBomb) {
   for (const oldThreatened of minos.board.element.querySelectorAll(".threatened"))
    oldThreatened.classList.remove("threatened")

   for (const columnMino of minos.board.element.querySelectorAll(`[style*="--x:${x};"]`))
    columnMino.classList.add("threatened")

   for (const rowMino of minos.board.element.querySelectorAll(`[style$="--y:${y}"]`))
    rowMino.classList.add("threatened")
  }

  this.dropMarker.setAttribute("style", `${this.itemStyle};--x:${x};--y:${y}`)
  TARGET_ELEMENT.setAttribute("style", `${this.itemStyle};--x:${offset.left}px;--y:${offset.top}px`)
 },
 drop(pointerEvent) {
  if (this.dropPosition)
   minosPiece.place(this.dropPosition.x, this.dropPosition.y)
 },
 reset() {
  this.dropMarker.remove()
  TARGET_ELEMENT.setAttribute("style", this.itemStyle)
  TARGET_ELEMENT.classList.remove("dragging")
  minos.container.classList.remove("dragging")
  for (const oldThreatened of minos.board.element.querySelectorAll(".threatened"))
   oldThreatened.classList.remove("threatened")
  minos.board.element.classList.remove("allowed")
 },
 POINTER_EVENT,
 TARGET_ELEMENT
}

pointer.handle(pointerConfig)