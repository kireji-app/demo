/** @type {IMino[]} */
const tiles = MODEL

if (!Array.isArray(tiles))
 throw new TypeError(`Model To RouteID Error: Part "${part.host}" only accepts arrays.`)

let resultRouteID = 0n

for (const tile of tiles) {
 if (typeof tile === "object") {
  const { x, y } = tile
  if (typeof x === "number" && typeof y === "number") {
   if (y >= 0 && x >= 0 && x < minosBoard.width && y < minosBoard.width) {
    const tileIndex = BigInt((y * minosBoard.width) + x)
    resultRouteID |= 1n << tileIndex
   } else warn(new RangeError(`Model To RouteID Error: Part "${part.host}" requires all tile coordinates be a non-negative integer smaller than the board's width and height.`))
  } else warn(new TypeError(`Model To RouteID Error: Part "${part.host}" requires all tiles have numeric x and y coordinates.`))
 } else warn(new TypeError(`Model To RouteID Error: Part "${part.host}" only accepts arrays of tile objects (found ${typeof tile})`))
}

if (resultRouteID >= part.cardinality)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a route ID that was too large (${resultRouteID}) (max ${part.cardinality}).`)

if (resultRouteID < 0n)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a negative route ID.`)

return resultRouteID