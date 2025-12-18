if (part.dirty) {
 part.dirty = false

 for (const subpart of part)
  subpart.distributeClean()
}