Q("#notebook-section").innerHTML = home["part.html"]
Q("#application-title").textContent = document.title = ejaugust.title
Q(`meta[name="description"]`).setAttribute("content", ejaugust.descriptionMeta)
Q("#application-css").innerHTML = ejaugust["part.css"]
Q(`link[rel="canonical"]`).setAttribute("href", home.canonicalURL)
Q("#footer-top").href = `${home.canonicalURL}#top`