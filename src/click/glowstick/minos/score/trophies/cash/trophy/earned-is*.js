if (minosCashTrophy.model)
 return true

if (Number(minosScore.cash.routeID) >= minosCashTrophy.goal) {
 minosCashTrophy.setRouteID(1n)
 return true
}

return false