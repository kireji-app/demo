if (document.activeElement === part.overlay) part.overlay.blur()

part.menuButton.onclick = undefined
delete part.menuButton

part.overlay.removeAttribute("style")
delete part.overlay