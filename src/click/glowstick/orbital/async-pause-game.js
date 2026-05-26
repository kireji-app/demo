document.body.classList.add("paused")

// _.parts.core.agent.toggleFullscreen(false)
if (document.fullscreenElement) {
 if (document.exitFullscreen) {
  await document.exitFullscreen()
 } else if (document.webkitExitFullscreen) {
  await document.webkitExitFullscreen()
 } else if (document.msExitFullscreen) {
  await document.msExitFullscreen()
 }
}

if (document.pointerLockElement) {
 await document.exitPointerLock()
}

// document.removeEventListener("pointerlockchange", orbitalGame.reactToPointerLock)