if (minosPointsTrophy.model)
 return true

if ((environment === "client" && client.hydrated) && Number(minosScore.points.routeID) >= minosPointsTrophy.goal) {
 minosPointsTrophy.setRouteID(1n)
 return true
}

return false