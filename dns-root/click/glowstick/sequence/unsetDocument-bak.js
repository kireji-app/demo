if (part.frameRequest)
 cancelAnimationFrame(part.frameRequest)

document.adoptedStyleSheets.pop()
document.adoptedStyleSheets.pop()
app.throttleDuration = part.oldThrottleDuration
part.container.replaceWith(part.oldMain)

app.homeButton.onclick = part.onclickBackup
delete part.onclickBackup
app.homeIcon = part.homeIconBackup
app.homeLabel.before(app.homeIcon)
delete part.homeIconBackup
app.homeLabel.textContent = part.homeLabelBackup
delete part.homeLabelBackup

delete part.frameRequest
delete part.styleSheet
delete part.oldSheets
delete part.oldThrottleDuration
delete part.oldMain
delete part.container