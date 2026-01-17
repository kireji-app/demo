if (SENDER.disabled) {
 document.getElementById("info-state").setAttribute("disabled", "")
 document.getElementById("live-route-id").textContent = -1n
 document.getElementById("live-route-hash").innerHTML = ""
 document.getElementById("live-model").textContent = ""
} else {
 document.getElementById("info-state").removeAttribute("disabled")
 document.getElementById("live-route-id").textContent = SENDER.routeID
 document.getElementById("live-route-hash").innerHTML = encodeSegment(SENDER.routeID) || "&nbsp;"
 document.getElementById("live-model").textContent = serialize(SENDER.model)
}