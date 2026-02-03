const shapeMask = minosShapeTrophy.mask
const shapeWidth = minosShapeTrophy.width

const boardMask = minos.board.routeID
const boardWidth = BigInt(minos.board.width)

const examineWidth = boardWidth - shapeWidth

for (let y = 0n; y <= examineWidth; y++)
 for (let x = 0n; x <= examineWidth; x++) {
  const pannedShapeMask = shapeMask << (y * boardWidth + x)
  if (boardMask === pannedShapeMask)
   return true
 }

return false