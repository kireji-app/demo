document.title = desktop.host

// Create a container for task content.
desktop.containerHost = element(document.body, "desktop-")
desktop.containerHost.tabIndex = 1
desktop.container = desktop.containerHost.attachShadow({ mode: "open" })
desktop.styleSheet = new CSSStyleSheet()
desktop.container.adoptedStyleSheets.push(desktop.styleSheet)

// Create the taskbar.
desktop.taskbar = element(document.body, "taskbar-")

desktop.menuButton = element(desktop.taskbar, "button")
desktop.menuButton.setAttribute("class", "btn")
desktop.menuButton.setAttribute("id", "menu-button")
desktop.menuButton.innerText = "≡"

desktop.taskbarSpacer = element(desktop.taskbar, "span")
desktop.taskbarSpacer.setAttribute("class", "spacer")

if ((Framework.isDebug ? Framework.debugHost : location.host) !== "www.desktop.parts")
 desktop.taskbar.onclick = () => {
  if (Framework.isDebug) {
   worker.postMessage({ code: "setDebugHost", payload: "www.desktop.parts" })
   console.log('simulating ' + "https://www.desktop.parts" + location.pathname)
  } else location = "https://www.desktop.parts" + location.pathname
 }

desktop.showFullScreenControl = true
desktop.showShareButton = false

if (desktop.showShareButton && navigator.share) {
 desktop.shareButton = element(desktop.taskbar, "button")
 desktop.shareButton.innerText = "➦"
 desktop.shareButton.setAttribute("id", "share")
 desktop.shareButton.onclick = () => navigator.share({ title: document.title, url: location.href }).catch(e => e.name == "AbortError" || console.error(e))
}

if (desktop.showFullScreenControl && document.fullscreenEnabled) {
 desktop.fullscreenButton = element(desktop.taskbar, "button")
 desktop.fullscreenButton.innerText = "⛶"
 desktop.fullscreenButton.setAttribute("id", "fullscreen")
 desktop.fullscreenButton.setAttribute("class", "btn")
 desktop.fullscreenButton.onclick = () => {
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

desktop.getNestedToolbar = () => {
 if (!nestedToolbar) {
  nestedToolbar = document.createElement("nested-toolbar")
  desktop.taskbarSpacer.before(nestedToolbar)
  nestedToolbar.setAttribute("id", "nested")
  shadow = nestedToolbar.attachShadow({ mode: "open" })
  shadow.styleSheet = new CSSStyleSheet()
  shadow.adoptedStyleSheets.push(shadow.styleSheet)
 }
 return shadow
}

desktop.destroyNestedToolbar = () => {
 nestedToolbar.remove()
 nestedToolbar = shadow = undefined
}

desktop.menuElement = element(document.body, "menu")
desktop.menuElement.setAttribute("id", "menu")
desktop.menuElement.tabIndex = 1

document.body.classList.add("menu-open")

desktop.sidebar = element(desktop.menuElement, "div")
desktop.sidebar.setAttribute("id", "sidebar")

desktop.tasksSection = element(desktop.sidebar, "ul")
desktop.tasksSection.setAttribute("id", "tasks")

desktop.taskNodes = {}

for (const apexDomain of ["kireji.io", "core.parts", "ejaugust.com", "kireji.app", "orenjinari.com"]) {
 const key = "www." + apexDomain
 const icon_uri = (await(await fetch("https://" + key + Framework.version + "icon.uri"))?.text())
 // const destinationTask = Framework.createPart(key, undefined, desktop)
 // if (destinationTask.host === Framework.fallbackHost) continue
 desktop.taskNodes[key] = element(desktop.tasksSection, "li")
 desktop.taskNodes[key].setAttribute("class", "task-link")
 desktop.taskNodes[key].innerHTML = `<img class=task-icon src="https://${key}${Framework.version}${icon_uri}" /><span class=label>${key}</span>`
 if (key === desktop.host) desktop.taskNodes[key].setAttribute("data-here", "true")
 else desktop.taskNodes[key].onclick = e => {
  e.preventDefault()
  console.warn('add new task part now')
  if (Framework.isDebug) {
   // worker.postMessage({ code: "setDebugHost", payload: key })
  } // else location = "https://" + key + Framework.version + desktop.encodeState(0n)
 }
}

desktop.separator = element(desktop.sidebar, "hr")
desktop.separator.setAttribute("class", "separator")

desktop.settingsSection = element(desktop.sidebar, "section")
desktop.settingsSection.setAttribute("id", "settings")
desktop.tagsLine = element(desktop.settingsSection, "span")
desktop.tagsLabel = element(desktop.tagsLine, "span")
desktop.tagsLabel.innerText = "Version"
desktop.tags = element(desktop.tagsLine, "span")
desktop.tags.setAttribute("id", "tags")
desktop.tagElements = []

for (const tag of Framework.tags) {
 const tagElement = element(desktop.tags, "span")
 desktop.tagElements.push(tagElement)
 tagElement.innerHTML = tag
}

desktop.colorModeButton = element(desktop.settingsSection, "span")
desktop.colorModeButton.setAttribute("id", "color-mode")
desktop.colorModeLabel1 = element(desktop.colorModeButton, "span")
desktop.colorModeLabel1.innerText = "Color Mode"
desktop.colorModeLabel1.setAttribute("id", "label1")
desktop.colorModeLabel1.setAttribute("class", "label")
desktop.colorModeLabel2 = element(desktop.colorModeButton, "span")
desktop.colorModeLabel2.setAttribute("id", "label2")
desktop.colorModeLabel2.setAttribute("class", "label")
desktop.colorModeBase = element(desktop.colorModeButton, "span")
desktop.colorModeBase.setAttribute("class", "base")
desktop.colorModeHandle = element(desktop.colorModeBase, "span")
desktop.colorModeHandle.setAttribute("class", "handle")

desktop.vintageModeButton = element(desktop.settingsSection, "span")
desktop.vintageModeButton.setAttribute("id", "vintage-mode")
desktop.vintageModeLabel = element(desktop.vintageModeButton, "span")
desktop.vintageModeLabel.innerText = "Vintage Mode"
desktop.vintageModeLabel.setAttribute("class", "label")
desktop.vintageModeBase = element(desktop.vintageModeButton, "span")
desktop.vintageModeBase.setAttribute("class", "base")
desktop.vintageModeHandle = element(desktop.vintageModeBase, "span")
desktop.vintageModeHandle.setAttribute("class", "handle")

const modernCSS = read("modern.css")
const vintageCSS = read("vintage.css")
const customCSS = await desktop.resolve("menu.css") ?? ""
const staticStyleSheet = new CSSStyleSheet()
staticStyleSheet.replaceSync(modernCSS + "\n" + customCSS)
desktop.colorModeStyleSheet = new CSSStyleSheet()
desktop.vintageModeStyleSheet = new CSSStyleSheet()

console.log('defining the set vintage method now', ...desktop.settings.vintageMode.state)
let vintage = false

desktop.setVintage = enable => {
 if (vintage !== enable) {
  vintage = enable
  staticStyleSheet.replaceSync(`
${vintage ? vintageCSS : modernCSS}
${customCSS}`)
  desktop.vintageModeStyleSheet.replaceSync(``)
  const disconnected = !desktop.sidebar.isConnected
  if (disconnected)
   document.body.appendChild(desktop.menuElement)
  const autoHeight = desktop.sidebar.scrollHeight
  desktop.vintageModeStyleSheet.replaceSync(`
 body {
  --sidebar-height: ${autoHeight}px;
 }`)
  if (disconnected) desktop.menuElement.remove()
 }
}

console.log('adopting stylesheets')
document.adoptedStyleSheets.push(
 staticStyleSheet,
 desktop.colorModeStyleSheet,
 desktop.vintageModeStyleSheet
)