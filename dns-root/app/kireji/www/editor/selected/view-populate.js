if (_.application === _.app.kireji.www) {
 selected.previousPart?.removeEventListener("populate", selected.partListener)
 selected.previousPart = selectedPart
 selectedPart.addEventListener("populate", selected.partListener)
 selected.replaceContent()
}