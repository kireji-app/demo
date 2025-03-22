desktop.menuElement.setAttribute("style", "--menu-tween: " + (Number(part.state[LAYER]) / Number(part.size)))

if (part.pendingFrame)
 cancelAnimationFrame(part.pendingFrame)

part.pendingFrame = requestAnimationFrame(async () => {
 delete part.pendingFrame
 const target = part.state[LAYER] < part.size - 1n ? part : part.parent[LAYER]
 await target.setLayer(LAYER, 1n, true)
})