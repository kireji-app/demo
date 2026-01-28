const boardWidth = minosBoard.width
const tileCount = boardWidth * boardWidth
const tiles = []

for (let tileIndex = 0; tileIndex < tileCount; tileIndex++)
 tiles.push({ x: tileIndex % boardWidth, y: Math.floor(tileIndex / boardWidth) })

minosBoard.define({
 element: { value: null, writable: true },
 tileCount: { value: tileCount },
 cardinality: { value: 1n << BigInt(tileCount) },
 activeTiles: { value: new Set() },
 viewedTiles: { value: new Set() },
 allTiles: { value: tiles },
 filledColumns: { value: new Set() },
 filledRows: { value: new Set() }
})