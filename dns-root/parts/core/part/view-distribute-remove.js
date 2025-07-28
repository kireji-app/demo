if (part.dirty) {

 // Remove child views before removing own.
 for (const subpart of part)
  subpart.distributeRemoveView()

 if (!part.enabled) {

  if (part.isOpen)
   part.removeView()

  for (const callback of part.callbacks.remove)
   callback()
 }
}