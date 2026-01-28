/** @type {{ readonly width: number, readonly tileIndices: IMino[] }} */

if (typeof MODEL !== "object" || !("width" in MODEL) || !("tileIndices" in MODEL) || typeof MODEL.width !== "number" || !Array.isArray(MODEL.tileIndices))
 throw new TypeError(`Model To RouteID Error: Part "${part.host}" only accepts an object with format { width: number, tileIndices: number[] }.`)

const { width, tileIndices } = MODEL

let resultRouteID = 0n

for (const tileIndex of tileIndices) {
 if (typeof tileIndex === "number") {
  const tile = { x: tileIndex % width, y: Math.floor(tileIndex / width) }
  if (tile.y >= 0 && tile.x >= 0 && tile.x < minosBoard.width && tile.y < minosBoard.width) {
   const tileIndex = BigInt((tile.y * minosBoard.width) + tile.x)
   resultRouteID |= 1n << tileIndex
  } else warn(new RangeError(`Model To RouteID Error: Part "${part.host}" requires all tile coordinates be a non-negative integer smaller than the board's width and height (${minosBoard.width}).`))
 } else warn(new TypeError(`Model To RouteID Error: Part "${part.host}" only accepts numbers as tile indices (found ${typeof tileIndex})`))
}

if (resultRouteID >= part.cardinality)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a route ID that was too large (${resultRouteID}) (max ${part.cardinality}).`)

if (resultRouteID < 0n)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a negative route ID.`)

return resultRouteID