Pointer.handle({
 click() {
  OrbitalGame.resetModel()
  OrbitalGame.playAsync()
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})