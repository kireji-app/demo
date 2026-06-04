function createCategoryHTML(category) {
 const trophies = []

 for (const trophy of category)
  trophies.push(`<div class="item ${MinosTrophies.earned.has(trophy) ? "earned" : ""}"><span class=label>${trophy.description} +${trophy.reward} points</span></div>`)

 categories.push(`<section class=category><h3>${category.title}</h3><div class=trophies>${trophies.join("")}</div></section>`)
}

const categories = []

createCategoryHTML(MinosTrophies.basic)
createCategoryHTML(MinosTrophies.wins)
createCategoryHTML(MinosTrophies.moveLimit)
createCategoryHTML(MinosTrophies.points)
createCategoryHTML(MinosTrophies.createA)
createCategoryHTML(MinosTrophies.shop)
createCategoryHTML(MinosTrophies.special)
createCategoryHTML(MinosTrophies.meta)

return `<h2><span class=label>Trophies</span><flex-spacer></flex-spacer><button ${MinosModal.pointAttr("close")}>✕</button></h2><div id=categories>${MinosTrophiesModal.scroller.wrap(categories.join(""))}</div>`