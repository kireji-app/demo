facet.button = document.getElementById("fullscreen-button")

if (!facet.button) {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = facet.render("inline.html")
 facet.button = offscreen.querySelector("#fullscreen-button")
}

document.addEventListener('fullscreenchange', () => document.fullscreenElement || (_.doKioskNavigation(_.pendingHost), delete _.pendingHost));