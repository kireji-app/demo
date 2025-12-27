_.noop(POINTER_EVENT)

const button = document.getElementById("update-control")
const label = button.querySelector(".label")

if (update.version) {
 location.href = `${location.origin}/${update.version}/${encodeSegment(_.routeID)}/?from=${_.version}`
 return
}

function showTemporaryMessage(msg) {
 const labelContentCache = label.textContent
 button.setAttribute("inert", "")
 label.textContent = msg
 setTimeout(() => {
  if (button) {
   button.removeAttribute("inert")
   label.textContent = labelContentCache
  }
 }, 5000)
}

fetch(`${location.origin}/-v`)
 .then(response => response.text())
 .then(version => {
  if (update.isNewerVersion(version)) {
   update.version = version
   label.textContent = "Upgrade to " + version
  } else showTemporaryMessage("Already up to date")
 })
 .catch(e => {
  error(e)
  showTemporaryMessage("An Error Occurred")
 })