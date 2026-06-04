const markupReductionFactor = 0.80
const averageWordsPerMinute = 220
const averageWordLength = 7
const noteDataLength = (thisNote["note.html_.js"] ?? thisNote["note.html"] ?? "").length
const estimatedWordCharacters = noteDataLength * markupReductionFactor
const averageCharactersPerMinute = averageWordLength * averageWordsPerMinute

define(thisNote, {
 unixTimestamp: { value: thisNote.domains[0] },
 readingLength: { value: estimatedWordCharacters / averageCharactersPerMinute },
})