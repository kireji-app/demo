if (thisMinosTrophy.model)
 return true

if ((environment === "client" && Client.hydrated) && MinosGame.board.activeTiles.size === 1) {
 thisMinosTrophy.setRID(1n)
 return true
}

return false