const
 group = new Set(),
 expressions = archive[word][rootword],
 make = html => {
  group.add(say(html)[0])
 },
 update = () => {
  group.forEach(e => e.remove());
  group.add(say(`<part-menu label="${rootword}">`)[0])
  expressions.forEach((e,i) => {
   make(`<sub-part open word="${word}" rootword="${rootword}" index=${i}>`)
  })
  group.add(echo(`infix-`)[0])
 };

this.onpointerdown = e => {
 $focus('true')
}

update()