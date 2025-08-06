const visibleControl = document.querySelector("#era-control")

if (visibleControl) {
 visibleControl.setAttribute("data-state", part.stateData)
 document.querySelector("#era-control .label2").innerHTML = part.title
}