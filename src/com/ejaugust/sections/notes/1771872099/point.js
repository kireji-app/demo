pointer.handle({
 click() {
  note.isPlaying = !note.isPlaying
  Q("#anim-button").setAttribute("data-playing", note.isPlaying)
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})