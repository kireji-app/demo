
// The same is not true for all task run actions.
// When a match switches over to run a new task, that task must check
//  and see if it is hydrating a correct page or moving to a new state
// Often, this can be determined by checking to see if a certain attribute is on the HTML.
// The static html should always show this attribute.
// The rendered page should remove it after the initial hydration.

// Here, we should always be hydrating a correct pre-existing inline HTML and CSS.
// Do we need to split the flow yet again? The hydration is not possible to call later, so it doesn't have to be in the initial flow
// This can be something called "task-hydrate".

if (!document.body.hasAttribute("data-dry"))
 throw "Unrecoverable: missing the server-rendered document."

desktop.adoptedStyleSheets = document.adoptedStyleSheets

document.title = desktop.host
desktop.menuElement = document.querySelector("task-menu")
if (!desktop.menuElement) {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = `<task-menu>
   <sidebar->
    <ul id=kiosks>${["desktop.parts", "kireji.io", "core.parts", "ejaugust.com", "kireji.app", "orenjinari.com"].map(hostBase => {
  const kioskHost = "www." + hostBase
  const kioskPart = new Part(kioskHost)
  return `
         <li class=task-link><a href="https://${kioskHost}/"><img src="${kioskPart.createDataURI(kioskPart.render("icon.uri"))}" class=task-icon /><span class=label>${kioskPart.niceName ?? hostBase}</span></a>`
 }).join("")}</ul>
    <hr>
    <section id="settings">
     <span id=version tabIndex=6>
      <span class="label">Version</span>
      <span id="tags">${BUILD.tags.map(tag => `<span>${tag}</span>`).join("")}</span>
     </span>
     <span id="color-mode" tabIndex=7>
      <span id="label1" class="label">Color Mode</span>
      <span id="label2" class="label">Device Mode</span>
      <span class="base">
       <span class="handle">✱</span>
      </span>
     </span>
     <span id="vintage-mode" tabIndex=8>
      <span class="label">Vintage Mode</span>
      <span class="base">
       <span class="handle"></span>
      </span>
     </span>
    </section>
   </sidebar->
  </task-menu>`
 desktop.menuElement = offscreen.querySelector("task-menu")
 document.body.appendChild(desktop.menuElement)
}
desktop.appHost = Framework.isProduction ? location.host : BUILD.host
desktop.containerHost = document.querySelector("desktop-")
desktop.taskbar = document.querySelector("taskbar-")
desktop.menuButton = document.querySelector("menu-button")
desktop.taskbarSpacer = desktop.taskbar.querySelector("flex-spacer")
desktop.sidebar = desktop.menuElement.querySelector("sidebar-")
desktop.kiosksSection = document.getElementById("kiosks")
desktop.settingsSection = document.getElementById("settings")
desktop.colorModeButton = document.getElementById("color-mode")
desktop.vintageModeButton = document.getElementById("vintage-mode")
desktop.colorModeHandle = desktop.colorModeButton.querySelector(".handle")
desktop.colorModeLabel2 = document.getElementById("label2")
desktop.styleNode = document.getElementById("inline-style")

desktop.sidebar.onclick = e => {
 e.preventDefault()
 e.stopPropagation()
}

desktop.container = desktop.containerHost.attachShadow({ mode: "open" })
desktop.container.adoptedStyleSheets.push(desktop.styleSheet)

desktop.showShareButton = false
if (desktop.showShareButton && navigator.share) {
 desktop.shareButton = element(desktop.taskbar, "button")
 desktop.shareButton.innerText = "➦"
 desktop.shareButton.setAttribute("id", "share")
 desktop.shareButton.onclick = () => navigator.share({ title: document.title, url: location.href }).catch(e => e.name == "AbortError" || console.error(e))
}

desktop.showFullScreenControl = true
desktop.canEnterFullScreen = desktop.showFullScreenControl && document.fullscreenEnabled
desktop.toggleFullScreen = () => {
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
if (desktop.canEnterFullScreen) {
 desktop.fullscreenButton = element(desktop.taskbar, "button")
 desktop.fullscreenButton.innerText = "⛶"
 desktop.fullscreenButton.setAttribute("id", "fullscreen")
 desktop.fullscreenButton.setAttribute("class", "btn")
 desktop.fullscreenButton.onclick = desktop.toggleFullScreen
}

document.addEventListener('fullscreenchange', () => document.fullscreenElement || (desktop.doKioskNavigation(desktop.pendingHost), delete desktop.pendingHost));
desktop.doKioskNavigation = host => {
 if (Framework.isProduction)
  return location = host + pathname

 if (host === BUILD.host)
  return

 desktop.worker.postMessage({ code: "setDebugHost", payload: host })
}
desktop.makeKioskLink = host => e => {
 e.preventDefault()
 e.stopPropagation()
 if (document.fullscreenElement) desktop.pendingHost = host
 else desktop.doKioskNavigation(host)
}

for (const kioskItem of [...desktop.kiosksSection.children]) {
 const link = kioskItem.querySelector("a")
 const label = kioskItem.querySelector(".label")
 const host = label.textContent

 if (host === desktop.appHost)
  kioskItem.setAttribute("data-here", "true")

 link.onclick = desktop.makeKioskLink(host)
}

// if (desktop.appHost !== "www.desktop.parts")
//  desktop.taskbar.onclick = desktop.containerHost.onclick = desktop.makeKioskLink("www.desktop.parts")

if (false) SimulateSlowLaunch: {
 const testDurationSeconds = 5

 const start = performance.now()
 Framework.log(0, `Simulating ${testDurationSeconds}-second root initialization.`)
 let iteration = -1
 let elapsedSeconds
 let remainingSeconds
 do {
  elapsedSeconds = Math.trunc((performance.now() - start) / 1000)
  const newRemainingSeconds = testDurationSeconds - elapsedSeconds
  Math.sin(iteration++)
  if (newRemainingSeconds !== remainingSeconds) {
   remainingSeconds = newRemainingSeconds
   Framework.log(0, "t: -" + remainingSeconds)
  }
 } while (remainingSeconds > 0)
 console.log('unblocked at iteration ' + iteration)
 // throw 'no continue'
}

desktop.colorModeStyleSheet = new CSSStyleSheet()
document.adoptedStyleSheets.push(desktop.colorModeStyleSheet)
document.body.removeAttribute("data-dry")