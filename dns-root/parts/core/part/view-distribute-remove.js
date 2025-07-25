if (part.dirty) {

 // Remove child views before removing this one.
 for (const subpart of part)
  subpart.distributeRemoveView()

 if (!part.enabled) {
  part.removeView()

  for (const callback of part.callbacks.remove)
   callback()
 }
}