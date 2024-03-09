<script>
 const Tabs = {
  start: 'cube3d',
  getNodes(name) {
   return document.querySelectorAll(`:not(menu)>.tab[name=${name}]`)
  },
  tab(node, name) {
   [...document.querySelectorAll('.tab[open]')].forEach(el => el.removeAttribute('open'));
   [...this.getNodes(name), node].forEach(el => {
    el.setAttribute('open', '');
    el.ontabbed?.();
   })
   if (name == this.start) localStorage.removeItem('tab')
   else localStorage.setItem('tab', name);
  },
  startTab() {
   const name = localStorage.tab ?? this.start,
    node = document.querySelector(`menu>.tab[name=${name}]`);
   this.tab(node, name);
  },
  getButton(core) {
   const button = document.createElement('button');
   button.innerText = core.name;
   button.onclick = event => Tabs.tab(event.target, event.target.name);
   button.setAttribute('name', core.name);
   button.setAttribute('class', 'tab btn');
   return button;
  },
  getCode(core) {
   const code = document.createElement('code');
   code.setAttribute('class', 'tab code');
   code.setAttribute('name', core.name);
   code.innerText = core.manifest;
   core.onmanifestchanged.push(core => {
    code.innerText = core.manifest;
   })
   return code;
  },
  getState(core) {
   const
    state = document.createElement('div'),
    p = state.appendChild(document.createElement('p'));
   p.innerText = JSON.stringify(core.attributes);
   state.setAttribute('class', 'tab state');
   state.setAttribute('name', core.name);
   core.onstatechanged.push(core => {
    p.innerText = JSON.stringify(core.attributes);
   })
   return state;
  }
 }
</script>