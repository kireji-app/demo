if (hydrated) {
 const selectedIcons = new Set(desktopIcons.chosenParts)

 for (const alreadySelectedIcon of document.querySelectorAll(`#desktop_parts desktop-icon[data-selected]`)) {
  const application = desktopIcons.superset[Number(alreadySelectedIcon.getAttribute("data-index"))]
  if (selectedIcons.has(application))
   selectedIcons.delete(application)
  else alreadySelectedIcon.removeAttribute("data-selected")
 }

 for (const iconToSelect of selectedIcons) {
  const iconElement = Q(`#desktop_parts desktop-icon[data-index="${desktopIcons.superset.indexOf(iconToSelect)}"]`)
  iconElement.setAttribute("data-selected", "")
 }
}