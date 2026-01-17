pointer.handle({
 click() {
  if (TARGET_ELEMENT === menu.element || TARGET_ELEMENT === menu.button)
   menu.arm.handleEndPlayback()
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})