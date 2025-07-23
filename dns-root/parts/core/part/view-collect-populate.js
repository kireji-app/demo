if (part.dirty) { // Always true, but included for clarity.

 // Populate parent view before populating own.
 part[".."]?.collectPopulateView()

 if (part.enabled) {
  part.populateView()

  for (const callback of part.callbacks.populate)
   callback()
 }
}