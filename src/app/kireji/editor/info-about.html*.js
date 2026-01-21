return (
 `<summary onpointerdown=${editor.settings.runtimeReference}.point(event,this)>About Part</summary>` +
 "<div id=part-intro>" + (
  `<img src="${activePart.placeholderImage("part.png")}"/>` +
  "<div>" + (
   "<h3>" + (
    activePart.title ?? activePart.key
   ) + "</h3>" + (
    activePart.host === "part.abstract.parts" ?
     "<span disabled>This part has no prototype.</span>" :
     `Extends <a href="/" onpointerdown="${editor.runtimeReference}.point(event,this,${allParts.indexOf(activePart.prototype)})">` + (
      activePart.prototype.title ?? activePart.prototype.key
     ) + '</a>'
   )
  ) + "</div>"
 ) + "</div>" +
 "<hr>" +
 `<p id=description${activePart.description ? "" : " disabled"}>${activePart.description ?? "This part has no description."}</p>`
)