minosTrophies.recompute()

/** @type {Set<IMinosGameTrophy>} */
const newTrophies = new Set()
const newMetaTrophies = new Set()
const newMetaMetaTrophy = new Set()

// TODO: put these in canonical order.

for (const trophy of minosTrophies.earned) {
 if (minosTrophies.viewedEarned.has(trophy))
  continue

 if (trophy[".."] === minosTrophies.meta) {
  if (trophy.key !== "meta")
   newMetaTrophies.add(trophy)
  else
   newMetaMetaTrophy.add(trophy)
 } else
  newTrophies.add(trophy)
 minosTrophies.viewedEarned.add(trophy)
}

if (newTrophies.size || newMetaTrophies.size) {
 for (const trophy of [...newTrophies, ...newMetaTrophies, ...newMetaMetaTrophy])
  debug('🏆 ' + trophy.description + '')
 Q("#trophies").innerHTML = minosTrophies["part.html"]
}