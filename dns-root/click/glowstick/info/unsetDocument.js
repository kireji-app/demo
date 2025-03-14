// part.backButton.remove()
delete part.backButton

part.popup.remove()
delete part.popup

app.homeButton.onclick = part.onclickBackup
delete part.onclickBackup
app.homeIcon = part.homeIconBackup
app.homeLabel.before(app.homeIcon)
delete part.homeIconBackup
app.homeLabel.textContent = part.homeLabelBackup
delete part.homeLabelBackup

delete part.container
delete part.releaseDate
delete part.niceName
delete part.released
delete part.description

app.unlisten(part.id)