if (client.hydrated) {
 document.getElementById("notebook-section").innerHTML = section["inline.html"]
 document.title = ejaugust.title
 document.querySelector(`meta[name="description"]`).setAttribute("content", ejaugust.descriptionMeta)
 document.querySelector(`link[rel="canonical"]`).setAttribute("href", `https://${_.application.host}${_.application.canonicalPathname ?? "/"}`)
 document.getElementById("application-css").innerHTML = ejaugust["inline.css"]
}