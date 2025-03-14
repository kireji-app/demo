if (document.activeElement === part.menu) part.menu.blur()
console.log("UNSET " + part.host)
part.menuButton.onclick = undefined
part.menu.removeAttribute("style")
delete part.menu
if (part.menuButtonTimeout) clearTimeout(part.menuButton)