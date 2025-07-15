
return (
 `<h1>${ejaugust.title}</h1>` +
 "<p>I am a software engineer building new technology for the web.</p>" +
 "<h2>Latest Notes</h2>" +
 "<section>" + (
  "<div id=latest>" + (
   [...notes].reverse().map(note => {
    const noteRouteID = notes.offsets.get(note) + ejaugust.offsets.get(notes)
    return (
     `<article onclick="_.com.ejaugust.scroller.setRouteID(0n); _.com.ejaugust.www.setRouteID(${noteRouteID}n)">` + (
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