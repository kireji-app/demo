desktop.menuElement.setAttribute("style", "--menu-tween: 1")
document.body.classList.add("menu-open")
desktop.menuElement.onblur = async () => await part.parent[LAYER].setLayer(LAYER, 1n, true)
desktop.menuElement.focus()