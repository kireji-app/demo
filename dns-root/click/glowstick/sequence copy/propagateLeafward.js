super(STATE)

part.playing = (STATE % part.step) === 0n

if (LAYER === root.primaryLayer)
 await part.updateDocument(LAYER)