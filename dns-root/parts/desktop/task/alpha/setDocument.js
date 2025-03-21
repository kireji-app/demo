inherit.container

part.container.innerHTML = (await part.resolve("body.html")).replace("/$/", Framework.version)
part.link = part.container.querySelector('a[href="$1"]')

inherit.styleSheet.replaceSync(await part.resolve("style.css"))