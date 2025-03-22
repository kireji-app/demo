desktop.menuElement.setAttribute("style", "--menu-tween: 0")

if (desktop.menuButtonTimeout)
 clearTimeout(desktop.menuButtonTimeout)

desktop.menuButtonTimeout = setTimeout(() => {
 desktop.menuButton.onclick = async () => await part.parent[LAYER].setLayer(LAYER, 1n, true)
}, 120)

document.body.classList.remove("menu-open")
desktop.menuElement.remove()