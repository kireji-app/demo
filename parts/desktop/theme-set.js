EVENT.preventDefault()
EVENT.stopPropagation()

if (document.fullscreenElement) {
 _.themeHost = LINK.getAttribute("href").slice(8)
 desktop.theme = getPartFromDomains(_.themeHost.split("."))

 // TODO: replace these cross-references with parts which do not count towards parent cardinality but call the same view functions as the part it syndicates.
 // Alternatively, have a view listener. When the given part should update, we're calling all attached listeners. Likewise for add and remove.
 const iconDataURI = desktop.theme.render({
  request: "theme.png",
  fallback: "data:image/png;base64,iVBORw0KGgo=",
  format: "datauri"
 })

 document.querySelector(`link[rel="manifest"]`).setAttribute('href', worker["link-manifest.txt"])
 document.querySelector(`link[rel="icon"]`).setAttribute('href', iconDataURI)
 document.querySelector(`link[rel="apple-touch-icon"]`).setAttribute('href', iconDataURI)
 document.getElementById("user-css").innerHTML = _["inline.css"]
 document.getElementById("era-css").innerHTML = desktop.era["inline.css"]
 document.getElementById("color-css").innerHTML = desktop.color["inline.css"]
 document.getElementById("theme-css").innerHTML = desktop.theme["theme.css"]
 document.head.title = desktop.theme.title ?? "Untitled App"
 document.querySelector("body>wallpaper-").innerHTML = desktop["wallpaper.html"]
 document.querySelector("body>task-bar").outerHTML = desktop["task-bar"]["inline.html"]
}
else {
 const themeHost = LINK.getAttribute("href").slice(8)
 desktop.menu.crossOriginGo(themeHost)
}