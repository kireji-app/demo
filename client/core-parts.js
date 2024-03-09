const
 pre = 'console ',
 onload = ({ target: doc }) => {
  /* great seed for future connectivity; need view of iframe tree */
  doc.contentDocument.reroot(
   fork('iframe', doc),
   /* propagate console to parent console */
   DO2 => {
    DO2[pre + 'log'] = DO[pre + 'log'];
    DO2[pre + 'warning'] = DO[pre + 'warning'];
    DO2[pre + 'error'] = DO[pre + 'error'];
    DO2[pre + 'success'] = DO[pre + 'success'];
   })
 },
 [iframe] = echo(`iframe`);

iframe.onload = onload;

ON['open model'](
 address => {
  iframe.src = index + '.' + address + '?'
  tip(address, iframe)
 }
)