document.body.classList.remove("paused")

// if (agent.isSafari) {
// Request pointer lock **before** toggling fullscreen because the fullscreen request will "consume" the transient user gesture activation that enables the security system to accept the pointer lock request.
if (!document.pointerLockElement) {
 await orbitalGame.container.requestPointerLock({
  unadjustedMovement: true,
 })
}

Q("#pause-menu").classList.add("played")

// }
/*
if (!document.fullscreenElement) {
 if (document.documentElement.requestFullscreen) {
  await document.documentElement.requestFullscreen()
 } else if (document.documentElement.webkitRequestFullscreen) {
  await document.documentElement.webkitRequestFullscreen()
 } else if (document.documentElement.msRequestFullscreen) {
  await document.documentElement.msRequestFullscreen()
 }
}
 
if (!agent.isSafari) {
 // Firefox: you must request pointer lock **after** fullscreen.
 if (!document.pointerLockElement) {
  await orbitalGame.onscreenContext.canvas.requestPointerLock({
   unadjustedMovement: true,
  })
 }
}*/