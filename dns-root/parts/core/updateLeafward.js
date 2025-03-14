if (part.previousPrimaryState === -1n)
 await part.setDocument(LAYER)

if (part.state[LAYER] !== -1n)
 await part.updateDocument(LAYER)