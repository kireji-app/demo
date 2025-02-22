if (document.activeElement === part.menu) part.menu.blur()

app.unlisten(part.id)
delete part.menuButton

part.menu.removeAttribute("style")
delete part.menu