Q("#notebook-section").innerHTML = thisNote["part.html"]
Q("#note-title").innerHTML = thisNote.title ?? "Untitled Note"
Q("#note-subtitle").innerHTML = thisNote.subtitle ?? ""
Q("#note-credit").innerHTML = thisNote["credit.html"]
Q("#part-title").textContent = Q(`.task[data-host="${EJAugust.host}"]>.title`).textContent = document.title = EJAugust.title
Q(`meta[name="description"]`).setAttribute("content", EJAugust.descriptionMeta)
Q("#part-css").innerHTML = EJAugust["part.css"]
Q(`link[rel="canonical"]`).setAttribute("href", thisNote.canonicalURL)
Q("#footer-top").href = `${thisNote.canonicalURL}#top`
thisNote.hydrateView()