inherit.menu.setAttribute("style", "--menu-tween:0.5")

part.pendingFrame = requestAnimationFrame(() => {
 delete part.pendingFrame
 part.parent.setLayer(LAYER, 0n)
})
console.log("SET " + part.host)