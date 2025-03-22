part.container = element(part.parent[LAYER].container, "section")
part.container.setAttribute("id", "explorer")

part.widthHandle = element(part.parent[LAYER].container, "div")
part.widthHandle.setAttribute("id", "width-handle")

part.widthHandle.onmousedown = e => {
 e.preventDefault()
 const backupOnMouseUp = window.onmouseup
 const backupOnMouseMove = window.onmousemove
 const backupClass = desktop.containerHost.getAttribute("class")
 desktop.containerHost.setAttribute("class", (backupClass ? backupClass + " " : "") + "dragging")
 window.onmousemove = async e => {
  e.preventDefault()
  if (e.clientX < 32) {
   if (part.width.choice[LAYER] === part.width.open)
    await part.width.setLayer(LAYER, 0n)
  } else await part.width.setLayer(LAYER, part.width.open.offset + BigInt(Math.min(895, Math.max(0, Math.trunc(e.clientX) - 64))))
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

async function addPart(subject, container, depth = 0) {
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
  icon.setAttribute("src", await subpart.createDataURI(Framework.version + await subpart.resolve("icon.uri")))
  const typeIcon = element(symbol, "img")
  typeIcon.setAttribute("class", "type-icon")
  const protoSubpart = Object.getPrototypeOf(Object.getPrototypeOf(subpart))
  typeIcon.setAttribute("src", await protoSubpart.createDataURI(Framework.version + await protoSubpart.resolve("icon.uri")))
  const label = element(summary, "span")
  label.setAttribute("class", "label")
  label.textContent = subpart.key
  if (subpart.key === root.key) label.textContent += " (" + Framework.tags[0] + ")"
  addPart(subpart, subpartContainer, depth + 1)
 }
}

await addPart([root], part.container)