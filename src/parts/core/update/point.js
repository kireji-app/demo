pointer.handle({
 click() {

  const button = Q("#update-control")
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
   .catch(fetchError => {
    error(fetchError)
    showTemporaryMessage("An Error Occurred")
   })
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})