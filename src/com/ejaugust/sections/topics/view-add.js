Q("#notebook-section").innerHTML = EJAugustTopics["part.html"]
Q("#part-title").textContent = Q(`.task[data-host="${EJAugust.host}"]>.title`).textContent = document.title = EJAugust.title
Q(`meta[name="description"]`).setAttribute("content", EJAugust.descriptionMeta)
Q("#part-css").innerHTML = EJAugust["part.css"]
Q(`link[rel="canonical"]`).setAttribute("href", EJAugustTopics.canonicalURL)
Q("#footer-top").href = `${EJAugustTopics.canonicalURL}#top`