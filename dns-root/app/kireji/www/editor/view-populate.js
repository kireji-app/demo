if (_.application === _.app.kireji.www) {
 document.querySelector("part-editor").outerHTML = editor["inline.html"]
 document.querySelector("part-outliner summary[data-selected]").removeAttribute("data-selected")
 document.querySelector(`part-outliner summary[data-index="${editor.routeID}"]`).setAttribute("data-selected", "")
}