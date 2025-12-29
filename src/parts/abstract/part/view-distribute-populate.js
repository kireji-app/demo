if (part.dirty) {

 // Populate own view before populating subpart views.
 if (part.enabled) {

  if (part.isOpen)
   part.populateView()

  for (const subpart of part)
   subpart.distributePopulateView()

  part.notify("populate")
 }
}