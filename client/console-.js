this.setType = (type, value) => {
 $_set[type](value ? '1' : '0')
};
const
 messages = new Map(),
 counters = attributes.reduce((obj, attr) => (obj[attr] = 0, obj), {});
let shelfBtns = ''
incoming(word => {
 shelfBtns += `<${word}></${word}>`
})
const
 container = say(`<menu>${attributes.map(attr => `<stat-pill type=${attr}></stat-pill>`).join('')}${shelfBtns}</menu><div></div>`).at(-1),
 message = (word, msg, sender, depth, index) => {
  switch (word) {
   case 'log-':
    console.log(msg);
    break;
   case 'warning-':
    console.warn(msg);
    break;
   case 'error-':
    console.error(msg);
    break;
   default:
    console.info(msg);
    break;
  }
  const serializer = (key, value) =>
   typeof value === 'bigint'
    ? value.toString()
    : value // return everything else unchanged;
  const payload = JSON.stringify([msg, sender, depth, index], serializer);

  counters[word]++;
  this.style = Object.entries(counters).map(([attr, count]) => `--${attr}count:\"${count}\"`).join(';');
  if (messages.has(payload)) {
   const node = messages.get(payload);
   node.set('times', parseInt(node.get('times') ?? 1) + 1)
   return;
  }
  const node = say(`<${word} index=${index} json=${btoa(JSON.stringify(msg===undefined?'undefined':typeof msg === 'string' ? msg.websafe() : typeof msg === 'object' ? msg : console.error('Unhandled message type',{msg}), serializer))}>`)[0];
  container.appendChild(node);
  messages.set(payload, node);
 }
this.style = Object.entries(counters).map(([key, count]) => `--${key}count:\"${count}\"`).join(';');
attributes.forEach(attr => {
 ON['console '+attr.inset(0, 1)]((msg, sender, depth, index) => {
  message(attr, msg, sender, depth, index)
 })
})