agent.isMac = nav.agent.indexOf("Mac") > -1
agent.isSafari = /^((?!chrome|android).)*safari/i.test(nav.agent)
agent.shiftKeysDown = 0
agent.contextKeysDown = 0

Object.assign(globe, {
 element(parentElement, tagname) {
  return parentElement.appendChild(document.createElement(tagname))
 },
 svg(parentElement, ...paths) {
  const result = parentElement.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
  result.setAttribute("viewBox", "-1 -1 2 2")
  result.setAttribute("class", "nav-button")
  result.innerHTML = paths.map(path => `<path d="${path}" stroke-width="0.2" stroke-linecap="round" />`).join("\n")
  return result
 },
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