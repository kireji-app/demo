/** @type {IMinosGameMinoPointerConfig} */
const pointerConfig = MinosGame.modal.shop.enabled ? {
 click() {
  const newTargetID = BigInt(thisMinosMino.key.slice(5))
  if (newTargetID !== MinosGame.modal.shop.target.rid)
   MinosGame.modal.shop.target.setRID(newTargetID)
 },
 POINTER_EVENT,
 TARGET_ELEMENT
} : {
 boardSize: MinosGame.board.clientSize,
 itemStyle: TARGET_ELEMENT.getAttribute("style"),
 itemSize: null,
 dropMarker: MinosGame.board.element.appendChild(document.createElement("tile-")),
 dropPosition: null,
 isRadialBomb: thisMinosMino.primitive === MinosGame.primitives.radialBomb,
 isCrosshairBomb: thisMinosMino.primitive === MinosGame.primitives.crosshairBomb,
 down() {
  this.dropMarker.setAttribute("style", `display:none`)
  this.dropMarker.classList.add("drop-marker")
  TARGET_ELEMENT.setAttribute("style", `${this.itemStyle};--x:0;--y:0`)
  TARGET_ELEMENT.classList.add("dragging")
  MinosGame.container.classList.add("dragging")
  this.itemSize = TARGET_ELEMENT.getBoundingClientRect()
  TARGET_ELEMENT.focus()
 },
 drag(pointerEvent) {
  const
   offset = { left: pointerEvent.clientX - POINTER_EVENT.clientX, top: pointerEvent.clientY - POINTER_EVENT.clientY },
   x = Math.round((this.itemSize.left - this.boardSize.left + offset.left) / this.boardSize.tileSize),
   y = Math.round((this.itemSize.top - this.boardSize.top + offset.top) / this.boardSize.tileSize),
   isOnBoard = x >= 0 && x < MinosGame.board.width && y >= 0 && y < MinosGame.board.width,
   isAllowed = isOnBoard && thisMinosMino.allowedTiles.has(MinosGame.board.allTiles[y * MinosGame.board.width + x])

  if (isAllowed) {
   this.dropPosition = Vector[2](x, y)
   MinosGame.board.element.classList.add("allowed")
   this.shop = false
  } else {
   this.dropPosition = null
   MinosGame.board.element.classList.remove("allowed")
  }

  if (this.isRadialBomb) {
   for (const oldThreatened of MinosGame.board.element.querySelectorAll(".threatened"))
    oldThreatened.classList.remove("threatened")

   const radius = 5n
   const r2 = radius * radius
   for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
     const nx = BigInt(x) + dx
     const ny = BigInt(y) + dy
     if (nx >= 0n && nx < MinosGame.board.width && ny >= 0n && ny < MinosGame.board.width && dx * dx + dy * dy <= r2)
      Q(`#board tile-[style="--x:${nx};--y:${ny}"]`)?.classList.add("threatened")
    }
   }
  } else if (this.isCrosshairBomb) {
   for (const oldThreatened of MinosGame.board.element.querySelectorAll(".threatened"))
    oldThreatened.classList.remove("threatened")

   for (const columnMino of MinosGame.board.element.querySelectorAll(`[style*="--x:${x};"]`))
    columnMino.classList.add("threatened")

   for (const rowMino of MinosGame.board.element.querySelectorAll(`[style$="--y:${y}"]`))
    rowMino.classList.add("threatened")
  }

  this.dropMarker.setAttribute("style", `${this.itemStyle};--x:${x};--y:${y}`)
  TARGET_ELEMENT.setAttribute("style", `${this.itemStyle};--x:${offset.left}px;--y:${offset.top}px`)
 },
 drop(pointerEvent) {
  if (this.dropPosition)
   thisMinosMino.place(this.dropPosition)
 },
 reset() {
  this.dropMarker.remove()
  TARGET_ELEMENT.setAttribute("style", this.itemStyle)
  TARGET_ELEMENT.classList.remove("dragging")
  MinosGame.container.classList.remove("dragging")
  for (const oldThreatened of MinosGame.board.element.querySelectorAll(".threatened"))
   oldThreatened.classList.remove("threatened")
  MinosGame.board.element.classList.remove("allowed")
 },
 POINTER_EVENT,
 TARGET_ELEMENT
}

Pointer.handle(pointerConfig)