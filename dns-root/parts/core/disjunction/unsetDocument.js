const currentChoice = part.choice[LAYER]

if (currentChoice) {
 if (typeof currentChoice.onunsetdocument === "function")
  await currentChoice.onunsetdocument()
 await currentChoice.unsetDocument(LAYER)
 part.choice[LAYER] = undefined
}