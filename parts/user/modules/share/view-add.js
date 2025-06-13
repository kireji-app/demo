module.button = document.getElementById("share-button")

if (!module.button) {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = module.render("inline.html")
 module.button = offscreen.querySelector("#share-button")
}