if (part.frameRequest)
 cancelAnimationFrame(part.frameRequest)

document.adoptedStyleSheets.pop()
document.adoptedStyleSheets.pop()
app.throttleDuration = part.oldThrottleDuration
part.container.replaceWith(part.oldMain)

app.homeButton.onclick = part.oldonclick
delete part.oldonclick
app.homeIcon = part.oldicon
app.homeLabel.before(app.homeIcon)
delete part.oldicon
app.homeLabel.textContent = part.oldhomelabel
delete part.oldhomelabel

delete part.frameRequest
delete part.styleSheet
delete part.oldSheets
delete part.oldThrottleDuration
delete part.oldMain
delete part.container