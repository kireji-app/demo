if (minosShapeTrophy.model)
 return true

if ((environment === "client" && client.hydrated) && BigInt(minos.board.activeTiles.size) === minosShapeTrophy.size && minosShapeTrophy.examine()) {
 minosShapeTrophy.setRouteID(1n)
 return true
}

return false