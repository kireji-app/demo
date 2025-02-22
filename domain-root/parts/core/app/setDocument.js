document.title = app.host

// Create a container for app content.
part.containerHost = element(document.body, "main")
part.containerHost.tabIndex = 1
part.container = part.containerHost.attachShadow({ mode: "open" })
part.styleSheet = new CSSStyleSheet()
part.container.adoptedStyleSheets.push(part.styleSheet)

// Create the toolbar.
part.toolbar = element(document.body, "nav")
part.toolbar.setAttribute("id", "toolbar")

part.homeButton = element(part.toolbar, "a")
part.homeButton.innerHTML = `<h1><img id=appicon src=icon.svg /><span class=label>${app.host}</span></h1>`
app.listen(part.id, async () => {
 part.homeButton.setAttribute("href", await app.stageState(part[0], 0n, true))
})
part.homeButton.setAttribute("id", "home")

part.toolbarSpacer = element(part.toolbar, "span")
part.toolbarSpacer.setAttribute("class", "spacer")

const showExpirimentalButtons = false

if (showExpirimentalButtons && navigator.share) {
 part.shareButton = element(part.toolbar, "button")
 part.shareButton.innerText = "➦"
 part.shareButton.setAttribute("id", "share")
 part.shareButton.onclick = () => navigator.share({ title: document.title, url: location.href }).catch(e => e.name == "AbortError" || console.error(e))
}

part.menuButton = element(part.toolbar, "a")
part.menuButton.setAttribute("class", "btn")
part.menuButton.innerText = "≡"

if (showExpirimentalButtons && document.fullscreenEnabled) {
 part.fullscreenButton = element(part.toolbar, "button")
 part.fullscreenButton.innerText = "⛶"
 part.fullscreenButton.setAttribute("id", "fullscreen")
 part.fullscreenButton.onclick = () => {
  if (!document.fullscreenElement) {
   if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen()
   } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen()
   } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen()
   }
  } else {
   if (document.exitFullscreen) {
    document.exitFullscreen()
   } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
   } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
   }
  }
 }
}

let nestedToolbar, shadow

part.getNestedToolbar = () => {
 if (!nestedToolbar) {
  nestedToolbar = document.createElement("nested-toolbar")
  part.toolbarSpacer.before(nestedToolbar)
  nestedToolbar.setAttribute("id", "nested")
  shadow = nestedToolbar.attachShadow({ mode: "open" })
  shadow.styleSheet = new CSSStyleSheet()
  shadow.adoptedStyleSheets.push(shadow.styleSheet)
 }
 return shadow
}

part.destroyNestedToolbar = () => {
 nestedToolbar.remove()
 nestedToolbar = shadow = undefined
}

part.menu = element(document.body, "menu")
part.menu.setAttribute("id", "menu")
part.menu.tabIndex = 1

part.sidebar = element(part.menu, "div")
part.sidebar.setAttribute("id", "sidebar")

part.appsSection = element(part.sidebar, "ul")
part.appsSection.setAttribute("id", "apps")
// part.appsTitle = element(part.appsSection, "h2")
// part.appsTitle.innerText = "Applications"
part.appNodes = part.parent.reduce((nodes, { host: appHost }) => {
 const that = part.parent[appHost in part.parent ? appHost : 0]
 nodes[appHost] = element(part.appsSection, "li")
 nodes[appHost].setAttribute("class", "applink")
 nodes[appHost].innerHTML = `<span class=label>${appHost}</span><img src=https://${appHost}/icon.svg />`
 if (appHost === app.host) nodes[appHost].setAttribute("data-here", "true")
 else nodes[appHost].onclick = e => {
  e.preventDefault()
  let thatState = 0n
  for (const host of read("preferences.host").split(/\s+/g)) {
   if (host in part && host in that) thatState += part[host].state[layer] * that[host].conjunctionDivisor
  }
  location = "https://" + appHost + "#" + app.encodeState(thatState)
 }
 return nodes
}, {})

part.settingsSection = element(part.sidebar, "section")
part.settingsSection.setAttribute("id", "settings")
part.tagsLine = element(part.settingsSection, "span")
part.tagsLabel = element(part.tagsLine, "span")
part.tagsLabel.innerText = "Version"
part.tags = element(part.tagsLine, "span")
part.tags.setAttribute("id", "tags")
part.tagElements = []

for (const tag of Core.tags) {
 const tagElement = element(part.tags, "span")
 part.tagElements.push(tagElement)
 tagElement.innerHTML = tag
}

part.colorModeButton = element(part.settingsSection, "span")
part.colorModeButton.setAttribute("id", "colormode")
part.colorModeLabel = element(part.colorModeButton, "span")
part.colorModeBase = element(part.colorModeButton, "span")
part.colorModeBase.setAttribute("class", "base")
part.colorModeHandle = element(part.colorModeBase, "span")
part.colorModeHandle.setAttribute("class", "handle")

const globalCSS = read("style.css")
const customCSS = read("menu.css") ?? ""
const staticStyleSheet = new CSSStyleSheet()
staticStyleSheet.replaceSync(globalCSS + customCSS)
part.colorModeStyleSheet = new CSSStyleSheet()

document.adoptedStyleSheets.push(
 staticStyleSheet,
 part.colorModeStyleSheet,
)