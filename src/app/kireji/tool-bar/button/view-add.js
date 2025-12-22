if (hydrated) {
 document.querySelector(`tool-bar>button:nth-child(${part.index + 1})`).setAttribute("data-selected", "")
 /** @type {IPartOutliner<IKirejiAppSidebar>} */
 const newView = sidebar[part.key]
 sidebar.headerElement.textContent = newView.title
 sidebar.viewElement.querySelector("scroller->scroll-content").innerHTML = newView.recursiveItemHTML(newView.dummySubject, 0, true)
 newView.scroller.resume()
}