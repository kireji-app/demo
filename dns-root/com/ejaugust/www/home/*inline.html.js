
return (
 "<section id=bio>" + (
  `<h1>${ejaugust.title}</h1>` +
  "<p>I build software to make information easier to understand and access. This app gives me a place to think aloud. It's part of a larger platform I'm building.</p>" +
  "<p>You can pick a note from the list below or use the menu button at the bottom left to explore the rest of the platform.</p>"
 ) +
 "</section>" +
 "<section>" + (
  "<div id=latest>" + (
   [...notes].reverse().map(note => {
    const noteRouteID = notes.offsets.get(note) + ejaugust.offsets.get(notes)
    return (
     `<article onclick="_.com.ejaugust.www.notes.go(event, ${noteRouteID}n)">` + (
      `<h4 class=topic>${note.topic}</h4>` +
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
    )
   }).join("")
  ) +
  "</div>"
 ) +
 "</section>"
)