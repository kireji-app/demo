// The base HTML is always server-rendered, making this a hydrating task.

if (!production) {
 const manifestLink = Q('link[rel="manifest"]')

 if (!manifestLink.hasAttribute("href"))
  manifestLink.setAttribute("href", `/${_.version}/manifest.json`)
}

const faviconLinks = document.querySelectorAll('link.favicon')

for (const faviconLink of faviconLinks)
 faviconLink.setAttribute("href", `data:image/png;base64,${_.application["part.png"]}`)

Q("#img-css").innerHTML ||= _["images.css"]
Q("#early-img-css")?.remove()

// Prevent normal click events to ensure the pointerdown event always takes precedence.
document.addEventListener("click", event => {
 event.preventDefault()
 event.stopPropagation()
}, { capture: true })