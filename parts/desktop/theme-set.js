EVENT.preventDefault()
EVENT.stopPropagation()

const themeHost = LINK.getAttribute("href").slice(8)

if (document.fullscreenElement)
 Object.defineProperty(_, "pendingHost", { value: themeHost, configurable: true, writable: true })
else
 desktop.menu.crossOriginGo(themeHost)