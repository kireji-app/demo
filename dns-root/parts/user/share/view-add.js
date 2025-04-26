feature.button = document.getElementById("share-button")

if (!feature.button) {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = feature.render("inline.html")
 feature.button = offscreen.querySelector("#share-button")
}