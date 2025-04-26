EVENT.preventDefault()
EVENT.stopPropagation()

const themeHost = EVENT.target.getAttribute("href").slice(8)

if (document.fullscreenElement)
 user.pendingHost = themeHost
else
 user.crossOriginGo(themeHost)