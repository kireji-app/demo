hotKeys.shiftKeysDown = 0
hotKeys.contextKeysDown = 0

Object.defineProperties(globalThis, {
 onblur: {
  value(e) {
   hotKeys.contextKeysDown = hotKeys.shiftKeysDown = 0
  }, configurable: true, writable: true
 },
 onkeyup: {
  value(e) {
   e.preventDefault()
   if (hotKeys.isMac) {
    if (e.key === "Meta") hotKeys.contextKeysDown = Math.max(0, hotKeys.contextKeysDown - 1)
   } else if (e.key === "Control") hotKeys.contextKeysDown = Math.max(0, hotKeys.contextKeysDown - 1)
   if (e.key === "Shift") hotKeys.shiftKeysDown = Math.max(0, hotKeys.shiftKeysDown - 1)
  }, configurable: true, writable: true
 },
 onkeydown: {
  value(e) {
   e.preventDefault()
   if (hotKeys.isMac) {
    if (e.key === "Meta") hotKeys.contextKeysDown++
   } else if (e.key === "Control") hotKeys.contextKeysDown++
   if (e.key === "Shift") hotKeys.shiftKeysDown++
   if (hotKeys.contextKeysDown === 1 && !hotKeys.shiftKeysDown && e.key === "z") history.back()
   if (hotKeys.contextKeysDown === 1 && !hotKeys.shiftKeysDown && e.key === "y") history.forward()
   if (hotKeys.contextKeysDown === 1 && hotKeys.shiftKeysDown && e.key === "z") history.forward()
  }, configurable: true, writable: true
 }
})