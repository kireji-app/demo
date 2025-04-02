if (!hydration.supported)
 throw "Unrecoverable: call to view function without the necessary feature support."

// Debug.
hydration.simulateSlowPerformance()

worker.promise.then(() => {
 worker.manifestLink = document.querySelector('link[rel="manifest"]')
 worker.manifestLink.href ??= "/manifest.json!"
})

document.title = desktop.host
desktop.wallpaper = document.querySelector("wallpaper-")
desktop.taskbar = document.querySelector("taskbar-")
desktop.menuButton = document.querySelector("menu-button")
desktop.taskbarSpacer = desktop.taskbar.querySelector("flex-spacer")
desktop.sidebar = desktop.menuElement.querySelector("sidebar-")
desktop.wallpapersSection = document.getElementById("wallpapers")
desktop.settingsSection = document.getElementById("settings")
desktop.colorModeButton = document.getElementById("color-mode")
desktop.vintageModeButton = document.getElementById("vintage-mode")
desktop.colorModeHandle = desktop.colorModeButton.querySelector(".handle")
desktop.colorModeLabel2 = document.getElementById("label2")
desktop.styleNode = document.getElementById("inline-style")

if (!hydration.hydrated)
 hydration.finish()