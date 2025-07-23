if (part.dirty) {

 // Always populate own view before populating child.
 if (part.enabled) {
  part.populateView()

  for (const callback of part.callbacks.populate)
   callback()

  for (const subpart of part)
   subpart.distributePopulateView()
 }

}