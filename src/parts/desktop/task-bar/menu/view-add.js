menu.element = Q("task-menu") ?? (() => {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = menu["menu.html"]
 return offscreen.querySelector("task-menu")
})()

menu.button = Q("menu-button")