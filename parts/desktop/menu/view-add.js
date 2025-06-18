desktop.menu.element = document.querySelector("task-menu") ?? (() => {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = desktop.menu["menu.html"]
 return offscreen.querySelector("task-menu")
})()

desktop.menu.settingsSection = desktop.menu.element.querySelector("#settings")
desktop.menu.themeSection = desktop.menu.element.querySelector("#theme-control")