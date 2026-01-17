pointer.handle({
 click() {
  navigator.clipboard.writeText(TARGET_ELEMENT.firstChild.innerHTML)
  TARGET_ELEMENT.setAttribute("data-copied", "")
  setTimeout(() => TARGET_ELEMENT.removeAttribute("data-copied"), 1000)
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})