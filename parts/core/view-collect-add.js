if (part.dirty && part.justEnabled) {

 // Add parent view before adding own.
 part.parent?.collectAddView()

 part.addView()
}