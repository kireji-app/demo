const
 w = host.word === 'sub-part' ? host.code : this.get('word'),
 icon = say(`<glyph- word="${w}">`)[0],
 count = backlinks.get(w)?.size ?? 0,
 label = say(`<label>${w}${count ? `&nbsp;${count}` : ''}`)[0];

this.on('click', () => DO['open model'](w))