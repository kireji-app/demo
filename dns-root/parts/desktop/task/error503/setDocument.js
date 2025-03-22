const icon_uri = await part.task.resolve("icon.uri")
inherit.container.innerHTML = `<h1>503</h1><span id=float><img class=app-icon src="${Framework.version}${icon_uri}"><span class=thin>${part.task.niceName ?? part.task.host}</span><span>is coming soon.</span></span>`
inherit.styleSheet.replaceSync(await part.resolve("style.css"))