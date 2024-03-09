if (show_tip!=='false') tip(word);
const sheet = new CSSStyleSheet();
sheet.replaceSync(statics.cssMarks);
this.shadowRoot.adoptedStyleSheets.push(sheet);
this.cover = word => {
 $word(word);
 if (show_tip!=='false') tip(word);
}
const short = ['css-', 'json-', 'js-', 'html-', 'png-', 'txt-', 'woff2-', 'ini-'].includes(word) ? word.replace('-', ' ') : {
 'v-rule': 'v-r',
 'h-rule': 'h-r'
}[word];

if (short !== undefined)
 say(`<var>${short}</var>`);