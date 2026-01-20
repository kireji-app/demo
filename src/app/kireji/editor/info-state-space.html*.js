const cardinality = selectedPart.cardinality
const cardinalityAsString = instances.includes(selectedPart) ? cardinality.toLocaleString() : null
return (
 `<summary onpointerdown=${editor.settings.runtimeReference}.point(event,this)>State Space</summary>` + (
  instances.includes(selectedPart) ? (
   "<h3>Cardinality</h3>" +
   `<p>${cardinalityAsString.length < 16 ? cardinalityAsString : scientific(cardinality, true)}</p>` +
   `<hr>` +
   "<h3>Hartley Entropy</h3>" +
   `<p>${toCharms(selectedPart.cardinality)} (${toBits(selectedPart.cardinality)})</p>`
  ) : (
   "<p>Abstract parts do not have a concrete state space.</p>"
  )
 )
)