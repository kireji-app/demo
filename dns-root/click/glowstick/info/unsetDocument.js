// part.backButton.remove()
delete part.backButton

part.popup.remove()
delete part.popup

app.homeButton.onclick = part.oldonclick
delete part.oldonclick
app.homeIcon = part.oldicon
app.homeLabel.before(app.homeIcon)
delete part.oldicon
app.homeLabel.textContent = part.oldhomelabel
delete part.oldhomelabel

delete part.container
delete part.releaseDate
delete part.niceName
delete part.released
delete part.description

app.unlisten(part.id)