base()

for (const element of document.querySelectorAll(".copyable")) {
 element.onclick = () => {
  navigator.clipboard.writeText(element.firstChild.innerHTML)
  element.setAttribute("data-copied", "")
  setTimeout(() => element.removeAttribute("data-copied"), 1000)
 }
}