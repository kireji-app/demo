Object.defineProperties(selected, {
 cardinality: { value: BigInt(allParts.length) },
 partListener: { value: () => selected.replaceContent() },
 previousPart: { value: null, writable: true }
})