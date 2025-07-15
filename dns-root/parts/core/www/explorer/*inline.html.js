return (
 `<part-explorer><scroller->` + (
  "<h2>Part Explorer</h2>" +
  explorer.recursiveItemHTML([_], 0) +
  width["inline.html"]
 ) + "</scroller-></part-explorer>"
)