MinosBoard.updateRID(NEW_RID)

MinosBoard.activeTiles.clear()

for (let rowColumnIndex = 0; rowColumnIndex < MinosBoard.width; rowColumnIndex++) {
 MinosBoard.filledRows.add(rowColumnIndex)
 MinosBoard.filledColumns.add(rowColumnIndex)
}

for (const tile of MinosBoard.allTiles) {

 if (NEW_RID & 1n) {
  MinosBoard.activeTiles.add(tile)
 } else {
  MinosBoard.filledColumns.delete(tile.x)
  MinosBoard.filledRows.delete(tile.y)
 }

 NEW_RID >>= 1n
}