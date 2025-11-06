// Run own loop method before running subpart loop methods.
if (part.isOpen)
 part.loop?.(_.now)

for (const subpart of part)
 subpart.distributeLoop()