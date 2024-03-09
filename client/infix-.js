const
 field = echo('+<input>+')[0],
 group = new Set([echo('text-cursor')[0]]),
 make = html => {
  group.add(say(html)[0])
 },
 update = () => {
  group.forEach(e => e.remove());

  atob(expressions).ungroup().forEach(e => {
   e.parseExpression({
    word: _ => make(`<numeral- word=${_}>`),
    fallback: (_, key) => make(`<${key}- content=${btoa(_)}>`)
   })
  })
  make('<text-cursor>');
 };

field.value = atob(expressions)
if (focus === 'true') field.focus()

this.onpointerdown = e => {
 e.preventDefault()
 if (focus === 'true') return
 $focus('true')
 field.focus()
}

field.onblur = () => {
 $focus('false')
}

field.oninput = () => {
 $expressions(btoa(field.value));
 update();
}

field.onkeydown = e => {
 log(e.key)
 if (e.key === 'Escape' || e.key === 'Enter')
  field.blur()
}

update()