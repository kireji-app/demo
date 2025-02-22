app.unlisten(part.id)

part.styleSheet.replaceSync("")
delete part.styleSheet

part.container.innerHTML = ""
delete part.styleSheet