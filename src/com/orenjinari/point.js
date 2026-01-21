pointer.handle({
 click() {
  Q("#" + TARGET_ELEMENT.name).scrollIntoView({
   behavior: 'smooth',
   block: 'center',
  })
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})