if (document.activeElement === part.overlay)
 part.overlay.blur()

part.overlay.onblur = undefined
part.overlay.removeAttribute("style")
delete part.overlay