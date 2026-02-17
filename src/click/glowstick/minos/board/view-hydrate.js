minosBoard.element = Q("#board")

for (const activeTile of minosBoard.activeTiles)
 minosBoard.viewedTiles.add(activeTile)

client.promise.then(() => minos.checkState())