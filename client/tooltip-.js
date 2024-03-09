const
 span = echo('+<span>tooltip</span>+')[0],
 update = ({ x, y, depth, node }) => {
  $depth(depth);
  if (display === 'gone' || depth > 0) return;
  this.style.setProperty('--x', x + 'px');
  this.style.setProperty('--y', y + 'px');
  this.style.setProperty('--depth', depth);
 };
followMouse(update, { x: 0, y: 0, depth: 0, node: this });

on.tip = msg => {
 if ((msg === null) !== (display === 'gone')) $display(msg === null ? 'gone' : 'here')
 span.textContent = msg;
}