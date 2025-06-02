feature.button = document.getElementById("fullscreen-button")

if (!feature.button) {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = feature.render("inline.html")
 feature.button = offscreen.querySelector("#fullscreen-button")
}

document.addEventListener('fullscreenchange', () => document.fullscreenElement || (root.parts.user.doKioskNavigation(root.parts.user.pendingHost), delete root.parts.user.pendingHost));