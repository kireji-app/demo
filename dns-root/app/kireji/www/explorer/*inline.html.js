return (
 `<part-explorer><scroller->` + (
  "<h2>Part Explorer</h2>" +
  explorer.recursiveItemHTML([_], 0)
 ) + "</scroller-></part-explorer>"
)