const coords = []

for (const { x, y } of MinosBoard.activeTiles)
 coords.push(`<tile- style="--x:${x};--y:${y}"></tile->`)

return coords.join("")