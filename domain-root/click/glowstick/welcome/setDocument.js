const href = await app.stageState(part.parent, part.parent["library.glowstick.click"].offset, true)
inherit.container.innerHTML = read("body.html").replace("$1", href).replace("$2", href)
inherit.styleSheet.replaceSync(Core.createType("lander.core.parts").read("app.css"))