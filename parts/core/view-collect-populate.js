if (part.dirty) { // Always true, but included for clarity.

 // Populate parent view before populating own.
 part.parent?.collectPopulateView()

 if (part.enabled)
  part.populateView()
}