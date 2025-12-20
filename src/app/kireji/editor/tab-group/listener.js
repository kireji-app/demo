document.getElementById("live-route-id").textContent = SENDER.routeID.toLocaleString()
document.getElementById("live-route-hash").textContent = encodeSegment(SENDER.routeID)
document.getElementById("live-model").textContent = serialize(SENDER.model)