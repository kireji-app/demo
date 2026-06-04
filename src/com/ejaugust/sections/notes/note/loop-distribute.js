if (thisNote.enabled) {
 if (thisNote.isOpen)
  thisNote.loop?.(_.now)

 for (const subpart of thisNote)
  subpart.distributeLoop()
}