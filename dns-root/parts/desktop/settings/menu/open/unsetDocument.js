if (document.activeElement === desktop.menuElement)
 desktop.menuElement.blur()

desktop.menuElement.onblur = undefined
desktop.menuElement.removeAttribute("style")