if (part.pendingFrame) {
 cancelAnimationFrame(part.pendingFrame)
 delete part.pendingFrame
}

desktop.menuElement.removeAttribute("style")