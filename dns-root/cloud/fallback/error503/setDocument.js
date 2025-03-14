const icon_uri = await app.resolve("icon.uri", "fallback-icon.svg")
inherit.container.innerHTML = `<h1>503</h1><span id=float><img class=app-icon src="${icon_uri}"><span class=thin>${app.niceName ?? app.host}</span><span>is coming soon.</span></span>`
inherit.styleSheet.replaceSync(await part.resolve("style.css"))