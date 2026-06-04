return /* html */`</section>
 <section>
  <div id=note-links>
   ${[...EJAugustNotes].reverse().map(note => note["card.html"]).join(`
   `)}
  </div>
 </section>`