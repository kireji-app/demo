EVENT.preventDefault()
EVENT.stopPropagation()

const themeHost = LINK.getAttribute("href").slice(8)

if (document.fullscreenElement)
 root.parts.user.pendingHost = themeHost
else
 desktop.menu.crossOriginGo(themeHost)