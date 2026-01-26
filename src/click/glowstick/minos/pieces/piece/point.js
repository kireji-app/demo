pointer.handle({
 down() {
  const
   startPosition = this.startPosition = { x: POINTER_EVENT.clientX, y: POINTER_EVENT.clientY },
   existingStyle = this.existingStyle = TARGET_ELEMENT.getAttribute("style"),
   boardElement = this.boardElement = Q("#board"),
   targetMark = this.targetMark = boardElement.appendChild(document.createElement("mino-")),
   boardRect = this.boardElement.getBoundingClientRect(),
   boardOrigin = this.boardOrigin = { x: boardRect.left, y: boardRect.top },
   itemRect = this.itemRect = TARGET_ELEMENT.getBoundingClientRect(),
   tileSize = this.tileSize = boardRect.width / minos.board.width,
   dropPosition = this.dropPosition = { x: Math.round((itemRect.left - boardRect.left) / tileSize), y: Math.round((itemRect.top - boardRect.top) / tileSize) }

  this.canPlace = false
  targetMark.setAttribute("style", `--w:${minosPiece.width};--h:${minosPiece.height};--x:${dropPosition.x};--y:${dropPosition.y}`)
  targetMark.classList.add("target")
  TARGET_ELEMENT.classList.add("dragging")
  TARGET_ELEMENT.setAttribute("style", `${existingStyle};--x:0;--y:0`)
 },
 drag(pointerEvent) {

  const offset = { x: pointerEvent.clientX - this.startPosition.x, y: pointerEvent.clientY - this.startPosition.y }
  this.dropPosition.x = Math.round((this.itemRect.left - this.boardOrigin.x + offset.x) / this.tileSize)
  this.dropPosition.y = Math.round((this.itemRect.top - this.boardOrigin.y + offset.y) / this.tileSize)

  this.canPlace = true

  if (this.dropPosition.y < 0 || this.dropPosition.y >= minos.board.width || this.dropPosition.x < 0 || this.dropPosition.x >= minos.board.width)
   this.canPlace = false

  const dropIndex = (this.dropPosition.y * minos.board.width) + this.dropPosition.x
  const dropTile = minos.board.allTiles[dropIndex]

  if (!minosPiece.allowedTiles.has(dropTile))
   this.canPlace = false

  this.targetMark.setAttribute("data-valid", this.canPlace)
  this.targetMark.setAttribute("style", `--w:${minosPiece.width};--h:${minosPiece.height};--x:${this.dropPosition.x};--y:${this.dropPosition.y}`)
  TARGET_ELEMENT.setAttribute("style", `${this.existingStyle};--x:${offset.x}px;--y:${offset.y}px`)
 },
 drop(pointerEvent) {
  if (this.canPlace)
   minosPiece.place(this.dropPosition.x, this.dropPosition.y)
 },
 reset() {
  this.targetMark.remove()
  TARGET_ELEMENT.setAttribute("style", this.existingStyle)
  TARGET_ELEMENT.classList.remove("dragging")
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})