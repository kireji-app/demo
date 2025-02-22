inherit.overlay.setAttribute("style", "--overlay-tween: 1")
part.overlay.onblur = () => part.parent.setLayer(layer, 3n)
part.overlay.focus()