if (hydrated) {
 document.getElementById("notebook-section").innerHTML = home["part.html"]
 document.title = ejaugust.title
 document.querySelector(`meta[name="description"]`).setAttribute("content", ejaugust.descriptionMeta)
 document.getElementById("application-css").innerHTML = ejaugust["part.css"]
 const canonicalURL = home.canonicalURL
 document.querySelector(`link[rel="canonical"]`).setAttribute("href", canonicalURL)
 document.getElementById("footer-top").href = `${canonicalURL}#top`
}