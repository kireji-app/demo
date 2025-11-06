if (note.enabled) {
 if (note.isOpen)
  part.loop?.(_.now)

 for (const subpart of note)
  subpart.distributeLoop()
}