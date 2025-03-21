if (document.activeElement === part.menuElement)
 desktop.menuElement.blur()

desktop.menuButton.onclick = undefined
desktop.menuElement.removeAttribute("style")

if (desktop.menuButtonTimeout) {
 clearTimeout(desktop.menuButtonTimeout)
 delete desktop.menuButtonTimeout
}

document.body.classList.add("menu-open")
document.body.appendChild(desktop.menuElement)