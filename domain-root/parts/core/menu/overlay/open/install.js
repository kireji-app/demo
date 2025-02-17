this.overlay = this.parent.overlay
this.overlay.setAttribute("style", "--overlay-tween: 1")
this.overlay.onblur = () => this.parent.setState(3n)
this.overlay.focus()