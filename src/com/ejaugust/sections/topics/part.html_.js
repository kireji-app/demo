return /* html */`</section>
 <section>
  <div id=note-links>
   ${[...notes].reverse().map(note => note["card.html"]).join(`
   `)}
  </div>
 </section>`