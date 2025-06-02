// This base HTML is always server-rendered, making this a hydrating task.

if (!hydration.supported)
 throw "Unrecoverable: call to the root view function without the necessary feature support."

user.manifestLink = document.querySelector('link[rel="manifest"]')
user.manifestLink.href ??= "/manifest.json!"
user.wallpaper = document.querySelector("wallpaper-")
user.taskbar = document.querySelector("task-bar")
user.menuButton = document.querySelector("menu-button")
user.taskbarSpacer = root.parts.user.taskbar.querySelector("flex-spacer")