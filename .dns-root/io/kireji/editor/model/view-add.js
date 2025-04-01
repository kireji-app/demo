inherit.container
inherit.toolbar

part.label = element(part.toolbar, "label")
part.label.innerHTML = "Grammar model:"
part.label.setAttribute("for", "pick-model")

part.select = element(part.toolbar, "select")
part.select.setAttribute("name", "pick-model")
part.select.onchange = () => part.set(part.offsets[part.select.selectedIndex])

for (const subpart of part)
 element(part.select, "option").innerHTML = subpart.key

part.randomButton = element(part.toolbar, "button")
part.randomButton.innerHTML = "🍀 Random"
part.randomButton.onclick = () => console.log(part.shuffleRoute)