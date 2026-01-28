return sections.map(section =>
 `<details class=info-section id=info-${section.key}${section.model ? " open" : ""}>` + (
  `<summary ${section.pointAttr()}>` + (
   section.title
  ) + `</summary>` +
  `<section${section.key.startsWith("state") && (activePart.isAbstract || section.key === "state" && activePart.disabled) ? " disabled" : ""}>` + (
   section["part.html"]
  ) + `</section>`
 ) + `</details>`
).join("")