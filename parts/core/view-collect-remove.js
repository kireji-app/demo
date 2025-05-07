if (part.justDisabled) {
 part.removeView()
 part.parent?.collectRemoveView()
}