selected.define({
 cardinality: { value: BigInt(allParts.length) },
 partListener: {
  value: () => {
   document.getElementById("live-route-id").textContent = selected.part.routeID.toLocaleString()
   document.getElementById("live-route-hash").textContent = encodeSegment(selected.part.routeID)
  }
 },
 previousPart: { value: null, writable: true }
})