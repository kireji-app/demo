const
 html = Object.keys(buffers).reduce((html, buffername) => html + `<file-item buffername=${buffername}></file-item>`, ''),
 files = new Set(say(html)),
 dblClickTime = 250,
 selected = new Set(selection.split(' ')),
 selectedNodes = new Set(),
 saveSelection = () => $selection([...selected].join(' '));

let doubleClickTarget = undefined, shift = false

files.forEach(file => {
 const name = file.buffername;
 let amongSelected = selected.has(name)
 if (amongSelected) {
  file.set('selected')
  selectedNodes.add(file)
 }
 file.onclick = () => {
  amongSelected = selected.has(name);
  if (shift && amongSelected) { selected.delete(name); saveSelection(); file.unset('selected'); selectedNodes.delete(file) }
  else if (shift) { selected.add(name); saveSelection(); file.set('selected'); selectedNodes.add(file) }
  else if (!amongSelected) { selected.clear(); selected.add(name); saveSelection(); file.set('selected'); selectedNodes.forEach(node => node.unset('selected')); selectedNodes.clear(); selectedNodes.add(file) }
  if (file === doubleClickTarget) {
   log(location.href)
   window.open(`https://${location.hostname}/${name}`);
  }
  else {
   doubleClickTarget = file
   setTimeout(() => {
    doubleClickTarget = undefined
   }, dblClickTime)
  }
 }
})

document.addEventListener('keydown', event => { if (event.key === 'Shift') shift = true })
document.addEventListener('keyup', event => { if (event.key === 'Shift') shift = false })