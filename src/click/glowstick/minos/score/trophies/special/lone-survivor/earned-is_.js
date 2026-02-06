if (minosTrophy.model)
 return true

if (minos.board.activeTiles.size === 1) {
 minosTrophy.setRouteID(1n)
 return true
}

return false