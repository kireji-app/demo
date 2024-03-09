// create the views
const
 // views asking to be here become tab buttons
 buttons = incoming(
  word => {
   const node = say(`<${word} class=tab>`)[0]
   node.on('click', () => mutate(word))
   return node
  }
 ),
 history = echo('history-')[0],
 partGlyph = echo('glyph-')[0],
 partName = say('<h1 id=partname>')[0],
 version = say('<version-pill>')[0];
// variable 'tab' is view model
const
 unmark = () => marked?.unset('selected'),
 mutate = $ => { unmark(); $tab($); marked = mark() },
 mark = () => {
  buttons[tab].set('selected')
  DO['goto tab'](tab)
  return buttons[tab]
 };
let marked = mark()
// handle variables with initial values
// respond to external runtime events
ON['open model'](word => {
 warning(word)
 partName.innerText = word
 partGlyph.set('word', word)
 mutate('model-explorer')
})