return (
 `<h2>About Part</h2>` +
 (
  "<div id=part-intro>" + (
   `<img src="${selectedPart.placeholderImage("part.png")}"/>` +
   "<div><h3>" + (selectedPart.title ?? `Unnamed Part`) + "</h3>" + (
    '<span class=marks>Part "</span>' +
    selectedPart.domains.join("<span class=marks>.</span>") +
    '<span class=marks>" ' + (
     selectedPart.host === "part.abstract.parts" ?
      "is the type root and has no prototype.</span>" :
      "extends </span>" +
      `<a href="#" onclick="${propertyViewer.runtimeReference}.open(event,${allParts.indexOf(selectedPart.prototype)})">` + (
       '<span class=marks>"</span>' + selectedPart.prototype.domains.join("<span class=marks>.</span>") + '<span class=marks>"</span>'
      ) +
      '</a>'
    )
   ) + "</div>"
  ) +
  "</div>"
 ) +
 `<p id=description>${selectedPart.description ?? "<span class=marks>This part has no description.</span>"}</p>`
)