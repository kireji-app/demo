if (thisMinosShapeTrophy.model)
 return true

if ((environment === "client" && Client.hydrated) && BigInt(MinosGame.board.activeTiles.size) === thisMinosShapeTrophy.size && thisMinosShapeTrophy.examine()) {
 thisMinosShapeTrophy.setRID(1n)
 return true
}

return false