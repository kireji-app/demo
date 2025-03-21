desktop.menuElement.setAttribute("style", "--menu-tween: 0")

if (desktop.menuButtonTimeout)
 clearTimeout(desktop.menuButtonTimeout)

desktop.menuButtonTimeout = setTimeout(() => {
 desktop.menuButton.onclick = () => part.parent.increment(LAYER, 1n)
}, 120)

document.body.classList.remove("menu-open")
desktop.menuElement.remove()