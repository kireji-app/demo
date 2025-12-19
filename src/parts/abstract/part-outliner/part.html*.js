// TODO: The existence of a scroller should not be assumed here.
return (
 `<${folders[".."].tag}>` + partOutliner.scroller.wrap(
  partOutliner.recursiveItemHTML(partOutliner.dummySubject, 0, true)
 ) + `</${folders[".."].tag}>`
)