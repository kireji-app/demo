/*const
 nodes = say(moments.reduce((html, context, index) => html + `<context-item index=${index}></context-item>`, ''));

let active = undefined;

nodes.forEach(node => {
 const nodeIndex = node.get('index');
 let selected = selection === nodeIndex;
 if (selected) {
  active = node
  active.set('selected')
 }
 node.onclick = () => {
  selected = selection === nodeIndex;
  if (!selected) {
   $selection(nodeIndex)
   active?.unset('selected')
   active = node
   active.set('selected')
  }
 }
})

if (!active) {
 const nodeIndex = moments[0];
 $selection(nodeIndex)
}*/

warning('Time index not rendered. Need direct-to-index isolated scrolling renderer first.')