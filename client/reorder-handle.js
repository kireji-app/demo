const
 // TODO: actual target, instead of only depths 0 and 1
 initial = { x: 0, y: 0 },
 target = this.get('parent') === 0 ? host : host.hostNode,
 update = pos => {
  target.style.setProperty('--drag-x', pos.x);
  target.style.setProperty('--drag-y', pos.y);
 },
 toggle = (on, pos) => {
  target[`${on ? '' : 'un'}set`]('dragging')
  if (!on) {
   target.style.removeProperty('--drag-x');
   target.style.removeProperty('--drag-y');
   target.style.removeProperty('--old-x');
   target.style.removeProperty('--old-y');
  } else {
   target.style.setProperty('--old-x', pos.x);
   target.style.setProperty('--old-y', pos.y);
  }
 };

let enabled = false;
enableDrag(update, initial, toggle);
toggle(false)