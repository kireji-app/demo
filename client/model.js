const
 icon = say(`<glyph- word="${word}">`)[0],
 count = backlinks.get(word)?.size ?? 0,
 label = say(`<label>${word}${count ? `&nbsp;${count}` : ''}`)[0];