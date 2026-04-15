if (minosTrophy.model)
 return true

if ((environment === "client" && client.hydrated) && minos.board.activeTiles.size === 1) {
 minosTrophy.setRouteID(1n)
 return true
}

return false