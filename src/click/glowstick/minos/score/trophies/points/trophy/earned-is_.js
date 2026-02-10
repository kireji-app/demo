if (minosPointsTrophy.model)
 return true

if (Number(minosScore.points.routeID) >= minosPointsTrophy.goal) {
 minosPointsTrophy.setRouteID(1n)
 return true
}

return false