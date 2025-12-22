sidebar.headerElement = document.querySelector("#sidebar-view-header") ?? (() => {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = sidebar["header.html"]
 return offscreen.querySelector("#sidebar-view-header")
})()

sidebar.viewElement = document.querySelector("#sidebar-view") ?? (() => {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = sidebar["view.html"]
 return offscreen.querySelector("#sidebar-view")
})()