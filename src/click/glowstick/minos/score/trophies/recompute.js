minosTrophies.recomputing = true

minosTrophies.earned.clear()

const metaTrophies = []

// TODO: implement a caconical trophy order.

for (const trophy of minosTrophies.possible) {
 if (trophy[".."] === minosTrophies.meta) {
  metaTrophies.push(trophy)
  continue
 }
 if (trophy.isEarned)
  minosTrophies.earned.add(trophy)
}

for (const trophy of metaTrophies) {
 if (trophy.key === "meta")
  continue
 if (trophy.isEarned)
  minosTrophies.earned.add(trophy)
}

if (minosTrophies.meta.meta.isEarned)
 minosTrophies.earned.add(minosTrophies.meta.meta)

minosTrophies.recomputing = false