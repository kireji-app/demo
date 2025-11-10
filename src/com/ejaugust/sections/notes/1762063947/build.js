note.define({
 listener: {
  value() {
   if (client.hydrated) {
    document.getElementById("current-state-ecosystem").textContent = _.routeID
    document.getElementById("current-hash-ecosytem").textContent = encodeSegment(_.routeID)
    document.getElementById("current-encoded-pathname").textContent = encodePathname(_.routeID)
   }
  }
 }
})