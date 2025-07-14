
return notesDate.map(note => {
 const noteRouteID = notesDate.offsets.get(note) + ejaugust.offsets.get(ejaugust.notes)
 return `<a class=notebook-title href="https://www.ejaugust.com/my-first-node-111fake-link" onclick="_.noop(event); _.com.ejaugust.www.setRouteID(${noteRouteID}n)">${note.title}</a>`
}).join("<br>")