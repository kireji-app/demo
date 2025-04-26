feature.button = document.getElementById("fullscreen-button")

if (!feature.button) {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = feature.render("inline.html")
 feature.button = offscreen.querySelector("#fullscreen-button")
}

document.addEventListener('fullscreenchange', () => document.fullscreenElement || (user.doKioskNavigation(user.pendingHost), delete user.pendingHost));