thisMinosMino.allowedTiles.clear()

for (const boardTile of MinosGame.board.allTiles) {

 let canPlace = true

 for (const minoTile of thisMinosMino.tiles) {

  const landingX = boardTile.x + minoTile.x
  const landingY = boardTile.y + minoTile.y

  if (landingX >= MinosGame.board.width || landingY >= MinosGame.board.width) {
   canPlace = false
   break
  }

  const landingTileIndex = (landingY * MinosGame.board.width) + landingX
  const landingTile = MinosGame.board.allTiles[landingTileIndex]

  if (MinosGame.board.activeTiles.has(landingTile)) {
   canPlace = false
   break
  }
 }

 if (canPlace)
  thisMinosMino.allowedTiles.add(boardTile)
}