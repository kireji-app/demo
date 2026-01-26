debug('lock minos interaction')

if (minosBomb.arm !== minosBomb.none) setTimeout(() => {
 let maskedRouteID = minos.board.routeID
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
  minosBoard.setRouteID(maskedRouteID)
  minos.pieces.forEach(piece => piece.recompute())
  debug('unlock minos interaction')
  minos.checkState()
 }

}, 250)

else if (minosBoard.routeID === 0n) setTimeout(() => {
 error("Error: You won!")
 setTimeout(() => {
  if (minosScore.wins.routeID < minosScore.wins.cardinality - 1n)
   minosScore.wins.setRouteID(minosScore.wins.routeID + 1n)
  minosBoard.setRouteID(randomRouteID(minosBoard.cardinality))
  minos.pieces.forEach(piece => piece.randomize())
  debug('unlock minos interaction')
  minos.checkState()
 }, 1500)
}, 1)

else if (minosBoard.filledRows.size || minosBoard.filledColumns.size) setTimeout(() => {

 let maskedRouteID = minos.board.routeID
 for (const row of minos.board.filledRows) {
  const rowSize = BigInt(minos.board.width)
  const rowTarget = BigInt(row)
  const rowMask = ((1n << rowSize) - 1n) << (rowTarget * rowSize)
  maskedRouteID &= ~rowMask
 }
 for (const column of minos.board.filledColumns) {
  const N = BigInt(minos.board.width)
  const colTarget = BigInt(column)
  const oneBitPerRow = ((1n << (N * N)) - 1n) / ((1n << N) - 1n)
  const colMask = oneBitPerRow << colTarget
  maskedRouteID &= ~colMask
 }
 minos.board.setRouteID(maskedRouteID)
 minos.pieces.forEach(piece => piece.recompute())
 minos.checkState()
 debug('unlock minos interaction')
}, 1)

else if (![...minos.pieces].some(piece => piece.allowedTiles.size > 0)) setTimeout(() => {
 error("Error: You lost.")
 minos.board.setRouteID(0n)
 minos.pieces.forEach(piece => piece.recompute())
 debug('unlock minos interaction')
}, 1)

else debug('unlock minos interaction')