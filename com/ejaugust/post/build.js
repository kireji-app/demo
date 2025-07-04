const markupReductionFactor = 0.80
const averageWordsPerMinute = 220
const averageWordLength = 7

const estimatedWordCharacters = post["post.html"].length * markupReductionFactor
const averageCharactersPerMinute = averageWordLength * averageWordsPerMinute

Object.defineProperties(post, {
 unixTimestamp: { value: parseInt(post.domains[0]) },
 readingLength: { value: estimatedWordCharacters / averageCharactersPerMinute },
})