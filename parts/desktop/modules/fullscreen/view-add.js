module.button = document.getElementById("fullscreen-button")

if (!module.button) {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = module.render("inline.html")
 module.button = offscreen.querySelector("#fullscreen-button")
}

document.addEventListener('fullscreenchange', () => document.fullscreenElement || (_.parts.user.doKioskNavigation(_.parts.user.pendingHost), delete _.parts.user.pendingHost));