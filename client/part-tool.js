const
 span = echo('+<span>ToolError1</span>+')[0],
 attr = 'show',
 trace = [];

debounce('hover', () => {
 trace.length = 0
 let list, node = document
 let level = 0
 while (list = node.Q(':hover', true, true, false)) {
  level++
  node = list.at(-1)
  trace.push(node)
 }
 if (level <= 1) {
  span.textContent = ''
  this.unset(attr)
  rect = undefined
  return
 }
 this.set(attr)
 span.textContent = node.word
 const { x, y, width, height } = node.getBoundingClientRect()
 this.style.setProperty('--x', x + 'px')
 this.style.setProperty('--y', y + 'px')
 this.style.setProperty('--w', width + 'px')
 this.style.setProperty('--h', height + 'px')
})