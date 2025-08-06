if (part.dirty) {

 // Populate parent view before populating own.
 part[".."]?.collectPopulateView()

 if (part.enabled) {

  if (part.isOpen)
   part.populateView()

  for (const callback of part.callbacks.populate)
   callback()
 }
}