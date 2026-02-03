function createCategoryHTML(category) {
 const trophies = []

 for (const trophy of category)
  trophies.push(`<button ${minosTrophyModal.pointAttr("select", category.key, trophy.key)} class="item ${minosTrophies.earned.has(trophy) ? "earned" : ""}"><span class=label>${trophy.description}</span></button>`)

 categories.push(`<section class=category><h3>${category.title}</h3><div class=trophies>${trophies.join("")}</div></section>`)
}

const categories = []

// TODO: put these in canonical order.

createCategoryHTML(minosTrophies.basic)
createCategoryHTML(minosTrophies.wins)
createCategoryHTML(minosTrophies.moveLimit)
createCategoryHTML(minosTrophies.cash)
createCategoryHTML(minosTrophies.createA)
createCategoryHTML(minosTrophies.trades)
createCategoryHTML(minosTrophies.special)
createCategoryHTML(minosTrophies.meta)

return `<h2><span class=label>Trophies</span><flex-spacer></flex-spacer><button ${minosModal.pointAttr("close")}>✕</button></h2><div id=categories>${minosTrophyModal.scroller.wrap(categories.join(""))}</div>`