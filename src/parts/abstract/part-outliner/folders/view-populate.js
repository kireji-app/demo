if (hydrated) {
 const partsToOpen = new Set(folders.chosenParts)

 for (const alreadyOpenView of document.querySelectorAll(`#${folders[".."].id} details[open]>summary`)) {
  const folderPart = allParts[alreadyOpenView.getAttribute("data-index")]
  if (partsToOpen.has(folderPart))
   partsToOpen.delete(folderPart)
  else {
   alreadyOpenView.parentElement.removeAttribute("open")
   alreadyOpenView.querySelector("svg").innerHTML = `<line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />
<line x1="0" y1="-0.41" x2="0" y2="0.41" stroke-width="0.2" stroke-linecap="round" />`
  }
 }

 for (const partToOpen of partsToOpen) {
  const closedView = Q(`#${folders[".."].id} details>summary[data-index="${allParts.indexOf(partToOpen)}"]`)
  closedView.parentElement.setAttribute("open", "")
  closedView.querySelector("svg").innerHTML = `<line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />`
 }
}