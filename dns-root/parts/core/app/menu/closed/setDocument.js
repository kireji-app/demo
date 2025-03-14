console.log("SET " + part.host)

inherit.menu.setAttribute("style", "--menu-tween: 0")
inherit.menuButton

if (part.menuButtonTimeout) clearTimeout(part.menuButton)

part.menuButtonTimeout = setTimeout(() => {
 part.menuButton.onclick = () => part.parent.setLayer(LAYER, 1n)
}, 120)