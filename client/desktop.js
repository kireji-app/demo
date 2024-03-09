const
 words = Object.keys(archive),
 nodes = say(words.reduce((html, word) => html + `<model-item word=${word}></model-item>`, ''));

let active = undefined;

nodes.forEach(node => {
 const word = node.get('word');
 let selected = selection === word;
 if (selected) {
  active = node
  active.set('selected')
  e.clear(word)
 }
 node.onclick = () => {
  selected = selection === word;
  if (!selected) {
   $selection(word)
   active?.unset('selected')
   active = node
   active.set('selected')
   e.clear(word)
  }
 }
})

if (!active) {
 const word = words[0];
 $selection(word)
}