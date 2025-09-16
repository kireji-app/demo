// Run own loop method before running subpart loop methods.
if (part.isOpen)
 part.loop?.(now)

for (const subpart of part)
 subpart.distributeLoop()