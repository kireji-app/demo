const visibleControl = document.querySelector("#color-control")

if (visibleControl) {
 visibleControl.setAttribute("data-state", part.stateData)
 document.querySelector("#color-control .label2").innerHTML = part.title
 document.querySelector("#color-control .handle").innerHTML = part.unicode
}