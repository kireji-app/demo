const views = new Set();

this.cover = w => {
 $word(w);
 views.forEach(_ => _.remove());
 const model = archive[word];
 if (!model) warning('!model '+word)
 Object.keys(model).forEach(rootword => {
  views.add(say(`<sub-model open rootword=${rootword} word=${word}>`)[0])
 })
}

ON['open model'](word => {
 this.cover(word)
})