if (part.dirty) {

 // Add own view before adding child.
 if (part.justEnabled) {

  if (part.isOpen)
   part.addView()

  for (const callback of part.callbacks.add)
   callback()
 }

 for (const subpart of part)
  subpart.distributeAddView()
}