tip(word);
const sheet = new CSSStyleSheet();
sheet.replaceSync(statics.cssMarks);
this.shadowRoot.adoptedStyleSheets.push(sheet);
this.cover = word => {
 $word(word);
 tip(word);
}