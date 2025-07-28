if (part.dirty && part.justEnabled) {

 // Add parent view before adding own.
 part[".."]?.collectAddView()

 if (part.isOpen)
  part.addView()

 for (const callback of part.callbacks.add)
  callback()
}