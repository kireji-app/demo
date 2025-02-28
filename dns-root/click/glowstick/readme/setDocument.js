inherit.container

app.listen(part.id, async () => {
 // Tempororary. Do actual elements to prevent rebuild of html on every event.
 const href = await app.stageState(part.parent, part.parent["library.glowstick.click"].offset, true)
 part.container.innerHTML = read("body.html").replace("$1", href).replace("$2", href)
})

inherit.styleSheet.replaceSync(Framework.createType("lander.core.parts").framework.read("app.css"))