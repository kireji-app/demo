/** @type {IPartOutliner<IKirejiAppSidebar>} */
const oldView = sidebar[part.key]
oldView.scroller.removeView()
Q(`tool-bar>button:nth-child(${part.index + 1})`).removeAttribute("data-active")