const shapeWidth = BigInt(thisMinosShapeTrophy.key)
const shapeSize = shapeWidth * shapeWidth
const boardWidth = BigInt(MinosGame.board.width)

let shapeMask = 0n

for (let row = 0n; row < shapeWidth; row++)
 shapeMask |= ((1n << shapeWidth) - 1n) << (row * boardWidth)

define(thisMinosShapeTrophy, {
 size: { value: shapeSize },
 mask: { value: shapeMask },
 width: { value: shapeWidth }
})