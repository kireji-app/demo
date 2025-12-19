return (
 `<h2>About Part</h2>` +
 "<div id=part-intro>" + (
  `<img src="${selectedPart.placeholderImage("part.png")}"/>` +
  "<div>" + (
   "<h3>" + (
    selectedPart.title ?? selectedPart.key
   ) + "</h3>" +
   'Extends ' + (
    selectedPart.host === "part.abstract.parts" ?
     "<code>Object.prototype</code>." :
     `<a href="#" onclick="${editor.runtimeReference}.open(event,${allParts.indexOf(selectedPart.prototype)})">` + (
      selectedPart.prototype.title ?? selectedPart.prototype.key
     ) +
     '</a>'
   )
  ) + "</div>"
 ) + "</div>" +
 "<hr>" +
 `<p id=description>${selectedPart.description ?? "This part has no description."}</p>`
)