pointer.handle({
 click() {
  orbitalGame.resetModel()
  orbitalGame.playAsync()
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})