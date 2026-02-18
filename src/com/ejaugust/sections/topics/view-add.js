Q("#notebook-section").innerHTML = allTopics["part.html"]
Q("#application-title").textContent = Q(`.task[data-host="${ejaugust.host}"]>.title`).textContent = document.title = ejaugust.title
Q(`meta[name="description"]`).setAttribute("content", ejaugust.descriptionMeta)
Q("#application-css").innerHTML = ejaugust["part.css"]
Q(`link[rel="canonical"]`).setAttribute("href", allTopics.canonicalURL)
Q("#footer-top").href = `${allTopics.canonicalURL}#top`