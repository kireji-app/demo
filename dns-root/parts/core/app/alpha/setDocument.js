inherit.container

part.container.innerHTML = await part.resolve("body.html")
part.link = part.container.querySelector('a[href="$1"]')

app.listen(part.id, part.onstatechange)

inherit.styleSheet.replaceSync(await part.resolve("style.css"))