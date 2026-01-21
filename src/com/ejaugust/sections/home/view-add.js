if (hydrated) {
 Q("#notebook-section").innerHTML = home["part.html"]
 document.title = ejaugust.title
 Q(`meta[name="description"]`).setAttribute("content", ejaugust.descriptionMeta)
 Q("#application-css").innerHTML = ejaugust["part.css"]
 const canonicalURL = home.canonicalURL
 Q(`link[rel="canonical"]`).setAttribute("href", canonicalURL)
 Q("#footer-top").href = `${canonicalURL}#top`
}