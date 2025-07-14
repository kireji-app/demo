const markupReductionFactor = 0.80
const averageWordsPerMinute = 220
const averageWordLength = 7

const estimatedWordCharacters = note["inline.html"].length * markupReductionFactor
const averageCharactersPerMinute = averageWordLength * averageWordsPerMinute

Object.defineProperties(note, {
 unixTimestamp: { value: note.domains[0] },
 readingLength: { value: estimatedWordCharacters / averageCharactersPerMinute },
})