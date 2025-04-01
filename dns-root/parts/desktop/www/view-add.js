if (!hydration.supported)
 throw "Unrecoverable: corrupt document state."

desktop.adoptedStyleSheets = document.adoptedStyleSheets

document.title = desktop.host
desktop.wallpaper = document.querySelector("wallpaper-")
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

 if (host === addressBar.hostname)
  kioskItem.setAttribute("data-here", "true")

 link.onclick = desktop.makeKioskLink(host)
}

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

if (!hydration.hydrated)
 hydration.finish()