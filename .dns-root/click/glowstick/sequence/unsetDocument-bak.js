if (part.frameRequest)
 cancelAnimationFrame(part.frameRequest)

document.adoptedStyleSheets.pop()
document.adoptedStyleSheets.pop()
desktop.agent.throttleDuration = part.originalThrottleDuration
part.container.replaceWith(part.oldMain)

delete part.frameRequest
delete part.styleSheet
delete part.oldSheets
delete part.originalThrottleDuration
delete part.oldMain
delete part.container