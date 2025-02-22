inherit.menu.setAttribute("style", "--menu-tween: 1")
part.menu.onblur = async () => await part.parent.setLayer(layer, 3n)
part.menu.focus()