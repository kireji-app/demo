if (hydrated) {
 document.getElementById("current-state-ecosystem").textContent = SENDER.routeID
 document.getElementById("current-hash-ecosystem").textContent = encodeSegment(SENDER.routeID)
 document.getElementById("current-encoded-pathname").textContent = encodePathname(SENDER.routeID)
}