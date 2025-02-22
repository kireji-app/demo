inherit.container
app.listen(part.id, async () => {
 // Tempororary. Do actual elements to prevent rebuild of html on every event.
 const href = await app.stageState(part.parent, part.parent["library.glowstick.click"].offset, true)
 part.container.innerHTML = read("body.html").replace("$1", href).replace("$2", href)
})
inherit.styleSheet.replaceSync(Core.createType("lander.core.parts").core.read("app.css"))