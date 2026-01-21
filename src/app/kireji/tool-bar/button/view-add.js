if (hydrated) {
 Q(`tool-bar>button:nth-child(${part.index + 1})`).setAttribute("data-active", "")
 /** @type {IPartOutliner<IKirejiAppSidebar>} */
 const newView = sidebar[part.key]
 sidebar.element.innerHTML = sidebar["view.html"]
 newView.scroller.addView()
}