Q("#notebook-section").innerHTML = note["part.html"]
Q("#note-title").innerHTML = note.title ?? "Untitled Note"
Q("#note-subtitle").innerHTML = note.subtitle ?? ""
Q("#note-credit").innerHTML = note["credit.html"]
Q("#application-title").textContent = Q(`.task[data-host="${ejaugust.host}"]>.title`).textContent = document.title = ejaugust.title
Q(`meta[name="description"]`).setAttribute("content", ejaugust.descriptionMeta)
Q("#application-css").innerHTML = ejaugust["part.css"]
Q(`link[rel="canonical"]`).setAttribute("href", note.canonicalURL)
Q("#footer-top").href = `${note.canonicalURL}#top`
note.hydrateView()