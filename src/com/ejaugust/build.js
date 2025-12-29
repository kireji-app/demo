ejaugust.define({
 canonicalLinks: {
  value: notes.reduce((result, note) => {
   if (note.pathname)
    result[note.pathname.slice(1)] = note.key

   return result
  }, {})
 }
})