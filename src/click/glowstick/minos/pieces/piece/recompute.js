minosPiece.allowedTiles.clear()

for (const tile of minos.board.allTiles) {

 let canPlace = true

 for (const mino of minosPiece.minos) {

  const landingX = tile.x + mino.x
  const landingY = tile.y + mino.y

  if (landingX >= minos.board.width || landingY >= minos.board.width) {
   canPlace = false
   break
  }

  const landingTileIndex = (landingY * minos.board.width) + landingX
  const landingTile = minos.board.allTiles[landingTileIndex]

  if (minos.board.activeTiles.has(landingTile)) {
   canPlace = false
   break
  }
 }

 if (canPlace)
  minosPiece.allowedTiles.add(tile)
}