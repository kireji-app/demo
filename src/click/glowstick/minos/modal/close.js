function close() {
 MinosModal.setModel("none")
}

if (!POINTER_EVENT) {
 close()
 return
}

Pointer.handle({
 click() {
  close()
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})