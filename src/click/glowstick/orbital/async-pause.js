Q("#pause-menu").innerHTML = OrbitalGame["pause-menu.html"]

document.body.classList.add("paused")

if (document.pointerLockElement)
 await document.exitPointerLock()