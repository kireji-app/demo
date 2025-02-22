this.toolbar = this.parent.toolbar
this.container = this.parent.container

this.label = element(this.toolbar, "label")
this.label.innerHTML = "Grammar model:"
this.label.setAttribute("for", "pick-model")

this.select = element(this.toolbar, "select")
this.select.setAttribute("name", "pick-model")
this.select.onchange = () => this.setLayer(layer, this[this.select.selectedIndex].offset)
for (const instance of this) element(this.select, "option").innerHTML = instance.name

this.randomAnchor = element(this.toolbar, "a")
this.randomAnchor.innerHTML = "🍀 Random"