const
 html = moments[index].stack.node.map(node=>node.isPart ? `<glyph- word=${node.word} show-tip></glyph->` : '').join(''),
 glyphs = html && html !== '' ? say(html) : [];