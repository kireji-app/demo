if (SENDER.disabled) {
 Q("#info-state").setAttribute("disabled", "")
 Q("#live-route-id").textContent = -1n
 Q("#live-route-hash").innerHTML = ""
 Q("#live-model").textContent = ""
} else {
 Q("#info-state").removeAttribute("disabled")
 Q("#live-route-id").textContent = SENDER.routeID
 Q("#live-route-hash").innerHTML = encodeSegment(SENDER.routeID) || "&nbsp;"
 Q("#live-model").textContent = serialize(SENDER.model)
}