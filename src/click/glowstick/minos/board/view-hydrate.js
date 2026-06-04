MinosBoard.element = Q("#board")

for (const activeTile of MinosBoard.activeTiles)
 MinosBoard.viewedTiles.add(activeTile)

Client.promise.then(() => MinosGame.checkState())