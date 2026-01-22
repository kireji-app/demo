pointer.handle({
 click() {
  const closing = TARGET_ELEMENT.parentElement.parentElement.hasAttribute("open")

  let toggleMask = 0n
  // let toggleElements = new Set([TARGET_ELEMENT])
  const triggerPart = folders.superset[FOLDER_INDEX]

  if (["shift", "alt", "context"].includes(_.parts.core.hotKeys.combo)) {
   function gatherRecursively(part) {
    const folderIndex = folders.superset.indexOf(part)

    if (folderIndex === -1)
     return

    toggleMask |= 1n << BigInt(folderIndex)

    if (closing) {
     if (folders.chosenParts.has(part))
      folders.chosenParts.delete(part)
    } else if (!folders.chosenParts.has(part))
     folders.chosenParts.add(part)

    partOutliner.getChildren(part).map(childPart => gatherRecursively(childPart))

    // const instanceIndex = allParts.indexOf(part)
    // const svgElement = Q(`#${partOutliner.id} summary[data-index="${instanceIndex}"]>svg`)
    // toggleElements.add(svgElement)
   }
   gatherRecursively(triggerPart)
  } else {
   toggleMask = 1n << BigInt(FOLDER_INDEX)
   if (closing) {
    if (folders.chosenParts.has(triggerPart))
     folders.chosenParts.delete(triggerPart)
   } else if (!folders.chosenParts.has(triggerPart))
    folders.chosenParts.add(triggerPart)
  }

  /*
  for (const element of toggleElements) {
   const container = element.parentElement.parentElement
   container[`${closing ? "remove" : "set"}Attribute`]("open", "")
   element.innerHTML = `<line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />
  ${closing ? `<line x1="0" y1="-0.41" x2="0" y2="0.41" stroke-width="0.2" stroke-linecap="round" />` : ``}`
  }
  */

  folders.setRouteID(closing ? ~toggleMask & folders.routeID : toggleMask | folders.routeID)
  /* folders.updateRouteID(closing ? ~toggleMask & folders.routeID : toggleMask | folders.routeID)
  partOutliner.collectRouteID([folders])
  partOutliner.collectPopulateView()
  partOutliner.notify("populate")
  partOutliner.distributeClean()
  partOutliner[".."].collectClean()*/
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})