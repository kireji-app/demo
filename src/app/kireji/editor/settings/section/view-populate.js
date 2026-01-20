if (hydrated) {
 const detailsElement = document.querySelector(`#info-${part.key}`)

 if (detailsElement) {
  if (part.model)
   detailsElement.setAttribute("open", "")
  else
   detailsElement.removeAttribute("open")
 }
}