// Some HTML is always server-rendered, making this a hydrating task.
const manifestLink = document.querySelector('link[rel="manifest"]')

if (!manifestLink.hasAttribute("href"))
 manifestLink.setAttribute("href", "/manifest.json")

warn("render all inline images here")