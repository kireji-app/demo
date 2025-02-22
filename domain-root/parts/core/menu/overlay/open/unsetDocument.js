if (document.activeElement === this.overlay)
 this.overlay.blur()

this.overlay.onblur = undefined
this.overlay.removeAttribute("style")
delete this.overlay