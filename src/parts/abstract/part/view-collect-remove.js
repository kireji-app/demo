if (part.dirty && part.justDisabled) {

 // Remove own view before removing parent.
 if (part.isOpen)
  part.removeView()

 for (const callback of part.callbacks.remove)
  callback()

 part[".."]?.collectRemoveView()
}