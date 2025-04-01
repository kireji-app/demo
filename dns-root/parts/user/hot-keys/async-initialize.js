agent.shiftKeysDown = 0
agent.contextKeysDown = 0

Object.assign(globe, {
 onblur(e) {
  agent.contextKeysDown = agent.shiftKeysDown = 0
 },
 onkeyup(e) {
  e.preventDefault()
  if (agent.isMac) {
   if (e.key === "Meta") agent.contextKeysDown = Math.max(0, agent.contextKeysDown - 1)
  } else if (e.key === "Control") agent.contextKeysDown = Math.max(0, agent.contextKeysDown - 1)
  if (e.key === "Shift") agent.shiftKeysDown = Math.max(0, agent.shiftKeysDown - 1)
 },
 onkeydown(e) {
  e.preventDefault()
  if (agent.isMac) {
   if (e.key === "Meta") agent.contextKeysDown++
  } else if (e.key === "Control") agent.contextKeysDown++
  if (e.key === "Shift") agent.shiftKeysDown++
  if (agent.contextKeysDown === 1 && !agent.shiftKeysDown && e.key === "z") history.back()
  if (agent.contextKeysDown === 1 && !agent.shiftKeysDown && e.key === "y") history.forward()
  if (agent.contextKeysDown === 1 && agent.shiftKeysDown && e.key === "z") history.forward()
 }
})