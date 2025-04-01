inherit.container

part.container.innerHTML = render("body.html")
part.link = part.container.querySelector('a[href="$1"]')

inherit.styleSheet.replaceSync(render("style.css"))