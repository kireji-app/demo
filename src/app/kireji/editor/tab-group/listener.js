document.getElementById("live-route-id").textContent = SENDER.routeID/*.toLocaleString()*/
document.getElementById("live-route-hash").innerHTML = encodeSegment(SENDER.routeID) || "&nbsp;"
document.getElementById("live-model").textContent = serialize(SENDER.model)