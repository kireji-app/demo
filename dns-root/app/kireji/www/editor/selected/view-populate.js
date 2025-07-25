if (_.application === _.app.kireji.www) {
 if (selected.previousPart && !selected.previousPart.isAbstract) {
  selected.previousPart.removeEventListener("populate", selected.partListener)
  selected.previousPart.removeEventListener("remove", selected.partListener)
 }

 selected.previousPart = selectedPart

 if (!selectedPart.isAbstract) {
  selectedPart.addEventListener("populate", selected.partListener)
  selectedPart.addEventListener("remove", selected.partListener)
 }

 selected.replaceContent()
}