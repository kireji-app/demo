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
 [iframe] = echo(`iframe`);

iframe.onload = onload;

on.clear(
 address => {
  iframe.src = index+'.'+address+'.word'
  tip(address, iframe)
 }
)