const
 short = say(`<var part=short>`)[0],
 update = () => {
  if (!this.has('word')) {
   warning('blank glyph')
   this.set('word', 'blank-')
  }
  if (this.has('show-tip')) tip(this.get('word'))
  short.innerHTML = dictionary[this.get('word')].short ?? ''
 },
 sheet = new CSSStyleSheet();

sheet.replaceSync(statics.cssMarks)
this.shadowRoot.adoptedStyleSheets.push(sheet)

update()

new MutationObserver(() => {
 update()
}).observe(this, { attributeFilter: ['word'] });
