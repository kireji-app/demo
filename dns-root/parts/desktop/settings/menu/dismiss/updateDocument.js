desktop.menuElement.setAttribute("style", "--menu-tween: " + (1 - (Number(part.state[LAYER]) + 1) / Number(part.size)))

if (part.pendingFrame)
 cancelAnimationFrame(part.pendingFrame)

part.pendingFrame = requestAnimationFrame(async () => {
 delete part.pendingFrame
 const target = part.state[LAYER] < part.size - 1n ? part : part.parent[LAYER]
 await target.setLayer(LAYER, 1n, true)
})