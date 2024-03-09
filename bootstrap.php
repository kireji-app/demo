<?

const MODULES = [
 'header',
 'style',
 'utils',
 'tabs',
 'matrix.temp',
 'pascal',
 'shape',
 'primatives',
 'debug',
 'core',
];

foreach (MODULES as $filename) {
 include $filename . '.php';
}

?>
<script>
 Core.initialize().then(() => {
  const projectsMenu = document.createElement('menu');
  const manifestSection = document.createElement('section');
  const cores = Utils.cache('cores', 'cube3d').split(',');
  const instances = [
   new Core(Utils.cache('core base','{}')),...cores.map(
   name => new Core({
    ...JSON.parse(Utils.cache('core ' + name, '{"name":"' + name + '","width":64,"height":64}'))
   })
  )];
  document.body.append(...instances.map( i => i.root ));
  projectsMenu.innerHTML = `<h1>Projects</h1>`;
  manifestSection.innerHTML = `<h1>Manifest</h1>`;
  manifestSection.append(...instances.map(Tabs.getCode));
  const stateHead = manifestSection.appendChild(document.createElement('h1'));
  stateHead.innerText = `State`;
  manifestSection.append(...instances.map(Tabs.getState));
  projectsMenu.append(
   ...[...document.body.childNodes].map(Tabs.getButton),
   (addBtn => {
    addBtn.innerText = 'New Project';
    addBtn.setAttribute('class','tab btn')
    addBtn.onclick = e => {
     const
      core = Core.add(),
      coreRoot = core?.root;
     if (!core) return;
     cores.push(core.name);
     Utils.updateCache('cores',cores);
     manifestSection.before(coreRoot);
     const code = Tabs.getCode(core);
     const state = Tabs.getState(core);
     const tabBtn = Tabs.getButton(coreRoot);
     stateHead.before(code);
     manifestSection.append(state);
     addBtn.before(tabBtn);
     Tabs.tab(tabBtn,core.name);
    }
    return addBtn;
   })(document.createElement('button'))
  );
  document.body.append(manifestSection,projectsMenu);
  Tabs.startTab();
 })
</script>