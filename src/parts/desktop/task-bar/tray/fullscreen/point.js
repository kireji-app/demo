// TODO: check for support and show the tray item only if the browser supports it. Prefer instructing user to enter the browser's native fullscreen instead of JS fullscreen (which doesn't have cross-origin support).
pointer.handle({
 click() {
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
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})