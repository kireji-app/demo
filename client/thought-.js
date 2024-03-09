if (word !== '') {
 this.set('constant')
 say(`<label>${word}<button>&#9999;</button></label><${word}>`)
} else {
 this.set('variable')
 const input = echo('search-bar')[0]
 let subject = undefined
 input.onsetword = word => {
  subject?.remove()
  subject = echo(word)[0]
 }
}