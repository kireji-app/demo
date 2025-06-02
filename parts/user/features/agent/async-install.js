root.parts.user.agent.isMac = nav.userAgent.indexOf("Mac") > -1
root.parts.user.agent.isSafari = /^((?!chrome|android).)*safari/i.test(nav.userAgent)

Object.defineProperties(globalThis, {
 element: {
  value(parentElement, tagname) {
   return parentElement.appendChild(document.createElement(tagname))
  }, configurable: true, writable: true
 },
 noop: {
  value(event) {
   event.preventDefault()
   event.stopPropagation()
  }, configurable: true, writable: true
 },
 svg: {
  value(parentElement, ...paths) {
   const result = parentElement.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
   result.setAttribute("viewBox", "-1 -1 2 2")
   result.setAttribute("class", "nav-button")
   result.innerHTML = paths.map(path => `<path d="${path}" stroke-width="0.2" stroke-linecap="round" />`).join("\n")
   return result
  }, configurable: true, writable: true
 }
})