share.button = document.getElementById("share-button")

if (!share.button) {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = share.render("inline.html")
 share.button = offscreen.querySelector("#share-button")
}