const
 field = echo('+<input>+')[0],
 symbols = [echo('text-cursor')[0]],
 update = () => {
  symbols.forEach(_ => _.remove());
  expressions.ungroup().forEach(_ => {
   symbols.push(echo(`+<character- code=${_.charCodeAt()}>+`)[0]);
  })
  symbols.push(echo('text-cursor')[0]);
 };

field.value = expressions
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
 $expressions(field.value);
 update();
}

field.onkeydown = e => {
 log(e.key)
 if (e.key === 'Escape' || e.key === 'Enter')
  field.blur()
}

update()