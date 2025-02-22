if (part.labelTimeout) {
 clearTimeout(part.labelTimeout)
 delete part.labelTimeout
}

delete part.setColorMode

delete part.colorModeLabel.innerText
delete part.colorModeButton.onclick
delete part.colorModeStyleSheet