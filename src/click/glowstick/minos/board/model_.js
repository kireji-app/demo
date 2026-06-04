const model = {
 // This information is here just in case we need to reconstruct an arrangement from a board with a different width.
 width: MinosBoard.width,
 tileIndices: []
}

for (const tile of MinosBoard.activeTiles)
 model.tileIndices.push(tile.y * MinosBoard.width + tile.x)

return model