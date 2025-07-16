// The base HTML is always server-rendered, making this a hydrating task.

const manifestLink = document.querySelector('link[rel="manifest"]')

if (!manifestLink.hasAttribute("href"))
 manifestLink.setAttribute("href", `/${_.version}/manifest.json`)

document.getElementById("img-css").innerHTML ||= _["images.css"]