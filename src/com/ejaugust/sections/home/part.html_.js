return (
 "</section>" +
 "<section>" + (
  "<div id=note-links>" + (
   [...notes].reverse().map(note =>
    `<a ${_.pointAttr()} href=${note.canonicalURL}>` + (
     `<h4 class=topic>${note.topic ?? "No Topic"}</h4>` +
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