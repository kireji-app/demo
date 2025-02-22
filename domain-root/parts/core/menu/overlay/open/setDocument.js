this.overlay = this.parent.overlay
this.overlay.setAttribute("style", "--overlay-tween: 1")
this.overlay.onblur = () => this.parent.setLayer(layer, 3n)
this.overlay.focus()