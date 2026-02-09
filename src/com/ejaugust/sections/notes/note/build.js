const markupReductionFactor = 0.80
const averageWordsPerMinute = 220
const averageWordLength = 7
const noteDataLength = (note["note.html_.js"] ?? note["note.html"] ?? "").length
const estimatedWordCharacters = noteDataLength * markupReductionFactor
const averageCharactersPerMinute = averageWordLength * averageWordsPerMinute

note.define({
 unixTimestamp: { value: note.domains[0] },
 readingLength: { value: estimatedWordCharacters / averageCharactersPerMinute },
})