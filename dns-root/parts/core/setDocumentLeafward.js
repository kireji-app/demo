if (part.previousPrimaryState === -1n) {
 await part.setDocument(LAYER)
 if (typeof part.onsetdocument === "function")
  await part.onsetdocument()
}