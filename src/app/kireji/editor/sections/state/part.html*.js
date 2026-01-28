return (
 instances.includes(activePart) ? (
  activePart.disabled ? (
   "<p class=disabled-message>This part is currently disabled.</p>" +
   "<h3>Integer</h3>" +
   `<pre id=live-route-id>-1</pre>` +
   "<hr>" +
   "<h3>Hash</h3>" +
   `<pre id=live-route-hash></pre>` +
   "<hr>" +
   "<h3>Model</h3>" +
   `<pre id=live-model></pre>`
  ) : (
   "<p class=disabled-message></p>" +
   "<h3>Integer</h3>" +
   `<pre id=live-route-id>${activePart.routeID}</pre>` +
   "<hr>" +
   "<h3>Hash</h3>" +
   `<pre id=live-route-hash>${encodeSegment(activePart.routeID) || "&nbsp;"}</pre>` +
   "<hr>" +
   "<h3>Model</h3>" +
   `<pre id=live-model>${serialize(activePart.model)}</pre>`
  )
 ) : (
  "<p class=disabled-message>Abstract parts do not have a state.</p>"
 )
)