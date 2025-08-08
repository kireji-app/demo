_.noop(EVENT)

const button = document.getElementById("update-control")
const label = button.querySelector(".label")

if (update.nonce) {

 document.body.classList.add("upgrading")
 label.textContent = "Upgrading..."
 // Allow screen to gracefully fade out before navigating.
 setTimeout(() => {
  localStorage.setItem(update.nonce, serialize(_.model))
  location.href = update.nonce
 }, 500)

} else {

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
  .then(response => response.json())
  .then(({ version, nonceTemplate }) => {
   if (update.isNewerVersion(version)) {
    update.nonce = nonceTemplate.replace("$1", location.origin).replace("$2", Date.now())
    label.textContent = "Upgrade to " + version
   } else showTemporaryMessage("Already up to date")
  })
  .catch(e => showTemporaryMessage("An Error Occurred"))

}