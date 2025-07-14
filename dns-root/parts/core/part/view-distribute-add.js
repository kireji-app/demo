if (part.dirty) {

 // Add my own view before adding child.
 if (part.justEnabled)
  part.addView()

 for (const subpart of part)
  subpart.distributeAddView()
}