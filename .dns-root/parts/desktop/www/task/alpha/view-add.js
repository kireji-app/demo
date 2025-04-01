inherit.container

part.container.innerHTML = part.render("body.html")
part.link = part.container.querySelector('a[href="$1"]')

inherit.styleSheet.replaceSync(part.render("style.css"))