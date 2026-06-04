Pointer.handle({
 click() {
  thisNote.isPlaying = !thisNote.isPlaying
  Q("#anim-button").setAttribute("data-playing", thisNote.isPlaying)
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})