console.log("UNSET " + part.host)

if (document.activeElement === part.menu)
 part.menu.blur()

part.menu.onblur = undefined
part.menu.removeAttribute("style")
delete part.menu