return (
 `<h2><a href="https://en.wikipedia.org/wiki/Perfect_hash_function#Minimal_perfect_hash_function" target="_blank">MPHF</a> Properties</h2>` +
 (instances.includes(selectedPart) ? ("<part-data>" + (
  "<div>Cardinality</div>" +
  `<div>${selectedPart.cardinality.toLocaleString()}<sub class=marks>10</sub></div>` +
  "<div>Cardinality (scientific)</div>" +
  `<div>${scientific(selectedPart.cardinality, true)}</div>` +
  "<div>Entropy (bits)</div>" +
  `<div>${(selectedPart.cardinality - 1n).toString(2).length} <span class=marks>bits</span></div>` +
  "<div>Entropy (charms)</div>" +
  `<div>${toCharms(selectedPart.cardinality, false)} <span class=marks>charms</span></div>` +
  "<div>State Integer</div>" +
  `<div><span id=live-route-id>${selectedPart.routeID.toLocaleString()}</span><sub class=marks>10</sub></div>` +
  "<div>State String</div>" +
  `<div><span class=marks>"</span><span id=live-route-hash>${encodeSegment(selectedPart.routeID)}</span><span class=marks>"</span></div>`
 ) +
  "</part-data>"
 ) : "This part is <em>abstract</em>. Abstract parts do not participate directly in the hash function.")
)