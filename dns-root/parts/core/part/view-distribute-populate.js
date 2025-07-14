if (part.dirty) {

 // Always populate own view before populating child.
 part.populateView()

 for (const subpart of part)
  subpart.distributePopulateView()

}