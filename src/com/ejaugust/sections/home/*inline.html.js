return (
 "</section>" +
 "<section>" + (
  "<div id=note-links>" + (
   [...notes].reverse().map(note =>
    `<a href=${note.canonicalURL} onclick=self._?.go(this,event)>` + (
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