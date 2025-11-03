
return (
 /* "<section id=bio>" + (
  `<img src="${ejaugust.placeholderImage("part.png")}" title=Me>` +
  `<img src="${ejaugust.placeholderImage("hw-design.png")}" title=Design>` +
  `<img src="${ejaugust.placeholderImage("hw-engineering.png")}" title=Engineering>` +
  `<img src="${ejaugust.placeholderImage("hw-math.png")}" title=Math>` +
  `<img src="${ejaugust.placeholderImage("hw-research.png")}" title=Research>`
 ) + */
 "</section>" +
 "<section>" + (
  "<div id=note-links>" + (
   [...notes].reverse().map(note =>
    `<a href="/${note.short ?? note.key}" onclick="_.com.ejaugust.www.notes.go(event, '${note.key}')">` + (
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