EVENT.preventDefault()
EVENT.stopPropagation()

const themeHost = EVENT.target.getAttribute("href").slice(8)

if (document.fullscreenElement)
 desktop.pendingHost = themeHost
else
 desktop.crossOriginGo(themeHost)