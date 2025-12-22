return (
 `<h2>About Part</h2>` +
 "<div id=part-intro>" + (
  `<img src="${selectedPart.placeholderImage("part.png")}"/>` +
  "<div>" + (
   "<h3>" + (
    selectedPart.title ?? selectedPart.key
   ) + "</h3>" + (
    selectedPart.host === "part.abstract.parts" ?
     "<span disabled>This part has no prototype.</span>" :
     `Extends <a href="#" onclick="${editor.runtimeReference}.open(event,${allParts.indexOf(selectedPart.prototype)})">` + (
      selectedPart.prototype.title ?? selectedPart.prototype.key
     ) + '</a>'
   )
  ) + "</div>"
 ) + "</div>" +
 "<hr>" +
 `<p id=description${selectedPart.description ? "" : " disabled"}>${selectedPart.description ?? "This part has no description."}</p>`
)