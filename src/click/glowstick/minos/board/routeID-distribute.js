minosBoard.updateRouteID(ROUTE_ID)

minosBoard.activeTiles.clear()

for (let rowColumnIndex = 0; rowColumnIndex < minosBoard.width; rowColumnIndex++) {
 minosBoard.filledRows.add(rowColumnIndex)
 minosBoard.filledColumns.add(rowColumnIndex)
}

for (const tile of minosBoard.allTiles) {

 if (ROUTE_ID & 1n) {
  minosBoard.activeTiles.add(tile)
 } else {
  minosBoard.filledColumns.delete(tile.x)
  minosBoard.filledRows.delete(tile.y)
 }

 ROUTE_ID >>= 1n
}