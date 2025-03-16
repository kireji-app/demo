super()

if (part.previousChoice) {
 if (typeof part.previousChoice.onunsetdocument === "function")
  await part.previousChoice.onunsetdocument()
 await part.previousChoice.unsetDocument(LAYER)
 delete part.previousChoice
}

await part.choice[LAYER].setDocumentLeafward(LAYER)