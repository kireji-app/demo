/** @type {IPartOutliner<IKirejiAppSidebar>} */
const chosenView = sidebar[sidebar.view.arm.key]
return sidebar.view["part.html"] +
 (chosenView ? `<h2 id=sidebar-view-header>${chosenView.title}</h2>${chosenView["part.html"]}` : "") +
 sidebar.width["part.html"]