/** @type {IMinosGameTrophyCategory} */
const category = minosTrophies[minosMetaTrophy.key]

for (const trophy of category) {
 if (trophy === minosMetaTrophy)
  continue

 if (minosTrophies.recomputing) {
  if (!minosTrophies.earned.has(trophy))
   return false
 } else if (!trophy.isEarned)
  return false
}

return true