return (
 `<part-outliner><scroller->` + (
  outliner.recursiveItemHTML([_], 0, true)
 ) + "</scroller-></part-outliner>"
)