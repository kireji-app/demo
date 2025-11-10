if (client.hydrated) {
 document.querySelector("#notebook-section").innerHTML = note["article.html"]
 document.querySelector("#note-title").innerHTML = note.title ?? "Untitled Note"
 document.querySelector("#note-subtitle").innerHTML = note.subtitle ?? ""
 document.querySelector("#note-credit").innerHTML = note["credit.html"]
 document.title = ejaugust.title
 document.querySelector(`meta[name="description"]`).setAttribute("content", ejaugust.descriptionMeta)
 document.getElementById("application-css").innerHTML = ejaugust["inline.css"]
 const canonicalURL = note.canonicalURL
 document.querySelector(`link[rel="canonical"]`).setAttribute("href", canonicalURL)
 document.getElementById("footer-top").href = `${canonicalURL}#top`
}