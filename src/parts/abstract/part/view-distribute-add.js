if (part.dirty) {

 // Add own view before adding child.
 if (part.justEnabled) {

  if (part.isOpen)
   part.addView()

  part.notify("add")
 }

 for (const subpart of part)
  subpart.distributeAddView()
}