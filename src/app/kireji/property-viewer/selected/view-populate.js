if (selected.previousPart && !selected.previousPart.isAbstract) {
 selected.previousPart.removeEventListener("populate", selected.partListener)
 selected.previousPart.removeEventListener("remove", selected.partListener)
}

selected.previousPart = selectedPart

if (!selectedPart.isAbstract) {
 selectedPart.addEventListener("populate", selected.partListener)
 selectedPart.addEventListener("remove", selected.partListener)
}

for (const word of ["basic", "hash", "properties", "images", "files"])
 document.getElementById(`info-${word}`).innerHTML = propertyViewer[`info-${word}.html`]

document.querySelector("part-outliner summary[data-selected]").removeAttribute("data-selected")
document.querySelector(`part-outliner summary[data-index="${selected.routeID}"]`).setAttribute("data-selected", "")