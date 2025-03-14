super()

console.log('update leafward on disjunction ' + part.host, { previousChoice: part.previousChoice })

if (part.previousChoice) {
 console.log('unsetting https://' + part.previousChoice.host + ' from https://' + part.host)
 await part.previousChoice?.unsetDocument(LAYER)
 delete part.previousChoice
}

await part.choice[LAYER].updateLeafward(LAYER)