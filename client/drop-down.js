if (inside(this.word)) {
 this.onclick = () => {
  const
   prev = host.query('[selected]');
  if (this.hasAttribute('selected')) return;
  prev.removeAttribute('selected');
  host.setAttribute('value', value);
  this.setAttribute('selected', '');
  host.dispatchEvent(new InputEvent('change'));
 }
} else {
 if (this.hasAttribute('label')) say(`<label>${label}</label>`);
 this.onclick = () => {
  if (this.flip('open')) query('[selected]').frameUp()
 }
 const list = this.hasAttribute('items') ? eval(items) : ['Drop Item 1', 'Drop Item 2'];
 let finalValue = list[0];
 if (!this.hasAttribute('value')) this.setAttribute('value', finalValue);
 else finalValue = value;

 say(`<div>${list.map(item => `<drop-down value="${item}" ${item === finalValue ? 'selected' : ''}></drop-down>`).join('')}</div>`);
}