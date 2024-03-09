const views = new Set();

this.cover = w => {
 $word(w);
 views.forEach(_ => _.remove());
 const model = archive[word];
 if (!model) warning('!model '+word)
 Object.keys(model).forEach(rootword => {
  views.add(say(`<infix- expressions=${btoa(model[rootword])}>`)[0])
 })
}

this.cover(word)