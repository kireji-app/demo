MinosTrophies.recomputing = true

MinosTrophies.earned.clear()

const metaTrophies = []

for (const trophy of MinosTrophies.possible) {
 if (trophy[".."] === MinosTrophies.meta) {
  metaTrophies.push(trophy)
  continue
 }
 if (trophy.isEarned)
  MinosTrophies.earned.add(trophy)
}

for (const trophy of metaTrophies) {
 if (trophy.key === "meta")
  continue
 if (trophy.isEarned)
  MinosTrophies.earned.add(trophy)
}

if (MinosTrophies.meta.meta.isEarned)
 MinosTrophies.earned.add(MinosTrophies.meta.meta)

MinosTrophies.recomputing = false