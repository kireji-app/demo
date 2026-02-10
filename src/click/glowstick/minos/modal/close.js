function close() {
 const closedRouteID = minosModal.modelToRouteID("none")
 minosModal.setRouteID(closedRouteID)
}

if (!POINTER_EVENT) {
 close()
 return
}

pointer.handle({
 click() {
  close()
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})