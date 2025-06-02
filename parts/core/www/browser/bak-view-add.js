part.container = element(part[".."].container, "section")
part.container.setAttribute("id", "browser")

part.heading = element(part.container, "h2")

part.backButton = svg(part.heading, "M -0.3 0 L 0.3 0.5 M 0.3 -0.5 L -0.3 0")
part.backButton.onclick = () => {
 debug('do nav back')
}

part.forwardButton = svg(part.heading, "M 0.3 0 L -0.3 0.5 M -0.3 -0.5 L 0.3 0")
part.forwardButton.onclick = () => {
 debug('do nav forward')
}

part.refreshButton = svg(part.heading, "M 0.5 0 A 0.5 0.5 0 1 1 0 -0.5 M 0 -0.2 L 0.3 -0.45 L 0 -0.7")
part.refreshButton.onclick = () => {
 debug('do nav refresh')
}

part.addressBar = element(part.heading, "input")
part.addressBar.setAttribute("type", "url")

part.menuButton = svg(part.heading, "M 0 0.5 L 0 0.5 M 0 0 L 0 0 M 0 -0.5 L 0 -0.5")
part.menuButton.onclick = () => {
 debug('do nav menu')
}