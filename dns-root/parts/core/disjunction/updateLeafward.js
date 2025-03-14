super()

if (part.previousChoice) {
 await part.previousChoice?.unsetDocument(LAYER)
 delete part.previousChoice
}

await part.choice[LAYER].updateLeafward(LAYER)