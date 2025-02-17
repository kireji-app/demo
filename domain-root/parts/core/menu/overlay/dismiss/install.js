this.overlay = this.parent.overlay
this.overlay.setAttribute("style", "--overlay-tween: 0.5")

this.pendingFrame = requestAnimationFrame(() => {
 delete this.pendingFrame
 this.parent.setState(0n)
})