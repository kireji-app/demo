if (hydrated) {
 Q("#current-state-app").textContent = SENDER.routeID
 Q("#current-hash-app").textContent = `"${encodeSegment(SENDER.routeID)}"`
}