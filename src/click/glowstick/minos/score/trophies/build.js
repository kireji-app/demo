const possibleTrophies = new Set()

for (const category of MinosTrophies)
 for (const trophy of category)
  possibleTrophies.add(trophy)

define(MinosTrophies, {
 possible: { value: possibleTrophies },
 earned: { value: new Set() },
 viewedEarned: { value: new Set() },
 recomputing: { value: false, writable: true }
})