EVENT.preventDefault()
EVENT.stopPropagation()

const themeHost = LINK.getAttribute("href").slice(8)
desktop.menu.crossOriginGo(themeHost)