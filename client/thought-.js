if (this.has('item')) {
 if (!host.has('variable')) say(`<label>${this.get('word')}`)
 else {
  const search = echo('search-bar')[0]
  this.set('variable')
  search.onsetword = () => {
   this.set('word', search.value)
  }
  this.set('word', search.value)
 }
 let member = say(`<${this.get('word') ?? 'blank-'}>`)[0];
 new MutationObserver(() => {
  member.remove();
  member = say(`<${this.get('word') ?? 'blank-'}>`)[0]
 }).observe(this, { attributeFilter: ['word'] });
 return;
}

echo(`thoughts-`)