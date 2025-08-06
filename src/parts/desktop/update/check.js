_.noop(EVENT)
fetch(`${location.origin}/-v`).then(response => response.json()).then(({ version, nonce }) => {
 const serverVersion = version.split(".")
 const clientVersion = _.version.split(".")
 const button = document.getElementById("update-control")
 const originalClickListener = button.getAttribute("onclick")
 const originalTextContent = button.textContent
 if (serverVersion[0] > clientVersion[0] || serverVersion[1] > clientVersion[1] || serverVersion[2] > clientVersion[2]
 ) {
  button.setAttribute("onclick", `_.parts.desktop.update.upgrade(event, "${nonce.replace("$1", location.origin + "/" + version)}")`)
  button.querySelector(".label").textContent = "Upgrade to " + version
 } else {
  button.querySelector(".label").textContent = "Already up to date"
  button.removeAttribute("onclick", `_.parts.desktop.update.upgrade(event, "${nonce.replace("$1", location.origin + "/" + version)}")`)
  setTimeout(() => {
   button.querySelector(".label").textContent = originalTextContent
   button?.setAttribute("onclick", originalClickListener)
  }, 5000)
 }
}).catch(e => {
 error(e)
})