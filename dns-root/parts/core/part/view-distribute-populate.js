if (part.dirty) {

 // Populate own view before populating child.
 if (part.enabled) {

  if (part.isOpen)
   part.populateView()

  for (const callback of part.callbacks.populate)
   callback()

  for (const subpart of part)
   subpart.distributePopulateView()
 }
}