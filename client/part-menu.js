Object.defineProperties(this, {
 label: {
  set: text => {
   this.set('label', text)
   Q('label').textContent = text
  },
  get: () => this.get('label')
 }
})

new MutationObserver(() => {
 this.label = this.label
}).observe(this, { attributeFilter: ['label'] })