pointer.handle({
 click() {
  document.getElementById(TARGET_ELEMENT.name).scrollIntoView({
   behavior: 'smooth',
   block: 'center',
   inline: 'center'
  })
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})