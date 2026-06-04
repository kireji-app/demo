MinosTrophies.recompute()

/** @type {Set<IMinosGameTrophy>} */
const newTrophies = new Set()
const newMetaTrophies = new Set()
const newMetaMetaTrophy = new Set()

for (const trophy of MinosTrophies.earned) {
 if (MinosTrophies.viewedEarned.has(trophy))
  continue

 if (trophy[".."] === MinosTrophies.meta) {
  if (trophy.key !== "meta")
   newMetaTrophies.add(trophy)
  else
   newMetaMetaTrophy.add(trophy)
 } else
  newTrophies.add(trophy)
 MinosTrophies.viewedEarned.add(trophy)
}

if (newTrophies.size || newMetaTrophies.size) {
 for (const trophy of [...newTrophies, ...newMetaTrophies, ...newMetaMetaTrophy]) {
  debug(`
 🏆 ${trophy[".."].title}: ${trophy.key} 🏆
 📝 ${trophy.description}
 💰 ${trophy.reward} points
`)
  MinosScore.points.earn(trophy.reward)
 }
 Q("#trophies").innerHTML = MinosTrophies["part.html"]
}