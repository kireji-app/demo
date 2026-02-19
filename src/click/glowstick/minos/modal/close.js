function close() {
 minosModal.setModel("none")
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