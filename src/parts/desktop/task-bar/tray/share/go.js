return nav.share({
 title: document.title,
 url: location.href
}).catch(e => {
 if (e.name !== "AbortError")
  throw e
})

// TODO: Checkl if nav.share exists