const
 span = echo('+<span>TipError1</span>+')[0],
 attr = 'show';


ON['tooltip'] = tip => {
 if (tip === null) {
  this.unset(attr)
  span.textContent = ''
 }
 else {
  this.set(attr)
  span.textContent = tip
 }
}

followMouse(({ x, y, depth }) => {
 this.set('depth', depth);
 //if (!this.has(attr) || depth > 0) return;
 this.style.setProperty('--x', x + 'px');
 this.style.setProperty('--y', y + 'px');
 this.style.setProperty('--depth', depth);
}, { x: 0, y: 0, depth: 0, node: this });