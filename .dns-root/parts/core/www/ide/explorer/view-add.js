part.container = element(part.parent.container, "section")
part.container.setAttribute("id", "explorer")

part.widthHandle = element(part.parent.container, "div")
part.widthHandle.setAttribute("id", "width-handle")

part.widthHandle.onmousedown = e => {
 e.preventDefault()
 const backupOnMouseUp = window.onmouseup
 const backupOnMouseMove = window.onmousemove
 const backupClass = desktop.containerHost.getAttribute("class")
 desktop.containerHost.setAttribute("class", (backupClass ? backupClass + " " : "") + "dragging")
 window.onmousemove = e => {
  e.preventDefault()
  if (e.clientX < 32) {
   if (part.width.arm === part.width.open)
    part.width.set(0n)
  } else part.width.set(part.width.offsets.open + BigInt(Math.min(895, Math.max(0, Math.trunc(e.clientX) - 64))))
 }
 window.onmouseup = e => {
  e.preventDefault()
  window.onmouseup = backupOnMouseUp
  window.onmousemove = backupOnMouseMove
  if (backupClass) desktop.containerHost.setAttribute("class", backupClass)
  else desktop.containerHost.removeAttribute("class")
 }
}

part.heading = element(part.container, "h2")
part.heading.textContent = "Schema Explorer"

function addPart(subject, container, depth = 0) {
 for (const subpart of subject) {
  const subpartContainer = element(container, "details")
  // subpartContainer.setAttribute("open", "")
  const summary = element(subpartContainer, "summary")
  summary.onclick = e => {
   e.preventDefault()
   e.stopPropagation()
  }
  summary.innerHTML = Array(depth + +(subpart.length === 0)).fill('<span class="spacer"></span>').join("")
  if (subpart.length) {
   const handle = summary.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
   handle.setAttribute("viewBox", "-1 -1 2 2")
   handle.setAttribute("class", "handle")
   handle.innerHTML = `<line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />
<line x1="0" y1="-0.41" x2="0" y2="0.41" stroke-width="0.2" stroke-linecap="round" />`
   handle.onclick = () => {
    if (subpartContainer.hasAttribute("open")) {
     subpartContainer.removeAttribute("open")
     handle.innerHTML = `<line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />
   <line x1="0" y1="-0.41" x2="0" y2="0.41" stroke-width="0.2" stroke-linecap="round" />`
    } else {
     handle.innerHTML = `<line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />`
     subpartContainer.setAttribute("open", "")
    }
   }
  } else subpartContainer.setAttribute("class", "empty")
  const symbol = element(summary, "span")
  const icon = element(symbol, "img")
  icon.setAttribute("src", subpart.render({
   stringName: "icon.uri",
   fallback: "data:image/png;base64,iVBORw0KGgo=",
   format: "datauri"
  }))
  const typeIcon = element(symbol, "img")
  typeIcon.setAttribute("class", "type-icon")
  const protoSubpart = Object.getPrototypeOf(Object.getPrototypeOf(subpart))
  typeIcon.setAttribute("src", subpart.render({
   stringName: "icon.uri",
   fallback: "data:image/png;base64,iVBORw0KGgo=",
   format: "datauri"
  }))
  const label = element(summary, "span")
  label.setAttribute("class", "label")
  label.textContent = subpart.key
  if (subpart.key === root.key) label.textContent += " (" + BUILD.tags[0] + ")"
  addPart(subpart, subpartContainer, depth + 1)
 }
}

addPart([root], part.container)