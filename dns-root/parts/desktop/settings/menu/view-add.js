menu.element = document.querySelector("task-menu")

if (!menu.element) {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = menu.render("inline.html")
 menu.element = offscreen.querySelector("task-menu")
}