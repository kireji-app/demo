inherit.menu.setAttribute("style", "--menu-tween: 1")
console.log("SET " + part.host)
part.menu.onblur = async () => {
 console.log('blurring ' + part.parent.host)
 await part.parent.setLayer(LAYER, 3n)
}
part.menu.focus()