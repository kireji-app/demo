if (part.frameRequest)
 cancelAnimationFrame(part.frameRequest)

document.adoptedStyleSheets.pop()
document.adoptedStyleSheets.pop()
app.throttleDuration = part.oldThrottleDuration
part.container.replaceWith(part.oldMain)

delete part.frameRequest
delete part.styleSheet
delete part.oldSheets
delete part.oldThrottleDuration
delete part.oldMain
delete part.container