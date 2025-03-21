desktop.menuElement.setAttribute("style", "--menu-tween: 1")
document.body.classList.add("menu-open")
desktop.menuElement.onblur = async () => await part.parent.increment(LAYER, 1n)
desktop.menuElement.focus()