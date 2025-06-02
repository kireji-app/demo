root.parts.desktop.menu.element = document.querySelector("task-menu") ?? (() => {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = menu["menu.html"]
 return offscreen.querySelector("task-menu")
})()

root.parts.desktop.menu.settingsSection = root.parts.desktop.menu.element.querySelector("#settings")
root.parts.desktop.menu.themeSection = root.parts.desktop.menu.element.querySelector("#theme-control")