fullscreen.button = document.getElementById("fullscreen-button")

if (!fullscreen.button) {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = fullscreen.render("inline.html")
 fullscreen.button = offscreen.querySelector("#fullscreen-button")
}

// TODO: Check document.fullscreenEnabled