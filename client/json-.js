const object = innerHTML ? JSON.parse(innerHTML) : undefined;
let html = '';
switch (typeof object) {

 case 'object':
  html += '{'
  html += Object.entries(object).map(([key, value]) => `${key}:<json->${JSON.stringify(value)}</json->`);
  html += '}'
  break;

 case 'string':
  html = object;
  break;

 case 'number':
  html = `<output>${object.toString(10)}</output>`;
  break;

}

say(html);