if (part.dirty && part.justDisabled) {

 // Remove own view before removing parent.
 if (part.isOpen)
  part.removeView()

 part.notify("remove")

 part[".."]?.collectRemoveView()
}