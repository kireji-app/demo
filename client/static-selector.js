const { subword, values, value_attr, select_attr, get, set } = this.selectDescriptor ?? {
 subword: 'example-item',
 values: ['static', 'list', 'example', 'values'],
 value_attr: 'value',
 select_attr: 'selected',
 get: () => (warning('simulated getter'), values[Math.floor(Math.random() * values.length)]),
 set: value => warning('simulated setter recieved value ' + value)
};

let picked = undefined;

function pick(node) {
 if (node === picked)
  return

 picked?.unset(select_attr)
 picked = node
 picked.set(select_attr)

 set(node.get(value_attr));
}

const
 initial = get(),
 search = echo('search-bar')[0];

values.forEach(value => {
 const node = say(`<${subword} ${value_attr}="${value}">`)[0];

 if (initial === value)
  pick(node)

 node.onclick = () => {
  pick(node)
 }
})

let timeout = 0, oldheight = undefined;
const observer = new ResizeObserver(([{ contentRect: { width, height } }]) => {
 if (height === oldheight) return;
 oldheight = height
 if (timeout !== 0) clearTimeout(timeout)
 timeout = setTimeout(() => this.scrollTop = scroll, 20)
})

observer.observe(this, {})

this.onscroll = e => {
 $scroll(this.scrollTop)
}

/*
this.set('variable')
search.onsetword = () => {
 this.set('word', search.value)
}
this.set('word', search.value)
let member = say(`<${this.get('word') ?? 'blank-'}>`)[0];
new MutationObserver(() => {
 member.remove();
 member = say(`<${this.get('word') ?? 'blank-'}>`)[0]
}).observe(this, { attributeFilter: ['word'] });
*/