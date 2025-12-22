// TODO: The existence of a scroller should not be assumed here.
return (
 `<part-outliner id="${partOutliner.id}">` + partOutliner.scroller.wrap(
  partOutliner.recursiveItemHTML(partOutliner.dummySubject, 0, true)
 ) + `</part-outliner>`
)