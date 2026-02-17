return (
 "</section>" +
 "<section>" + (
  "<div id=note-links>" + (
   [...notes].reverse().map(note =>
    `<a ${_.pointAttr()} href=${note.canonicalURL}>` + (
     `<span class=details><span class=topic>${note.topic ?? "No Topic"}</span><flex-spacer></flex-spacer><span class=date>${note.niceDate(note.key)}</span></span>` +
     "<h3>" + (
      note.title
     ) +
     "</h3>" +
     "<p>" + (
      `${note.description ?? note.subtitle ?? "No description"}`
     ) +
     "</p>"
    ) +
    "</a>"
   ).join("")
  ) +
  "</div>"
 ) +
 "</section>"
)