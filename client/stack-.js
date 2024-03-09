const
 html = moments[index].stack.node.map(node=>{
 return `<glyph- word=${node.word}></glyph->`
}).join(''),
 glyphs = say(html);