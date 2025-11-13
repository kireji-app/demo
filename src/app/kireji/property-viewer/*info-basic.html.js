return (
 "<h1>" + (
  `<img src="${selectedPart.placeholderImage("part.png")}"/>` +
  (selectedPart === _ ? "" : selectedPart.key)
 ) +
 "</h1>" +
 "<p>" + (
  '<span class=marks>Part "</span>' +
  selectedPart.domains.join("<span class=marks>.</span>") +
  '<span class=marks>" ' + (
   selectedPart.host === "part.abstract.parts" ?
    "is the type root and has no prototype.</span>" :
    "extends </span>" +
    `<a href="#" onclick="${selected.runtimeReference}.go(event,${allParts.indexOf(selectedPart.prototype)})">` + (
     '<span class=marks>"</span>' + selectedPart.prototype.domains.join("<span class=marks>.</span>") + '<span class=marks>"</span>'
    ) +
    '</a>'
  )
 ) +
 "</p>" +
 `<h2>${selectedPart.title ?? `Unnamed Part`}</h2>` +
 `<p id=description>${selectedPart.description ?? "<span class=marks>This part has no description.</span>"}</p>`
)