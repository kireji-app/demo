const
 map = {},
 add = word => map[word] = say(`<thought- item word=${word}>`)[0],
 render = () => {
  if (host.word === 'thought-') {
   this.set('variable')
   if (isolated === undefined) {
    isolated = add('blank-')
   }
  }
  else {
   this.unset('variable')
   incoming(add)
  }
 }
let isolated = undefined;
render();