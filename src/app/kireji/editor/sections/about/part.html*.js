return (
 "<div id=part-intro>" + (
  `<img src="${activePart.placeholderImage("part.png")}"/>` +
  "<div>" + (
   "<h3>" + (
    activePart.title ?? activePart.key
   ) + "</h3>" + (
    activePart.host === "part.abstract.parts" ?
     "<span disabled>This part has no prototype.</span>" :
     `Extends <a ${editor.pointAttr("point", allParts.indexOf(activePart.prototype))} href="/">` + (
      activePart.prototype.title ?? activePart.prototype.key
     ) + '</a>'
   )
  ) + "</div>"
 ) + "</div>" +
 "<hr>" +
 `<p id=description${activePart.description ? "" : " disabled"}>${activePart.description ?? "This part has no description."}</p>`
)