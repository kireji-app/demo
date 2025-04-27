// This base HTML is always server-rendered.

if (!hydration.supported)
 throw "Unrecoverable: call to view function without the necessary feature support."

// Debug.
hydration.simulateSlowPerformance(10000)

document.title = user.host
user.manifestLink = document.querySelector('link[rel="manifest"]')
user.manifestLink.href ??= "/manifest.json!"
user.wallpaper = document.querySelector("wallpaper-")
user.taskbar = document.querySelector("task-bar")
user.menuButton = document.querySelector("menu-button")
user.taskbarSpacer = user.taskbar.querySelector("flex-spacer")
user.sidebar = user.menuElement.querySelector("sidebar-")
user.themesSection = document.getElementById("themes")
user.settingsSection = document.getElementById("settings")
user.colorModeButton = document.getElementById("color-mode")
user.vintageModeButton = document.getElementById("vintage-mode")
user.colorModeHandle = user.colorModeButton.querySelector(".handle")
user.colorModeLabel2 = document.getElementById("label2")
user.styleNode = document.getElementById("inline-style")

if (!hydration.hydrated)
 hydration.finish()