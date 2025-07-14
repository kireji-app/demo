if (part.dirty) {

 // Always populate own view before populating child.
 if (part.enabled) {
  part.populateView()

  for (const subpart of part)
   subpart.distributePopulateView()
 }

}