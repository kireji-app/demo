Q("#notebook-section").innerHTML = EJAugustHome["part.html"]
Q("#part-title").textContent = Q(`.task[data-host="${EJAugust.host}"]>.title`).textContent = document.title = EJAugust.title
Q(`meta[name="description"]`).setAttribute("content", EJAugust.descriptionMeta)
Q("#part-css").innerHTML = EJAugust["part.css"]
Q(`link[rel="canonical"]`).setAttribute("href", EJAugustHome.canonicalURL)
Q("#footer-top").href = `${EJAugustHome.canonicalURL}#top`