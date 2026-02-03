const possibleTrophies = new Set()

for (const category of minosTrophies)
 for (const trophy of category)
  possibleTrophies.add(trophy)

minosTrophies.define({
 possible: { value: possibleTrophies },
 earned: { value: new Set() },
 viewedEarned: { value: new Set() },
 recomputing: { value: false, writable: true }
})