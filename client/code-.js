const
 tabs = {},
 tabgroup = say('<div id=tabs>')[0],
 output = say('<code-editor>')[0],
 welcome = say('<code-welcome>')[0],
 newTab = name => {
  const tab = say('<div class=tab>' + name)[0]
  tabs[name] = tab
  tabgroup.appendChild(tab)
  const closebtn = say('<button>✕')[0]
  tab.appendChild(closebtn)
  closebtn.onmousedown = event => {
   event.preventDefault()
   closeTab(name)
   saveTabs()
  }
  tab.onclick = () => {
   setTab(name)
   saveTab(name)
  }
 },
 closeTab = name => {
  const tab = tabs[name];
  let fallback = false;
  if (active === tab) fallback = true;
  tab.remove();
  delete tabs[name];
  if (fallback) {
   let options = Object.keys(tabs);
   if (options.length === 0) {
    $file('-1')
    output.buffer();
   }
   else {
    DO['open file'](options.at(-1))
   }
  }
 },
 setTab = name => {
  active?.unset('open')
  active = tabs[name]
  active.set('open')
  output.buffer(name)
 },
 saveTabs = () => {
  $files(Object.keys(tabs).join(' '))
 },
 saveTab = name => {
  const index = Object.keys(tabs).indexOf(name);
  $file(index)
 }

let active = undefined;

if (tabs && tabs !== '') {
 const initial = files === '' ? [] : files.split(' ');
 initial.forEach(name => {
  newTab(name)
 })
 if (file && file !== '-1') {
  console.log(file);
  const index = parseInt(file);
  setTab(initial[index]);
 }
}

ON['open file'](name => {
 if (!(name in tabs)) {
  newTab(name)
  saveTabs()
 }
 setTab(name)
 saveTab(name)
})