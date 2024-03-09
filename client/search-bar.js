e.setWord(index + '.' + word + '.word')

const
 sheet = new CSSStyleSheet(),
 icon = say(`<numeral- word=${word}>`)[0],
 field = say(`<input value=${word}>`)[0],
 cover = word => {
  field.value = word
  field.onchange()
  field.onsubmit()
 },
 items = say(`${[...glossary].map(w => `<search-bar-item word="${w}" ${w === word ? 'selected' : ''}></search-bar-item>`).join('')}`),
 restyle = () => {
  if (field.value === '') sheet.replaceSync(`:host{--results:${query(`search-bar-item`, true).length}}`)
  else {
   const results = query(`search-bar-item[word*="${field.value}"]`, true), count = results.length;
   sheet.replaceSync(`search-bar-item:not([word*="${field.value}"]){display:none !important}:host{--results:${count}}`)
  };
 };

items.forEach(_ => {
 _.onpointerdown = e => { e.preventDefault(); cover(_.get('word')) }
})
this.shadowRoot.adoptedStyleSheets.push(sheet);
let selected = query('[selected]');
field.placeholder = word

field.oninput = () => {
 $filter(field.value)
 const isExact = field.value in archive;
 if (exact !== isExact) $exact(isExact)
 restyle();
}

field.onfocus = () => {
 $focus(true)
 if (field.value === word) {
  field.value = ''
  restyle()
 }
 field.select()
}

field.onblur = () => {
 $focus(false)
 if (field.value === '') {
  field.value = word
  restyle()
 }
}

field.onchange = () => {
 field.oninput();
}

field.onsubmit = () => {
 if (!exact) warning('404: There is no "' + field.value + '"!')
 field.blur()
 $word(field.value)
 e.setWord(index + '.' + word + '.word')
 selected?.removeAttribute('selected');
 field.placeholder = word
 selected = query(`[word="${field.value}"]`);
 selected?.setAttribute('selected', '');
 icon.cover(field.value);
}

field.value = filter;
if (focus === 'true') field.focus();
restyle();