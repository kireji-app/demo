if (note.enabled) {
 if (note.isOpen)
  part.loop?.(now)

 for (const subpart of note)
  subpart.distributeLoop()
}