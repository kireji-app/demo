if (hydrated) {
 Q("#current-state-ecosystem").textContent = SENDER.routeID
 Q("#current-hash-ecosystem").textContent = encodeSegment(SENDER.routeID)
 Q("#current-encoded-pathname").textContent = encodePathname(SENDER.routeID)
}