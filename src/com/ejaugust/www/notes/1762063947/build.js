note.define({
 listener: {
  value() {
   if (client.hydrated) {
    document.getElementById("current-state-platform").textContent = _.routeID
    document.getElementById("current-hash-platform").textContent = encodeSegment(_.routeID)
    document.getElementById("current-encoded-route").textContent = encodeRoute(_.routeID)
   }
  }
 }
})