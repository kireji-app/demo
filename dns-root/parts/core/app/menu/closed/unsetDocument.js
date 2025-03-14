if (document.activeElement === part.menu)
 part.menu.blur()

part.menuButton.onclick = undefined
part.menu.removeAttribute("style")
delete part.menu

if (part.menuButtonTimeout)
 clearTimeout(part.menuButton)