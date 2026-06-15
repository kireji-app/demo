/** @type {{ readonly width: number, readonly tileIndices: IVector2[] }} */

if (typeof MODEL !== "object" || !("width" in MODEL) || !("tileIndices" in MODEL) || typeof MODEL.width !== "number" || !Array.isArray(MODEL.tileIndices))
 throw error(`invalid model (expendted { width: number, tileIndices: number[] })`)

const { width, tileIndices } = MODEL

let resultRID = 0n

for (const tileIndex of tileIndices) {
 if (typeof tileIndex === "number") {
  const tile = Vector.xy(tileIndex % width, Math.floor(tileIndex / width))
  if (tile.y >= 0 && tile.x >= 0 && tile.x < MinosBoard.width && tile.y < MinosBoard.width) {
   const tileIndex = BigInt((tile.y * MinosBoard.width) + tile.x)
   resultRID |= 1n << tileIndex
  } else warn(error(`tile coordinates must be a non-negative integers smaller than the board's width and height`))
 } else warn(error(`tile indices must be numbers (found ${typeof tileIndex})`))
}

if (resultRID >= MinosBoard.cardinality || resultRID < 0n)
 throw error(`RID out of range\n\tRID:${resultRID}\n\tRange: [0, ${MinosBoard.cardinality}]`)

return resultRID