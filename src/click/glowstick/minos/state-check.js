MinosGame.lock()

// Detonate bomb.
if (MinosBombLayer.arm !== MinosBombLayer.none) setTimeout(() => {
 let maskedRID = MinosBoard.rid
 let earnings = 0n
 const tile = MinosBoard.allTiles[Number(MinosBombLayer.arm.rid)]
 const boardSize = BigInt(MinosBoard.width)
 const isRadialBomb = MinosBombLayer.arm === MinosBombLayer.radial

 if (isRadialBomb) {
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
  maskedRID &= ~radialMask
 } else {
  const rowMask = ((1n << boardSize) - 1n) << (BigInt(tile.y) * boardSize)
  maskedRID &= ~rowMask
  const oneBitPerRow = ((1n << (boardSize * boardSize)) - 1n) / ((1n << boardSize) - 1n)
  const colMask = oneBitPerRow << BigInt(tile.x)
  maskedRID &= ~colMask
 }

 MinosBombLayer.setRID(0n)

 if (maskedRID !== MinosBoard.rid) {
  const cachedActiveTiles = MinosBoard.activeTiles.size
  if (cachedActiveTiles === 1 && isRadialBomb && MinosScore.trophies.special.overkill.rid !== 1n)
   MinosScore.trophies.special.overkill.setRID(1n)
  MinosBoard.setRID(maskedRID)
  const earnings = cachedActiveTiles - MinosBoard.activeTiles.size
  debug(`Earned ${earnings} points!`)
  MinosPoints.earn(earnings)
  MinosMinoes.forEach(mino => mino.recompute())
 }

 if (!MinosScore.trophies.basic.boom.model)
  MinosScore.trophies.basic.boom.setRID(1n)

 MinosScore.usedBomb.set()
 MinosScore.trophies.checkState()
 MinosGame.checkState()
}, 250)

// Clear row or column.
else if (MinosBoard.filledRows.size || MinosBoard.filledColumns.size) setTimeout(() => {
 let maskedRID = MinosBoard.rid
 let earnings = 0
 let multiplier = 0
 const cachedActiveTiles = MinosBoard.activeTiles.size
 for (const row of MinosBoard.filledRows) {
  const rowSize = BigInt(MinosBoard.width)
  const rowTarget = BigInt(row)
  const rowMask = ((1n << rowSize) - 1n) << (rowTarget * rowSize)
  maskedRID &= ~rowMask
  earnings += 10
  multiplier++
 }
 for (const column of MinosBoard.filledColumns) {
  const N = BigInt(MinosBoard.width)
  const colTarget = BigInt(column)
  const oneBitPerRow = ((1n << (N * N)) - 1n) / ((1n << N) - 1n)
  const colMask = oneBitPerRow << colTarget
  maskedRID &= ~colMask
  earnings += 10
  multiplier++
 }

 if ((MinosBoard.filledRows.size >= 2 || MinosBoard.filledColumns.size >= 2) && !MinosScore.trophies.basic.combo.model)
  MinosScore.trophies.basic.combo.setRID(1n)

 if (MinosBoard.filledRows.size >= 1 && MinosBoard.filledColumns.size >= 1 && !MinosScore.trophies.basic.crosshair.model)
  MinosScore.trophies.basic.crosshair.setRID(1n)

 MinosBoard.setRID(maskedRID)
 earnings += cachedActiveTiles - MinosBoard.activeTiles.size
 MinosMinoes.forEach(mino => mino.recompute())
 debug(`Earned ${earnings} * ${multiplier} points!`)
 MinosPoints.earn(earnings * multiplier)
 MinosScore.trophies.checkState()
 MinosGame.checkState()
}, 1)

// Acknowledge empty board.
else if (MinosBoard.rid === 0n) setTimeout(() => {
 debug("You won!")
 setTimeout(() => {
  MinosWins.increment()
  debug(`Earned 1000 points!`)
  MinosPoints.earn(1000)
  MinosBoard.scramble()
  MinosMinoes.scramble()
  if (!MinosScore.usedBomb.model)
   MinosScore.trophies.special.pacifist.set()
  if (MinosScore.moves.rid <= 20n) {
   MinosScore.trophies.moveLimit[20].set()
   if (MinosScore.moves.rid <= 10n) {
    MinosScore.trophies.moveLimit[10].set()
    if (MinosScore.moves.rid <= 4n)
     MinosScore.trophies.moveLimit[4].set()
   }
  }
  MinosScore.usedBomb.clear()
  MinosScore.moves.clear()
  MinosScore.trophies.checkState()
  MinosGame.checkState()
 }, 1500)
}, 1)

else {

 if (!MinosScore.trophies.special.crowded.model && MinosBoard.activeTiles.size === MinosBoard.width * (MinosBoard.width - 1))
  MinosScore.trophies.special.crowded.setRID(1n)

 // Acknowledge locked board.
 if (![...MinosMinoes].some(mino => mino.allowedTiles.size > 0)) setTimeout(() => {
  setTimeout(() => {
   if (!MinosScore.trophies.basic.lock.isEarned)
    MinosScore.trophies.basic.lock.setRID(1n)
   MinosBoard.scramble()
   MinosMinoes.scramble()
   MinosScore.usedBomb.clear()
   MinosScore.moves.clear()
   MinosScore.trophies.checkState()
   MinosGame.checkState()
  }, 1500)
 }, 1)

 // Continue game normally.
 else {
  MinosScore.trophies.checkState()
  MinosGame.unlock()
 }
}