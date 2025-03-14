if (part.pendingFrame) {
 cancelAnimationFrame(part.pendingFrame)
 delete part.pendingFrame
}

part.menu.removeAttribute("style")
delete part.menu
console.log("UNSET " + part.host)