if (sidebar.open.routeID === 1n) {
 /** @type {IPartOutliner<IKirejiAppSidebar>} */
 const chosenView = sidebar[sidebar.view.arm.key]
 document.getElementById("sidebar-view-header").textContent = chosenView.title
 // TODO: Call view methods or similar on the part outliner in order to fully activate its scroller, etc. This is similar to an add view process but for a part which has its state stored even when the view is removed.
 const scrollContent = document.querySelector("sidebar-view>scroller->scroll-content")
 scrollContent.innerHTML = chosenView.recursiveItemHTML(chosenView.dummySubject, 0, true)
}