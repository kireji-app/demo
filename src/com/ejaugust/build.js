ejaugust.define({
 topics: { value: {} },
 canonicalLinks: {
  resolve() {
   return notes.reduce((result, note) => {
    if (note.pathname) {
     result[note.pathname.slice(1)] = note.key
    }

    (this.topics[note.topic] ??= []).push(note)

    return result
   }, {})
  }
 }
})