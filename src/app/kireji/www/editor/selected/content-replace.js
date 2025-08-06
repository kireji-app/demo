document.querySelector("part-editor>scroller->scroll-content").innerHTML = selected["inline.html"]
document.querySelector("part-outliner summary[data-selected]").removeAttribute("data-selected")
document.querySelector(`part-outliner summary[data-index="${selected.routeID}"]`).setAttribute("data-selected", "")