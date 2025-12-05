const triggerContainer = ELEMENT.parentElement.parentElement
const closing = triggerContainer.hasAttribute("open")

let toggleMask = 0n
let toggleElements = new Set([ELEMENT])
const triggerPart = outliner.folders.folderParts[FOLDER_INDEX]

if (["shift", "alt", "context"].includes(_.parts.core.hotKeys.combo)) {
 function gatherRecursively(part) {
  const folderIndex = outliner.folders.folderParts.indexOf(part)

  if (folderIndex === -1)
   return

  toggleMask |= 1n << BigInt(folderIndex)

  if (closing) {
   if (folders.openParts.has(part))
    folders.openParts.delete(part)
  } else if (!folders.openParts.has(part))
   folders.openParts.add(part)

  for (const subpart of part)
   gatherRecursively(subpart)

  const instanceIndex = allParts.indexOf(part)

  const svgElement = document.querySelector(`part-outliner summary[data-index="${instanceIndex}"]>svg`)
  toggleElements.add(svgElement)
 }
 gatherRecursively(triggerPart)
} else {
 toggleMask = 1n << BigInt(FOLDER_INDEX)
 if (closing) {
  if (folders.openParts.has(triggerPart))
   folders.openParts.delete(triggerPart)
 } else if (!folders.openParts.has(triggerPart))
  folders.openParts.add(triggerPart)
}

for (const element of toggleElements) {
 const container = element.parentElement.parentElement
 container[`${closing ? "remove" : "set"}Attribute`]("open", "")
 element.innerHTML = `<line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />
${closing ? `<line x1="0" y1="-0.41" x2="0" y2="0.41" stroke-width="0.2" stroke-linecap="round" />` : ``}`
}

outliner.folders.updateRouteID(closing ? ~toggleMask & outliner.folders.routeID : toggleMask | outliner.folders.routeID)
outliner.collectRouteID([outliner.folders])
outliner.collectPopulateView()
outliner.notify("populate")
outliner.distributeClean()
outliner[".."].collectClean()