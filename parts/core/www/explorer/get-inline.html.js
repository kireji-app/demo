return (
 "<part-explorer>" + (
  "<h2>Schema Explorer</h2>" +
  explorer.recursiveItemHTML([desktop], part.container) +
  explorer.width["inline.html"]
 ) + "</part-explorer>"
)