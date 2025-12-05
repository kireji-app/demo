if (part.dirty) {

 // Populate parent view before populating own.
 part[".."]?.collectPopulateView()

 if (part.enabled) {

  if (part.isOpen)
   part.populateView()

  part.notify("populate")
 }
}