desktop.menuElement.setAttribute("style", "--menu-tween: 0")

if (desktop.menuButtonTimeout)
 clearTimeout(desktop.menuButtonTimeout)

desktop.menuButton.onclick = () => part.parent.set(1n, true)

document.body.classList.remove("menu-open")
desktop.menuElement.remove()