note.define({
 listener: {
  value() {
   if (client.hydrated) {
    document.getElementById("current-state-app").textContent = _.com.ejaugust.routeID
    document.getElementById("current-hash-app").textContent = `"${encodeSegment(_.com.ejaugust.routeID)}"`
   }
  }
 }
})