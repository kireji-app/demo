inherit.menu.setAttribute("style", "--menu-tween: 0")
inherit.menuButton

if (part.menuButtonTimeout) clearTimeout(part.menuButton)
part.menuButtonTimeout = setTimeout(() => part.menuButton.onclick = () => app[part.parent.framework.host].setLayer(LAYER, 1n), 120)