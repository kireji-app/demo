inherit.menu.setAttribute("style", "--menu-tween: 0")

inherit.menuButton
app.listen(part.id, async () => {
 part.menuButton.setAttribute("href", await app.stageState(part.parent, 1n, true))
})