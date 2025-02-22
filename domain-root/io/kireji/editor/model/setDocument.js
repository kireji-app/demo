inherit.container
inherit.toolbar

part.label = element(part.toolbar, "label")
part.label.innerHTML = "Grammar model:"
part.label.setAttribute("for", "pick-model")

part.select = element(part.toolbar, "select")
part.select.setAttribute("name", "pick-model")
part.select.onchange = () => part.setLayer(layer, part[part.select.selectedIndex].offset)
for (const subpart of part) element(part.select, "option").innerHTML = subpart.name

part.randomAnchor = element(part.toolbar, "a")
part.randomAnchor.innerHTML = "🍀 Random"