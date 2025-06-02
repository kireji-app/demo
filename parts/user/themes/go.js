EVENT.preventDefault()
EVENT.stopPropagation()

const themeHost = LINK.getAttribute("href").slice(8)
if (document.fullscreenElement)
 root.parts.user.pendingHost = themeHost
else
 root.parts.desktop.menu.crossOriginGo(themeHost)