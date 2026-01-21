if (hydrated) {
 Q("#notebook-section").innerHTML = note["part.html"]
 Q("#note-title").innerHTML = note.title ?? "Untitled Note"
 Q("#note-subtitle").innerHTML = note.subtitle ?? ""
 Q("#note-credit").innerHTML = note["credit.html"]
 document.title = ejaugust.title
 Q(`meta[name="description"]`).setAttribute("content", ejaugust.descriptionMeta)
 Q("#application-css").innerHTML = ejaugust["part.css"]
 const canonicalURL = note.canonicalURL
 Q(`link[rel="canonical"]`).setAttribute("href", canonicalURL)
 Q("#footer-top").href = `${canonicalURL}#top`
}