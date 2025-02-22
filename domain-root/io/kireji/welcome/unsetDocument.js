part.container.innerHTML = ""
delete part.container

part.styleSheet.replaceSync("")
delete part.styleSheet

app.unlisten(part.id)