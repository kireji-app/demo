if (part.dirty) {

 // Remove subpart views before removing own.
 for (const subpart of part)
  subpart.distributeRemoveView()

 if (!part.enabled) {

  if (part.isOpen)
   part.removeView()

  part.notify("remove")
 }
}