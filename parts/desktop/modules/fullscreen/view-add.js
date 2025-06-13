module.button = document.getElementById("fullscreen-button")

if (!module.button) {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = module.render("inline.html")
 module.button = offscreen.querySelector("#fullscreen-button")
}

document.addEventListener('fullscreenchange', () => document.fullscreenElement || (root.parts.user.doKioskNavigation(root.parts.user.pendingHost), delete root.parts.user.pendingHost));