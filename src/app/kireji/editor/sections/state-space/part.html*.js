const cardinality = activePart.cardinality
const cardinalityAsString = instances.includes(activePart) ? cardinality.toLocaleString() : null
return (
 instances.includes(activePart) ? (
  "<h3>Cardinality</h3>" +
  `<p>${cardinalityAsString.length < 16 ? cardinalityAsString : scientific(cardinality, true)}</p>` +
  `<hr>` +
  "<h3>Hartley Entropy</h3>" +
  `<p>${toCharms(activePart.cardinality)} (${toBits(activePart.cardinality)})</p>`
 ) : (
  "<p class=disabled-message>Abstract parts do not have a concrete state space.</p>"
 )
)