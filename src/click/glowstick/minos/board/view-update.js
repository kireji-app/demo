for (const tile of minosBoard.allTiles) {
 if (minosBoard.viewedTiles.has(tile)) {
  if (!minosBoard.activeTiles.has(tile)) {
   minosBoard.viewedTiles.delete(tile)
   Q(`[style="--x:${tile.x};--y:${tile.y}"]`).remove()
  }
 } else if (minosBoard.activeTiles.has(tile)) {
  minosBoard.viewedTiles.add(tile)
  const newTile = document.createElement("mino-")
  newTile.setAttribute("style", `--x:${tile.x};--y:${tile.y}`)
  minosBoard.element.appendChild(newTile)
 }
}