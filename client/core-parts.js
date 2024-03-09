const content = new Set();

on.clear(
 expressions => {
  content.forEach(node => node.remove());
  content.clear();
  if (!expressions) return;
  const items = echo(expressions);
  items.forEach(node => content.add(node));
 }
)