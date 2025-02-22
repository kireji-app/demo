if (part.pendingFrame) {
 cancelAnimationFrame(part.pendingFrame)
 delete part.pendingFrame
}

part.overlay.removeAttribute("style")
delete part.overlay