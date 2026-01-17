menu.element = document.querySelector("task-menu") ?? (() => {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = menu["menu.html"]
 return offscreen.querySelector("task-menu")
})()

menu.button = document.querySelector("menu-button")