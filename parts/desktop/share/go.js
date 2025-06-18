if (!facet.supported)
 throw "attempted to use share facet outside of supported environment"

return nav.share({
 title: document.title,
 url: location.href
}).catch(e => {
 if (e.name !== "AbortError")
  throw e
})