const cardinality = selectedPart.cardinality
const cardinalityAsString = instances.includes(selectedPart) ? cardinality.toLocaleString() : null
return (
 // `<h2><a href="https://en.wikipedia.org/wiki/Perfect_hash_function#Minimal_perfect_hash_function" target="_blank">MPHF</a> Properties</h2>` +
 `<h2>State Space</h2>` + (
  instances.includes(selectedPart) ? (
   "<part-data>" + (
    "<div>Cardinality</div>" +
    `<div>${cardinalityAsString.length < 16 ? cardinalityAsString : scientific(cardinality, true)}</div>`
   ) +
   "</part-data>" +
   `<hr>` +
   "<part-data>" + (
    "<div>Information</div>" +
    `<div>${(selectedPart.cardinality - 1n).toString(2).length} <span class=marks>bits</span></div>` +
    "<div></div>" +
    `<div>${toCharms(selectedPart.cardinality, false)} <span class=marks>charms</span></div>`
   ) +
   "</part-data>" +
   `<hr>` +
   "<part-data>" + (
    "<div>State</div>" +
    `<div><span id=live-route-id>${selectedPart.routeID.toLocaleString()}</span></div>` +
    "<div></div>" +
    `<div><span class=marks>"</span><span id=live-route-hash>${encodeSegment(selectedPart.routeID)}</span><span class=marks>"</span></div>`
   ) +
   "</part-data>"
  ) : "<p>Abstract parts do not contribute directly to the application state.</p>"
 )
)