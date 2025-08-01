
return (
 "<section id=bio>" + (
  `<h1>${ejaugust.title}</h1>` +
  "<p>My name is Eric and this web application is my notebook. I created it so that I would have a place to think aloud.</p>" +
  "<p>Here, I'm able to use a conversational approach to present a state-of-the-art piece of technology I'm designing.</p>" +
  "<p>Pick a topic from the list below or use the menu button at the bottom left to explore the work-in-progress platform.</p>"
 ) +
 "</section>" +
 "<section>" + (
  "<div id=latest>" + (
   [...notes].reverse().map(note =>
    `<article onclick="_.com.ejaugust.www.notes.go(event, '${note.key}')">` + (
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
    "</article>"
   ).join("")
  ) +
  "</div>"
 ) +
 "</section>"
)