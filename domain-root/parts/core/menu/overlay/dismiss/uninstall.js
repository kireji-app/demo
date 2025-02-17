if (this.pendingFrame) {
 cancelAnimationFrame(this.pendingFrame)
 delete this.pendingFrame
}

this.overlay.removeAttribute("style")
delete this.overlay