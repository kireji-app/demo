return (
 `<part-outliner>` + outliner.scroller.wrap(
  outliner.recursiveItemHTML({ subdomains: [""], "": _ }, 0, true)
 ) + "</part-outliner>"
)