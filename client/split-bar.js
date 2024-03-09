let dimensionRef;

const
 horizontal = this.word === 'h-rule',
 initial = horizontal ? ['bottom', { y: offset }] : ['right', { x: offset }],
 update = ({ x, y }, widthIn, heightIn) => {
  const extent = horizontal ? y : x;
  if (horizontal && heightIn) dimensionRef = heightIn;
  else if (!horizontal && widthIn) dimensionRef = widthIn;
  $offset(edge === '1' ? (dimensionRef === undefined ? offset : dimensionRef - extent - 1) : extent);
  [this, host].forEach(node => node.style.setProperty('--' + key, offset));
 };

enableHost(initial[0], edge === '1');
enableDrag(update, initial[1], $dragging);