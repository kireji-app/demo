Pointer.handle({
 down() {
  const label = Q("#reticle .label")
  label.classList.remove("blinked")
  label.offsetWidth // force reflow to restart css animation
  label.classList.add("blinked")
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})