/** @type {IMinosGameTrophyCategory} */
const category = MinosTrophies[thisMinosMetaTrophy.key]

for (const trophy of category) {
 if (trophy === thisMinosMetaTrophy)
  continue

 if (MinosTrophies.recomputing) {
  if (!MinosTrophies.earned.has(trophy))
   return false
 } else if (!trophy.isEarned)
  return false
}

return true