const shapeMask = thisMinosShapeTrophy.mask
const shapeWidth = thisMinosShapeTrophy.width

const boardMask = MinosGame.board.rid
const boardWidth = BigInt(MinosGame.board.width)

const examineWidth = boardWidth - shapeWidth

for (let y = 0n; y <= examineWidth; y++)
 for (let x = 0n; x <= examineWidth; x++) {
  const pannedShapeMask = shapeMask << (y * boardWidth + x)
  if (boardMask === pannedShapeMask)
   return true
 }

return false