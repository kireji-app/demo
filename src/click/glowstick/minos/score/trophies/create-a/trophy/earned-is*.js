if (minosShapeTrophy.model)
 return true

if (BigInt(minos.board.activeTiles.size) !== minosShapeTrophy.size)
 return false

if (minosShapeTrophy.examine()) {
 minosShapeTrophy.setRouteID(1n)
 return true
}