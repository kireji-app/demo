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
 iframe = echo(`iframe`)[0];

iframe.onload = onload;
iframe.src = address;
tip(address, iframe);

on.setWord(
 address => {
  iframe.src = address;
  tip(address, iframe);
 }
)