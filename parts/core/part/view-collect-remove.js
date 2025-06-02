if (part.dirty && part.justDisabled) {

 // Remove own view before removing parent.
 part.removeView()

 part[".."]?.collectRemoveView()
}