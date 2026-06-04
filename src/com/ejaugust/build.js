define(EJAugust, {
 topics: { value: {} },
 canonicalLinks: {
  resolve() {
   return EJAugustNotes.reduce((result, note) => {
    if (note.pathname)
     result[note.pathname.slice(1)] = note.key
    return result
   }, {})
  }
 }
})