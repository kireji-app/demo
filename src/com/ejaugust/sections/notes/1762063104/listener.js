if (hydrated) {
 document.getElementById("current-state-app").textContent = SENDER.routeID
 document.getElementById("current-hash-app").textContent = `"${encodeSegment(SENDER.routeID)}"`
}