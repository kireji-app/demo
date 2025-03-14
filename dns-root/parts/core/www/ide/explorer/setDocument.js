part.container = element(part.parent.container, "section")
part.container.setAttribute("id", "explorer")
part.heading = element(part.container, "h2")
part.heading.textContent = "Explorer"

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
  icon.setAttribute("src", await subpart.createDataURI(await subpart.resolve("icon.uri", "fallback-icon.svg")))
  const typeIcon = element(symbol, "img")
  typeIcon.setAttribute("class", "type-icon")
  const protosubpart = Object.getPrototypeOf(Object.getPrototypeOf(subpart))
  typeIcon.setAttribute("src", await protosubpart.createDataURI(await protosubpart.resolve("icon.uri", "fallback-icon.svg")))
  const label = element(summary, "span")
  label.setAttribute("class", "label")
  label.textContent = subpart.key
  addPart(subpart, subpartContainer, depth + 1)
 }
}

await addPart([root], part.container)