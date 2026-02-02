minos.lock()

// Detonate bomb.
if (minosBomb.arm !== minosBomb.none) setTimeout(() => {
 let maskedRouteID = minos.board.routeID
 let earnings = 0n
 const tile = minos.board.allTiles[Number(minosBomb.arm.routeID)]
 const boardSize = BigInt(minos.board.width)

 if (minosBomb.arm === minosBomb.radial) {
  const radius = 5n
  const r2 = radius * radius
  let radialMask = 0n
  for (let dy = -radius; dy <= radius; dy++) {
   for (let dx = -radius; dx <= radius; dx++) {
    const nx = BigInt(tile.x) + dx
    const ny = BigInt(tile.y) + dy
    if (nx >= 0n && nx < boardSize && ny >= 0n && ny < boardSize && dx * dx + dy * dy <= r2)
     radialMask |= 1n << BigInt((ny * boardSize) + nx)
   }
  }
  maskedRouteID &= ~radialMask
 } else {
  const rowMask = ((1n << boardSize) - 1n) << (BigInt(tile.y) * boardSize)
  maskedRouteID &= ~rowMask
  const oneBitPerRow = ((1n << (boardSize * boardSize)) - 1n) / ((1n << boardSize) - 1n)
  const colMask = oneBitPerRow << BigInt(tile.x)
  maskedRouteID &= ~colMask
 }

 minos.bomb.setRouteID(0n)

 if (maskedRouteID !== minosBoard.routeID) {
  const cachedActiveTiles = minosBoard.activeTiles.size
  minosBoard.setRouteID(maskedRouteID)
  const earnings = cachedActiveTiles - minosBoard.activeTiles.size
  debug(`Earned $${earnings}!`)
  minosCash.earn(earnings)
  minosPieces.forEach(piece => piece.recompute())
 }

 minos.checkState()
}, 250)

// Clear row or column.
else if (minosBoard.filledRows.size || minosBoard.filledColumns.size) setTimeout(() => {
 let maskedRouteID = minos.board.routeID
 let earnings = 0
 let multiplier = 1
 const cachedActiveTiles = minosBoard.activeTiles.size
 for (const row of minos.board.filledRows) {
  const rowSize = BigInt(minos.board.width)
  const rowTarget = BigInt(row)
  const rowMask = ((1n << rowSize) - 1n) << (rowTarget * rowSize)
  maskedRouteID &= ~rowMask
  earnings += 10
  multiplier++
 }
 for (const column of minos.board.filledColumns) {
  const N = BigInt(minos.board.width)
  const colTarget = BigInt(column)
  const oneBitPerRow = ((1n << (N * N)) - 1n) / ((1n << N) - 1n)
  const colMask = oneBitPerRow << colTarget
  maskedRouteID &= ~colMask
  earnings += 10
  multiplier++
 }
 minosBoard.setRouteID(maskedRouteID)
 earnings += cachedActiveTiles - minosBoard.activeTiles.size
 minosPieces.forEach(piece => piece.recompute())
 debug(`Earned $${earnings} * ${multiplier}!`)
 minosCash.earn(earnings * multiplier)
 minos.checkState()
}, 1)

// Acknowledge empty board.
else if (minosBoard.routeID === 0n) setTimeout(() => {
 debug("You won!")
 setTimeout(() => {
  minosWins.increment()
  debug(`Earned $1000!`)
  minosCash.earn(1000)
  minosBoard.scramble()
  minosPieces.scramble()
  minos.checkState()
 }, 1500)
}, 1)

// Acknowledge locked board.
else if (![...minos.pieces].some(piece => piece.allowedTiles.size > 0)) setTimeout(() => {
 error("Error: You lost.")
 setTimeout(() => {
  minosCash.reset()
  minosBoard.scramble()
  minosPieces.scramble()
  minos.checkState()
 }, 1500)
}, 1)

// Continue game normally.
else minos.unlock()