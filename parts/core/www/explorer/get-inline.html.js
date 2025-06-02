return (
 `<part-explorer>` + (
  "<h2>Schema Explorer</h2>" +
  explorer.recursiveItemHTML([root.parts.desktop], part.container) +
  width["inline.html"]
 ) + "</part-explorer>"
)