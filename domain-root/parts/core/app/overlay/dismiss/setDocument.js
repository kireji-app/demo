inherit.overlay.setAttribute("style", "--overlay-tween: 0.5")

part.pendingFrame = requestAnimationFrame(() => {
 delete part.pendingFrame
 part.parent.setLayer(layer, 0n)
})