const model = []

for (const tile of minosBoard.activeTiles)
 model.push({ ...tile })

return model