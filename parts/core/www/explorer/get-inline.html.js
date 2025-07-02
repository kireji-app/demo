return (
 `<part-explorer>` + (
  "<h2>Schema Explorer</h2>" +
  explorer.recursiveItemHTML([_], 0) +
  width["inline.html"]
 ) + "</part-explorer>"
)