/** @type {IPartOutliner<IKirejiAppSidebar>} */
const oldView = sidebar[part.key]
oldView.scroller.pause()
document.querySelector(`tool-bar>button:nth-child(${part.index + 1})`).removeAttribute("data-selected")