const
 group = new Set(),
 expressions = archive[word][rootword],
 make = html => {
  group.add(say(html)[0])
 },
 update = () => {
  group.forEach(e => e.remove());
  group.add(say(`<part-menu label="${rootword}">`))
  expressions.ungroup().forEach(e => {
   e.parseExpression({
    word: _ => make(`<sub-part word=${_}>`),
    fallback: (_, key) => {
     make(`<${key}-part content="${btoa(_)}">`)
    }
   })
  })
 };

this.onpointerdown = e => {
 if (focus === 'true') return
 $focus('true')
}

update()