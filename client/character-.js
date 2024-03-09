const
 mySet = statics.characters.get(parseInt(code)),
 length = mySet?.size ?? 0;
if (length >= 0) {
 echo((
  length === 0 ? `<output>${tip('undefined'), String.fromCharCode(code)}`
   : length === 1 ? `<search-bar-item word=${[...mySet][0]}>`
    : `<div>${tip([...mySet][0] + ' & ' + (length - 1) + ' more'), String.fromCharCode(code)}`
 ).wrap('+'))
}