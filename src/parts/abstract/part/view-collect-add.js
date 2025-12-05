if (part.dirty && part.justEnabled) {

 // Add parent view before adding own.
 part[".."]?.collectAddView()

 if (part.isOpen)
  part.addView()

 part.notify("add")
}