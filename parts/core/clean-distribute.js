if (part.dirty) {
 delete part.dirty

 for (const subpart of part)
  subpart.distributeClean()
}