if (hydrated) {
 const detailsElement = Q(`#info-${part.key}`)

 if (detailsElement) {
  if (part.model)
   detailsElement.setAttribute("open", "")
  else
   detailsElement.removeAttribute("open")
 }
}