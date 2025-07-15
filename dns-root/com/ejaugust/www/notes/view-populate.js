if (_.application === _.com.ejaugust.www && client.hydrated) {
 document.querySelector("#notebook-section").innerHTML = note["article.html"]
 document.querySelector("#note-title").innerHTML = note.title ?? "Untitled Note"
 document.querySelector("#note-subtitle").innerHTML = note.subtitle ?? ""
 document.querySelector("#note-credit").innerHTML = note["credit.html"]
}