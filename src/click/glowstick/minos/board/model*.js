const model = {
 // This information is here just in case we need to reconstruct an arrangement from a board with a different width.
 width: minosBoard.width,
 tileIndices: []
}

for (const tile of minosBoard.activeTiles)
 model.tileIndices.push(tile.y * minosBoard.width + tile.x)

return model