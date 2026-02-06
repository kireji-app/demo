const coords = []

for (const { x, y } of minosBoard.activeTiles)
 coords.push(`<mino- style="--x:${x};--y:${y}"></mino->`)

return coords.join("")