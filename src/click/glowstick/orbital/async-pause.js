Q("#pause-menu").innerHTML = orbitalGame["pause-menu.html"]

document.body.classList.add("paused")

/*
 if (document.fullscreenElement) {
  if (document.exitFullscreen) {
   await document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
   await document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
   await document.msExitFullscreen()
  }
 }
*/

if (document.pointerLockElement)
 await document.exitPointerLock()

// document.removeEventListener("pointerlockchange", orbitalGame.reactToPointerLock)