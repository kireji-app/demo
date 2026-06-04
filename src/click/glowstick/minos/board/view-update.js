for (const tile of MinosBoard.allTiles) {
 if (MinosBoard.viewedTiles.has(tile)) {
  if (!MinosBoard.activeTiles.has(tile)) {
   MinosBoard.viewedTiles.delete(tile)
   Q(`[style="--x:${tile.x};--y:${tile.y}"]`).remove()
  }
 } else if (MinosBoard.activeTiles.has(tile)) {
  MinosBoard.viewedTiles.add(tile)
  const newTile = document.createElement("tile-")
  newTile.setAttribute("style", `--x:${tile.x};--y:${tile.y}`)
  MinosBoard.element.appendChild(newTile)
 }
}