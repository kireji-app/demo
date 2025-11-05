scroller.onscroll()
const ratio = scroller.container.scrollHeight / scroller.container.clientHeight
const precisionFactor = 100_000

scroller.scrollBar.style.setProperty("--ratio", ratio)

if (Math.round(ratio * precisionFactor) === precisionFactor)
 scroller.scrollBar.setAttribute("disabled", "")
else if (scroller.scrollBar.hasAttribute("disabled"))
 scroller.scrollBar.removeAttribute("disabled")