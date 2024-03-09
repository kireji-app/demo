const
 onload = ({ target: doc }) => {
  /* great seed for future connectivity; need view of iframe tree */
  doc.contentDocument.reroot(
   fork('iframe', doc),
   /* propagate console to parent console */
   e2 => {
    e2.log = e.log;
    e2.warning = e.warning;
    e2.error = e.error;
    e2.success = e.success;
    e2.move = e.move;
    e2.up = e.up;
    e2.down = e.down;
   })
 },
 [explorer, iframe] = echo(`folder-explorer iframe`);

iframe.onload = onload;

on.setWord(
 address => {
  iframe.src = address
  tip(address, iframe)
  //const word = address.split('.')[1]
  //rootTable.cover(word)
 }
)