const slotManifest = part["slot.json"]

if (!slotManifest)
 throw new ReferenceError(`Slot missing slot.json manifest (${part.host}).`)

