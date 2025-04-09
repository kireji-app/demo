EVENT.preventDefault()
EVENT.stopPropagation()

const wallpaperHost = EVENT.target.querySelector(".label").textContent

if (document.fullscreenElement)
 desktop.pendingHost = wallpaperHost
else
 desktop.crossOriginGo(wallpaperHost)