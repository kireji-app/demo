if (part.labelTimeout) {
 clearTimeout(part.labelTimeout)
 delete part.labelTimeout
}

delete part.setColorMode

delete desktop.colorModeButton.onclick