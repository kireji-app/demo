
return (
 "<section id=bio>" + (
  `<h1>${ejaugust.title}</h1>` +
  "<p>Hello! Welcome to my notebook. I created this site so I'd have a place to write casually about the tech I'm working on.</p>" +
  "<p>You can pick a topic from the list below or use the menu button at the bottom left to explore the rest of the platform.</p>"
 ) +
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