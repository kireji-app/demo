if (thisMinosPointsTrophy.model)
 return true

if ((environment === "client" && Client.hydrated) && Number(MinosScore.points.rid) >= thisMinosPointsTrophy.goal) {
 thisMinosPointsTrophy.setRID(1n)
 return true
}

return false