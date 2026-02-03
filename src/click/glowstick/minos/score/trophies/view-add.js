if (!hydrated) {
 minosTrophies.recompute()

 minosTrophies.viewedEarned.clear()
 for (const trophy of minosTrophies.earned)
  minosTrophies.viewedEarned.add(trophy)
} else throw `not handled yet`