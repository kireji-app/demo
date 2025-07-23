Object.defineProperties(hotKeys, {
 shiftKeysDown: { value: 0, writable: true },
 contextKeysDown: { value: 0, writable: true }
})

globalThis.onblur = e => hotKeys.contextKeysDown = hotKeys.shiftKeysDown = 0

globalThis.onkeyup = e => {
 e.preventDefault()
 if (agent.isMac) {
  if (e.key === "Meta") hotKeys.contextKeysDown = Math.max(0, hotKeys.contextKeysDown - 1)
 } else if (e.key === "Control") hotKeys.contextKeysDown = Math.max(0, hotKeys.contextKeysDown - 1)
 if (e.key === "Shift") hotKeys.shiftKeysDown = Math.max(0, hotKeys.shiftKeysDown - 1)
}

globalThis.onkeydown = e => {
 e.preventDefault()
 if (agent.isMac) {
  if (e.key === "Meta") hotKeys.contextKeysDown++
 } else if (e.key === "Control") hotKeys.contextKeysDown++
 if (e.key === "Shift") hotKeys.shiftKeysDown++
 if (hotKeys.contextKeysDown === 1 && !hotKeys.shiftKeysDown && e.key === "z")
  history.back()
 if (hotKeys.contextKeysDown === 1 && !hotKeys.shiftKeysDown && e.key === "y")
  history.forward()
 if (hotKeys.contextKeysDown === 1 && hotKeys.shiftKeysDown && e.key === "z")
  history.forward()
}