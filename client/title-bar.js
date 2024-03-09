const buttons = { }, partName = say('<h1 id=partname>')[0], appName = say('<h1 id=appname>core.parts</h1>'), version = say('<version-pill>')[0]

let active = undefined;

on.tabs(tabs => {
 Object.values(buttons).forEach(button => button.remove());
 const words = tabs.split(' ');
 words.forEach(word => {
  const glyph = buttons[word] = say(`<glyph- word=${word}>`)[0];
  glyph.onclick = () => {
   $tab(word)
   state('tab')
   active?.unset('selected')
   active = glyph
   active.set('selected','true')
  }
 })
 if (tab in buttons) {
  state('tab')
  active?.unset('selected')
  active = buttons[tab]
  active.set('selected','true')
 } else if (words.length > 0) {
  $tab(words[0])
  state('tab')
  active?.unset('selected')
  active = buttons[tab]
  active.set('selected','true')
 } else {
  error('No tabs.')
 }
})

on.clear(word => {
 partName.innerText = word
})