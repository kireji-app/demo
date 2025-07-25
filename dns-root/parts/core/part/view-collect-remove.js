if (part.dirty && part.justDisabled) {

 // Remove own view before removing parent.
 part.removeView()

 for (const callback of part.callbacks.remove)
  callback()

 part[".."]?.collectRemoveView()
}