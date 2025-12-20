return (
 `<h2>State</h2>` + (
  instances.includes(selectedPart) ? (
   "<h3>Integer</h3>" +
   `<pre id=live-route-id>${selectedPart.routeID.toLocaleString()}</pre>` +
   "<h3>Hash</h3>" +
   `<pre id=live-route-hash>${encodeSegment(selectedPart.routeID)}</pre>` +
   "<h3>Model</h3>" +
   `<pre id=live-model>${serialize(selectedPart.model)}</pre>`
  ) : (
   "<p>Abstract parts do not have a state.</p>"
  )
 )
)